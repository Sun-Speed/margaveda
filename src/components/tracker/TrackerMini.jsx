import { useTracker } from "../../context/TrackerContext";
import { useNavigate } from "react-router-dom";

const TrackerMini = () => {
  const { trackedCourses } = useTracker();
  const navigate = useNavigate();

  if (trackedCourses.length === 0) return null;

  

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#0B0E11]/80 backdrop-blur-xl border border-[#00FFD1]/20 shadow-[0_0_25px_rgba(0,255,209,0.15)]">

        <span className="text-xs text-[#00FFD1] font-mono tracking-wider">
          MY PATH
        </span>

        <div className="flex items-center gap-2 max-w-[250px] overflow-x-auto no-scrollbar">
          {trackedCourses.slice(-4).map((course) => (
            <div
              key={course.id}
              className="px-3 py-1 text-[10px] bg-[#00FFD1]/10 text-[#00FFD1] rounded-full whitespace-nowrap"
            >
              {course.name}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/my-map")}
          className="text-xs font-bold text-black bg-[#00FFD1] px-3 py-1 rounded-full hover:scale-105 transition"
        >
          VIEW
        </button>
      </div>
    </div>
  );
};

export default TrackerMini;
