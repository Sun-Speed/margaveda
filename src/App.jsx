import "@xyflow/react/dist/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Pathfinder from "./pages/Pathfinder";
import CareersNextPaths from "./pages/CareersNextPaths";
import ScrollToTop from "./components/ScrollToTop";
import CoursesHome from "./pages/CoursesHome";
import CareersHome from "./pages/CareersHome";
import TrackerProvider from "./context/TrackerContext"; 
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext"; 
import CoursesMap from "./pages/CoursesMap";
import { useEffect } from "react";
import ReactGA from "./utils/analytics";
import About from "./pages/AboutPage";
import Documentation from "./pages/Documentation";

// import NextPathCard from "./pages/TestUI";

function App() {

  useEffect(() => {

  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });

}, []);

  return (
    <AuthProvider> {/* 🔥 GLOBAL AUTH WRAPPER */}
      <BrowserRouter>
        <ScrollToTop />

        <SearchProvider>
          <TrackerProvider>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<CoursesHome />} />
              <Route path="/careers" element={<CareersHome />} />
              <Route path="/explore/:id" element={<Explore />} />
              <Route path="/explore/:streamId/:courseId" element={<Pathfinder />} />
              <Route path="/career/:jobid" element={<CareersNextPaths />} />
              <Route path="/maps" element={<CoursesMap />} />
              <Route path="/about" element={<About />} />
              <Route path="/docs" element={<Documentation />} />
            </Routes>

          </TrackerProvider>
        </SearchProvider>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
