// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";


// const TrackerContext = createContext();

// const TrackerProvider = ({ children }) => {

//   const { user, setUser } = useAuth();

//   const [tracker, setTracker] = useState({
//     paths: [],
//   });

//   console.log(tracker);

//   const [allNodes, setAllNodes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Fetch all data once
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [coursesRes, streamsRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/courses"),
//           axios.get("http://localhost:5000/api/streams"),
//         ]);

//         const courses = coursesRes.data.map((c) => ({
//           _id: c._id,
//           title: c.name,
//           nextCourses: c.nextCourses || [],
//           streams: c.streams || [],
//           type: "course",
//         }));

//         const streams = streamsRes.data.map((s) => ({
//           _id: s._id,
//           title: s.name,
//           type: "stream",
//         }));

//         setAllNodes([...streams, ...courses]);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);


//   const safeParse = (value) => {
//   try {
//     if (!value || value === "undefined") return null;
//     return JSON.parse(value);
//   } catch (err) {
//     console.error("Parse error:", err);
//     return null;
//   }
// };

//   // Local Storage Data Storing

//   useEffect(() => {
//  const user = safeParse(localStorage.getItem("user"));

//   let storedData = null;

//   if (user) {
//     storedData = localStorage.getItem(`tracker_${user._id}`);
//   } else {
//     storedData = localStorage.getItem("guest_tracker");
//   }

//   if (!storedData) return;

//   try {
//     const parsed = JSON.parse(storedData);

//     // 🟡 Expiry for guest (24 hours)
//     if (!user) {
//       const ONE_DAY = 1000 * 60 * 60 * 24;

//       if (Date.now() - parsed.timestamp > ONE_DAY) {
//         localStorage.removeItem("guest_tracker");
//         return;
//       }
//     }

//     setTracker({ paths: parsed.paths });
//   } catch (err) {
//     console.error("Error loading tracker", err);
//   }
// }, []);

// useEffect(() => {
//   if (!tracker.paths.length) return;

// const user = safeParse(localStorage.getItem("user"));

//   const dataToStore = {
//     paths: tracker.paths,
//     timestamp: Date.now(),
//   };

//   if (user) {
//     // ✅ Logged-in user
//     localStorage.setItem(
//       `tracker_${user._id}`,
//       JSON.stringify(dataToStore)
//     );
//   } else {
//     // ✅ Guest user
//     localStorage.setItem(
//       "guest_tracker",
//       JSON.stringify(dataToStore)
//     );
//   }
// }, [tracker.paths]);


// const clearTrackerOnLogout = () => {
//   const user = safeParse(localStorage.getItem("user"));

//   if (user) {
//     localStorage.removeItem(`tracker_${user._id}`);
//   }

//   localStorage.removeItem("guest_tracker");

//   setTracker({ paths: [] });
// };

//   // 🔍 Helpers
//   const getNode = (id) => allNodes.find((n) => n._id === id);

//   const isValidFromStream = (streamId, course) => {
//     return course.streams?.includes(streamId);
//   };

//   const isValidNext = (parentId, childId) => {
//     const parent = getNode(parentId);
//     return parent?.nextCourses?.includes(childId);
//   };

//   const isDuplicatePath = (newSteps, paths) => {
//     return paths.some(
//       (p) =>
//         JSON.stringify(p.steps.map((s) => s._id)) ===
//         JSON.stringify(newSteps.map((s) => s._id)),
//     );
//   };

//   const isSubPath = (newSteps, paths) => {
//     return paths.some((p) => {
//       const existing = p.steps.map((s) => s._id);
//       const incoming = newSteps.map((s) => s._id);
//       return existing.slice(0, incoming.length).join() === incoming.join();
//     });
//   };

//   // 🚀 MAIN FUNCTION
//   const addStep = (step) => {
//     setTracker((prev) => {
//       const node = getNode(step._id);
//       if (!node) return prev;

//       let newPaths = [...prev.paths];

//       // 🟢 1. If STREAM → always start new path
//       if (node.type === "stream") {
//         const newPath = {
//           id: Date.now(),
//           steps: [node],
//         };

//         return {
//           ...prev,
//           paths: [...newPaths, newPath],
//         };
//       }

//       // 🟢 2. Try to attach to existing paths
//       let attached = false;

//       for (let i = newPaths.length - 1; i >= 0; i--) {
//         const path = newPaths[i];
//         const steps = path.steps;

//         // 🔁 BACKTRACKING (check from last → first)
//         for (let j = steps.length - 1; j >= 0; j--) {
//           const current = steps[j];

//           let valid = false;

//           if (current.type === "stream") {
//             valid = isValidFromStream(current._id, node);
//           } else {
//             valid = isValidNext(current._id, node._id);
//           }

//           if (valid) {
//             const newSteps = [...steps.slice(0, j + 1), node];

//             // 🚫 prevent duplicate & sub-duplicate
//             if (
//               isDuplicatePath(newSteps, newPaths) ||
//               isSubPath(newSteps, newPaths)
//             ) {
//               return prev;
//             }

//             // 🔥 If we are extending the LAST node → UPDATE SAME PATH
//             if (j === steps.length - 1) {
//               // direct continuation → mutate existing path
//               newPaths[i] = {
//                 ...path,
//                 steps: newSteps,
//               };
//             } else {
//               // 🔥 branching → create new path
//               newPaths.push({
//                 id: Date.now(),
//                 steps: newSteps,
//               });
//             }

//             attached = true;
//             break;
//           }
//         }

//         if (attached) break;
//       }

//       // 🔴 3. If not attached → ignore (invalid root)
//       return {
//         ...prev,
//         paths: newPaths,
//       };
//     });
//   };

//   return (
//     <TrackerContext.Provider value={{ tracker, addStep, loading }}>
//       {children}
//     </TrackerContext.Provider>
//   );
// };

// export default TrackerProvider;
// export const useTracker = () => useContext(TrackerContext);








import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const TrackerContext = createContext();

const safeParse = (value) => {
  try {
    if (!value || value === "undefined") return null;
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const TrackerProvider = ({ children }) => {

  const { user } = useAuth();

  const [tracker, setTracker] = useState({ paths: [] });
  const [allNodes, setAllNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log("bassamma", tracker);

  // 🔹 FETCH ALL DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, streamsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/courses"),
          axios.get("http://localhost:5000/api/streams"),
        ]);

        const courses = coursesRes.data.map((c) => ({
          _id: c._id,
          title: c.name,
          nextCourses: c.nextCourses || [],
          streams: c.streams || [],
          type: "course",
        }));

        const streams = streamsRes.data.map((s) => ({
          _id: s._id,
          title: s.name,
          type: "stream",
        }));

        setAllNodes([...streams, ...courses]);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  

  // 🔹 LOAD TRACKER (ON MOUNT)
  useEffect(() => {
    let storedData;

    if (user) {
      storedData = localStorage.getItem(`tracker_${user._id}`);
    } else {
      storedData = localStorage.getItem("guest_tracker");
    }

    const parsed = safeParse(storedData);
    if (!parsed) return;

    // ⏳ Guest expiry (24h)
    if (!user) {
      const ONE_DAY = 1000 * 60 * 60 * 24;
      if (Date.now() - parsed.timestamp > ONE_DAY) {
        localStorage.removeItem("guest_tracker");
        return;
      }
    }

    setTracker({ paths: parsed.paths || [] });
  }, [user]);

  // 🔹 SAVE TRACKER (AUTO)
  useEffect(() => {
    if (!tracker.paths.length) return;

    const data = {
      paths: tracker.paths,
      timestamp: Date.now(),
    };

    if (user) {
      localStorage.setItem(
        `tracker_${user._id}`,
        JSON.stringify(data)
      );
    } else {
      localStorage.setItem(
        "guest_tracker",
        JSON.stringify(data)
      );
    }
  }, [tracker.paths, user]);

  // 🔹 CLEAR TRACKER (LOGOUT)
  const clearTracker = () => {
    if (user) {
      localStorage.removeItem(`tracker_${user._id}`);
    }
    localStorage.removeItem("guest_tracker");
    setTracker({ paths: [] });
  };

  // 🔍 HELPERS
  const getNode = (id) => allNodes.find((n) => n._id === id);

  const isValidFromStream = (streamId, course) =>
    course.streams?.includes(streamId);

  const isValidNext = (parentId, childId) => {
    const parent = getNode(parentId);
    return parent?.nextCourses?.includes(childId);
  };

  const isDuplicatePath = (newSteps, paths) =>
    paths.some(
      (p) =>
        JSON.stringify(p.steps.map((s) => s._id)) ===
        JSON.stringify(newSteps.map((s) => s._id))
    );

  const isSubPath = (newSteps, paths) =>
    paths.some((p) => {
      const existing = p.steps.map((s) => s._id);
      const incoming = newSteps.map((s) => s._id);
      return existing.slice(0, incoming.length).join() === incoming.join();
    });

  // 🚀 MAIN FUNCTION
  const addStep = (step) => {
    setTracker((prev) => {
      const node = getNode(step._id);
      if (!node) return prev;

      let newPaths = [...prev.paths];

      // 🟢 STREAM → new path
      if (node.type === "stream") {
        return {
          ...prev,
          paths: [...newPaths, { id: Date.now(), steps: [node] }],
        };
      }

      let attached = false;

      for (let i = newPaths.length - 1; i >= 0; i--) {
        const path = newPaths[i];
        const steps = path.steps;

        for (let j = steps.length - 1; j >= 0; j--) {
          const current = steps[j];

          const valid =
            current.type === "stream"
              ? isValidFromStream(current._id, node)
              : isValidNext(current._id, node._id);

          if (valid) {
            const newSteps = [...steps.slice(0, j + 1), node];

            if (
              isDuplicatePath(newSteps, newPaths) ||
              isSubPath(newSteps, newPaths)
            ) {
              return prev;
            }

            if (j === steps.length - 1) {
              newPaths[i] = { ...path, steps: newSteps };
            } else {
              newPaths.push({ id: Date.now(), steps: newSteps });
            }

            attached = true;
            break;
          }
        }

        if (attached) break;
      }

      return { ...prev, paths: newPaths };
    });
  };

  const removePath = (pathId) => {
  setTracker((prev) => {

    const updatedPaths = prev.paths.filter(
      (path) => path.id !== pathId
    );

    const updatedTracker = {
      ...prev,
      paths: updatedPaths,
    };

    const user = safeParse(localStorage.getItem("user"));

    if (user) {
      localStorage.setItem(
        `tracker_${user._id}`,
        JSON.stringify(updatedTracker)
      );
    } else {
      localStorage.setItem(
        "guest_tracker",
        JSON.stringify({
          ...updatedTracker,
          timestamp: Date.now(),
        })
      );
    }

    return updatedTracker;
  });
};

  return (
    <TrackerContext.Provider
      value={{
        tracker,
        setTracker,
        addStep,
        removePath,
        loading,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

export default TrackerProvider;
export const useTracker = () => useContext(TrackerContext);