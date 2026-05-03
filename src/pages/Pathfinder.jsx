import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HeroSection from "../components/layout/HeroSection";
import ViewDetails from "../components/coursePage/ViewDetails";
import CourseIntelligence from "../components/Pathfinder/CourseIntelligence";
import CareerCardShow from "../components/Pathfinder/CareerCardShow";

import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Target, Landmark, Filter, ChevronDown } from "lucide-react";

export default function Pathfinder() {
  const { streamId, courseId } = useParams();

  const [courses, setCourses] = useState([]);
  // const [allPaths, setAllPaths] = useState([]);
  const [allCareers, setAllCareers] = useState([]);
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedCluster, setSelectedCluster] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/paths")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log("Paths:", data);
  //       setAllPaths(data);
  //     })
  //     .catch((err) => console.error("Error fetching paths:", err));
  // }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setAllCareers(data);
      })
      .catch((err) => console.error("Error fetching careers:", err));
  }, []);

  // console.log(id);

  const tabs = [
    { id: "courses", label: "Explore Courses", icon: BookOpen },
    { id: "careers", label: "Career Orbits", icon: Target },
    { id: "colleges", label: "Top Institutes", icon: Landmark },
  ];

  const filteredCourses = courses.filter((course) =>
    course.streams?.includes(courseId),
  );

  const filteredByClusterCourses = filteredCourses.filter((course) =>
    course.cluster?.includes(selectedCluster),
  );

  // 🔥 Build course → paths index
  // const buildPathsByCourse = (allPaths) => {
  //   const pathsByCourse = {};

  //   allPaths.forEach((path) => {
  //     path.steps.forEach((step) => {
  //       if (step.startsWith("course_")) {
  //         if (!pathsByCourse[step]) {
  //           pathsByCourse[step] = [];
  //         }
  //         pathsByCourse[step].push(path);
  //       }
  //     });
  //   });

  //   return pathsByCourse;
  // };

  // const pathsByCourse = buildPathsByCourse(allPaths);

  // const getCareersFromCourse = (courseId, pathsByCourse, allCareers) => {
  //   const relatedPaths = pathsByCourse[courseId] || [];

  //   const careerIds = new Set();

  //   relatedPaths.forEach((path) => {
  //     careerIds.add(path.careerId);
  //   });

  //   const careers = allCareers.filter((career) => careerIds.has(career._id));

  //   return careers;
  // };

  // const careers = getCareersFromCourse(courseId, pathsByCourse, allCareers);

  // console.log("yahooo ", careers);

  const careers = allCareers.filter((career) => {

    return career.education?.recommendedCourses?.includes(courseId);

  });

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  function handleCloseModal() {
    setShowModal(false);
    setSelectedCourse(null);
  }

  if (selectedCourse) {
    return (
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[999] bg-[#000807] overflow-y-auto">
            {/* 🔥 OPTIONAL GLOW BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

              <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />
            </div>

            {/* 🔥 CONTENT */}
            <div className="relative z-10 min-h-screen">
              <ViewDetails
                selectedCourse={selectedCourse}
                handleCloseModal={handleCloseModal}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <MainLayout>
      {/* <HeroSection /> */}
      <AnimatePresence>
        <CourseIntelligence
          handleViewDetails={handleViewDetails}
          careers={careers}
        />
      </AnimatePresence>
    </MainLayout>
  );
}
