// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { Handle, Position } from "reactflow";
// import ReactFlow, {
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   Background,
//   Controls,
//   MarkerType,
// } from "reactflow";
// import dagre from "dagre";
// // import courses from "../../data/courses.json";
// import ViewDetails from "../coursePage/ViewDetails";

// const dagreGraph = new dagre.graphlib.Graph();
// dagreGraph.setDefaultEdgeLabel(() => ({}));

// const getLayoutedElements = (nodes, edges) => {
//   const nodeWidth = 600;
//   const nodeHeight = 100;

//   dagreGraph.setGraph({ rankdir: "LR" }); // LEFT → RIGHT

//   nodes.forEach((node) => {
//     dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
//   });

//   edges.forEach((edge) => {
//     dagreGraph.setEdge(edge.source, edge.target);
//   });

//   dagre.layout(dagreGraph);

//   const layoutedNodes = nodes.map((node) => {
//     const nodeWithPosition = dagreGraph.node(node.id);

//     return {
//       ...node,
//       position: {
//         x: nodeWithPosition.x - nodeWidth / 2,
//         y: nodeWithPosition.y - nodeHeight / 2,
//       },
//     };
//   });

//   return { nodes: layoutedNodes, edges };
// };

// // 1. Custom Node Component (Matches your Xbit design)
// const CourseNode = ({ data, onSelect }) => {

//   const [active, setActive] = useState(false);

//   const toggleActivation = (e) => {
//     e.stopPropagation();
//     const newStatus = !active;
//     setActive(newStatus);

//     // Log for your backend
//     console.log(
//       `Node Status Update: ${data.label} is now ${newStatus ? "ACTIVE" : "INACTIVE"}`,
//     );
//   };

//   // Separate Function: For the Intelligence logic
//   const handleViewIntelligence = (e) => {
//     e.stopPropagation(); // Prevents triggering the card activation when clicking the button

//     console.log("Accessing Intelligence Data for:", data.label);
//     if (onSelect) onSelect(data.fullData);
//   };

//   return (
//     // <div className="group relative px-6 py-4 bg-[#0B0E11] border border-white/10 rounded-2xl shadow-2xl min-w-[220px] hover:border-[#00FFD1]/50 transition-all">

//     //   {/* TOP GLOW */}
//     //   <div className="absolute -top-px left-1/2 -translate-x-1/2 w-12 h-[2px] bg-[#00FFD1] shadow-[0_0_10px_#00FFD1]" />

//     //   {/* INPUT HANDLE (LEFT) */}
//     //   <Handle
//     //     type="target"
//     //     position={Position.Left}
//     //     className="!bg-[#00FFD1] !w-2 !h-2"
//     //   />

//     //   {/* CONTENT */}
//     //   <div className="flex flex-col gap-1">
//     //     <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em]">
//     //       {data.level || 'Academic Node'}
//     //     </span>

//     //     <h3 className="text-sm font-bold text-white group-hover:text-[#00FFD1] transition-colors leading-snug">
//     //       {data.label}
//     //     </h3>
//     //   </div>

//     //   <button
//     //     onClick={() => onSelect(data.fullData)}
//     //     className="mt-3 w-full py-2 bg-white/5 hover:bg-[#00FFD1]/10 rounded-lg text-[10px] text-[#00FFD1] font-black uppercase tracking-tighter border border-white/5 group-hover:border-[#00FFD1]/20 transition-all"
//     //   >
//     //     View Intelligence
//     //   </button>

//     //   {/* OUTPUT HANDLE (RIGHT) */}
//     //   <Handle
//     //     type="source"
//     //     position={Position.Right}
//     //     className="!bg-[#00FFD1] !w-2 !h-2"
//     //   />
//     // </div>

//     // <div
//     //   onClick={handleTap}
//     //   className={`
//     //     group relative px-6 py-4 rounded-2xl transition-all duration-300 cursor-pointer min-w-[220px] border
//     //     ${active ? 'bg-[#00FFD1]/10 border-[#00FFD1] shadow-[0_0_20px_rgba(0,255,209,0.3)]' : 'bg-[#0B0E11] border-white/10'}
//     //   `}
//     // >
//     //   {/* TOP GLOW */}
//     //   <div className={`absolute -top-px left-1/2 -translate-x-1/2 h-[2px] bg-[#00FFD1] transition-all ${active ? 'w-24' : 'w-12 opacity-50'}`} />

//     //   <Handle type="target" position={Position.Left} className="!bg-[#00FFD1] !w-2 !h-2" />

//     //   <div className="flex flex-col gap-1">
//     //     <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em]">
//     //       {data.level || 'Academic Node'}
//     //     </span>
//     //     <h3 className={`text-sm font-bold transition-colors ${active ? 'text-[#00FFD1]' : 'text-white'}`}>
//     //       {data.label}
//     //     </h3>
//     //   </div>

//     //   <div className={`mt-3 w-full py-2 rounded-lg text-[10px] font-black uppercase text-center border transition-all
//     //     ${active ? 'bg-[#00FFD1] text-black border-[#00FFD1]' : 'bg-white/5 text-[#00FFD1] border-white/5'}
//     //   `}>
//     //     {active ? 'Active Analysis' : 'View Intelligence'}
//     //   </div>

//     //   <Handle type="source" position={Position.Right} className="!bg-[#00FFD1] !w-2 !h-2" />
//     // </div>

//     // <div
//     //   onClick={handleTap}
//     //   className={`
//     //     group relative px-6 py-4 rounded-2xl transition-all duration-300 cursor-pointer min-w-[220px] border
//     //     ${active
//     //       ? 'bg-[#00FFD1]/10 border-[#00FFD1] shadow-[0_0_25px_rgba(0,255,209,0.2)] scale-[1.02]'
//     //       : 'bg-[#0B0E11] border-white/10 hover:border-white/30 scale-100'}
//     //   `}
//     // >
//     //   {/* TOP GLOW - Fades out when deactivated */}
//     //   <div className={`
//     //     absolute -top-px left-1/2 -translate-x-1/2 h-[2px] bg-[#00FFD1] transition-all duration-500
//     //     ${active ? 'w-24 shadow-[0_0_15px_#00FFD1]' : 'w-0 opacity-0'}
//     //   `} />

//     //   <Handle type="target" position={Position.Left} className="!bg-[#00FFD1] !w-2 !h-2 border-none" />

//     //   <div className="flex flex-col gap-1 pointer-events-none">
//     //     <span className={`text-[9px] font-mono uppercase tracking-[0.2em] transition-colors ${active ? 'text-[#00FFD1]' : 'text-slate-500'}`}>
//     //       {data.level || 'Academic Node'}
//     //     </span>
//     //     <h3 className={`text-sm font-bold transition-colors ${active ? 'text-[#00FFD1]' : 'text-white'}`}>
//     //       {data.label}
//     //     </h3>
//     //   </div>

//     //   <div className={`mt-3 w-full py-2 rounded-lg text-[10px] font-black uppercase text-center border transition-all
//     //     ${active
//     //       ? 'bg-[#00FFD1] text-black border-[#00FFD1]'
//     //       : 'bg-white/5 text-slate-400 border-white/5 group-hover:text-[#00FFD1]'}
//     //   `}>
//     //     {active ? 'Close Intelligence' : 'View Intelligence'}
//     //   </div>

//     //   <Handle type="source" position={Position.Right} className="!bg-[#00FFD1] !w-2 !h-2 border-none" />
//     // </div>

//     <div
//       onClick={toggleActivation}
//       className={`
//         group relative px-6 py-4 rounded-2xl transition-all duration-500 cursor-pointer min-w-[220px] border
//         ${
//           active
//             ? "bg-[#00FFD1]/10 border-[#00FFD1] shadow-[0_0_30px_rgba(0,255,209,0.2)]"
//             : "bg-[#0B0E11] border-white/50 hover:border-white/20"
//         }
//       `}
//     >
//       {/* TOP GLOW (Only shows when Active) */}
//       <div
//         className={`
//         absolute -top-px left-1/2 -translate-x-1/2 h-[2px] bg-[#00FFD1] transition-all duration-700
//         ${active ? "w-24 shadow-[0_0_15px_#00FFD1]" : "w-0 opacity-0"}
//       `}
//       />

//       <Handle
//         type="target"
//         position={Position.Left}
//         className="!bg-[#00FFD1] !w-2 !h-2 border-none"
//       />

//       {/* TEXT CONTENT */}
//       <div className="flex flex-col gap-1 pointer-events-none">
//         <span
//           className={`text-[9px] font-mono uppercase tracking-[0.2em] transition-colors ${active ? "text-[#00FFD1]" : "text-slate-500"}`}
//         >
//           {data.level || "Academic Node"}
//         </span>
//         <h3
//           className={`text-sm font-bold transition-colors ${active ? "text-[#00FFD1]" : "text-white group-hover:text-[#00FFD1]"}`}
//         >
//           {data.label}
//         </h3>
//       </div>

//       {/* INDEPENDENT BUTTON */}
//       <button
//         onClick={handleViewIntelligence}
//         className="mt-4 w-full py-2.5 bg-white/5 hover:bg-[#00FFD1] hover:text-black rounded-xl text-[10px] text-[#00FFD1] font-black uppercase tracking-widest border border-white/5 transition-all duration-300 z-20 relative"
//       >
//         View Intelligence
//       </button>

//       <Handle
//         type="source"
//         position={Position.Right}
//         className="!bg-[#00FFD1] !w-2 !h-2 border-none"
//       />
//     </div>
//   );
// };

// // 2. The Main Graph Generator
// const CareerTree = ({ courseId }) => {
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [courses, setCourses] = useState([]);

//   // 🔥 1. Fetch courses
//   useEffect(() => {
//     fetch("https://margaveda.onrender.com/api/courses")
//       .then((res) => res.json())
//       .then(setCourses)
//       .catch(console.error);
//   }, []);

//   // 🔥 2. Node types
//   const nodeTypes = useMemo(
//     () => ({
//       courseNode: (props) => (
//         <CourseNode {...props} onSelect={setSelectedCourse} />
//       ),
//     }),
//     [],
//   );

//   // 🔥 3. Build courseMap (optimized)
//   const courseMap = useMemo(() => {
//     const map = {};
//     courses.forEach((course) => {
//       map[course._id] = course;
//     });
//     return map;
//   }, [courses]);

//   // 🔥 4. Recursive tree builder
//   const buildTree = useCallback(
//     (id, visited = new Set()) => {
//       if (!id || visited.has(id)) return null;

//       const course = courseMap[id];
//       if (!course) return null;

//       const newVisited = new Set(visited);
//       newVisited.add(id);

//       return {
//         ...course,
//         nextCourses: (course.nextCourses || [])
//           .map((nextId) => buildTree(nextId, newVisited))
//           .filter(Boolean),
//       };
//     },
//     [courseMap],
//   );

//   // 🔥 5. Tree data (only when ready)
//   const treeData = useMemo(() => {
//     if (!courseId || !courses.length) return null;
//     return buildTree(courseId);
//   }, [courseId, courses, buildTree]);

//   // console.log("my tree", treeData);

//   // 🔥 6. Generate nodes + edges
//   const { nodes, edges } = useMemo(() => {
//     if (!treeData) return { nodes: [], edges: [] };

//     let counter = 0;

//     const generateElements = (data, level = 0) => {
//       if (!data) return { nodes: [], edges: [], rootId: null };

//       let nodes = [];
//       let edges = [];

//       const colors = ["#00FFD1", "#3B82F6", "#fac115", "#EC4899", "#8B5CF6"];
//       const branchColor = colors[level % colors.length];

//       const uniqueId = `${data._id}_${counter++}`;

//       nodes.push({
//         id: uniqueId,
//         type: "courseNode",
//         data: {
//           label: data.name,
//           originalId: data._id,
//           level: data.level,
//           fullData: data,
//         },
//         position: { x: 0, y: 0 },
//       });

//       (data.nextCourses || []).forEach((child) => {
//         if (!child) return;

//         const result = generateElements(child, level + 1);
//         if (!result.rootId) return;

//         edges.push({
//           id: `e-${uniqueId}-${result.rootId}`,
//           source: uniqueId,
//           target: result.rootId,
//           type: "bezier",
//           animated: true,
//           style: { stroke: branchColor, strokeWidth: 3, opacity: 0.6 },
//           markerEnd: {
//             type: MarkerType.ArrowClosed,
//             color: branchColor,
//           },
//         });

//         nodes.push(...result.nodes);
//         edges.push(...result.edges);
//       });

//       return { nodes, edges, rootId: uniqueId };
//     };

//     return generateElements(treeData);
//   }, [treeData]);

//   // 🔥 7. Layout (dagre)
//   const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
//     return getLayoutedElements(nodes, edges);
//   }, [nodes, edges]);

//   // 🔥 8. ReactFlow state
//   const [nodesState, setNodes, onNodesChange] = useNodesState([]);
//   const [edgesState, setEdges, onEdgesChange] = useEdgesState([]);

//   useEffect(() => {
//     setNodes(layoutedNodes);
//     setEdges(layoutedEdges);
//   }, [layoutedNodes, layoutedEdges]);

//   // 🔥 9. Loading guard
//   if (!courses.length) {
//     return <div className="text-white">Loading Tree...</div>;
//   }

//   return (
//     <div className="w-full h-[800px] bg-[#080B0D] border border-white/5 rounded-[40px] overflow-hidden relative shadow-inner mt-10">
//       {/* Background HUD UI */}
//       <div className="absolute top-8 left-8 z-10 space-y-2 pointer-events-none">
//         <h2 className="text-[#00FFD1] text-xs font-black uppercase tracking-[0.4em]">
//           Neural Courses Map
//         </h2>
//         <p className="text-slate-500 text-[12px] font-mono">
//           Visualize your journey in a tree graph
//         </p>
//       </div>

//       <ReactFlow
//         nodes={nodesState}
//         edges={edgesState}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         nodeTypes={nodeTypes}
//         fitView
//         minZoom={0.2}
//       >
//         <Background color="#1e293b" gap={20} size={1} />
//         <Controls
//           className="bg-[#000] border-white/10 fill-white"
//           style={{ background: "#0B0E11" }}
//           showInteractive={false}
//         />
//       </ReactFlow>

//       {selectedCourse && (
//         <ViewDetails
//           selectedCourse={selectedCourse}
//           handleCloseModal={() => setSelectedCourse(null)}
//         />
//       )}

//       {/* Glassmorphism Legend */}
//       <div className="absolute bottom-8 right-8 bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex gap-6">
//         <div className="flex items-center gap-2">
//           <div className="w-2 h-2 rounded-full bg-[#00FFD1]" />
//           <span className="text-[10px] text-slate-400 font-bold">
//             CORE PATH
//           </span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-2 h-2 rounded-full bg-blue-500" />
//           <span className="text-[10px] text-slate-400 font-bold">
//             SPECIALIZATION
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CareerTree;

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  PlusCircle,
  Microscope,
  Fingerprint,
  Terminal,
  X,
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTracker } from "../../context/TrackerContext";
// import ReactFlow, {useNodesState, useEdgesState, Background, Controls, MarkerType, Handle, Position, } from "reactflow";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MarkerType,
  Handle,
  Position,
  BaseEdge,
  getBezierPath,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import ViewDetails from "../coursePage/ViewDetails";

const BezierEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />
  );
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges) => {
  const nodeWidth = 600;
  const nodeHeight = 150;

  dagreGraph.setGraph({ rankdir: "LR" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const pos = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: pos.x - nodeWidth / 2,
          y: pos.y - nodeHeight / 2,
        },
      };
    }),
    edges,
  };
};

/////////////////////////
// 🔥 NODE COMPONENT
/////////////////////////

const CourseNode = ({ id, data, onSelect, onActivate, activePathIds }) => {
  const isActive = activePathIds.includes(id);

  const handleClick = (e) => {
    e.stopPropagation();
    onActivate(id);
  };

  const handleView = (e) => {
    e.stopPropagation();
    onSelect(data.fullData);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative px-6 py-4 rounded-2xl transition-all duration-500 cursor-pointer min-w-[220px] border
        ${
          isActive
            ? "bg-[#00FFD1]/10 border-[#00FFD1] shadow-[0_0_30px_rgba(0,255,209,0.3)]"
            : "bg-[#0B0E11] border-white/50 hover:border-white/20"
        }`}
    >
      {/* TOP GLOW */}
      <div
        className={`absolute -top-px left-1/2 -translate-x-1/2 h-[2px] bg-[#00FFD1] transition-all duration-700
        ${isActive ? "w-24 shadow-[0_0_15px_#00FFD1]" : "w-0 opacity-0"}`}
      />

      <Handle
        type="target"
        position={Position.Left}
        className="!bg-[#00FFD1] !w-2 !h-2 border-none"
      />

      <div className="flex flex-col gap-1 pointer-events-none">
        <span
          className={`text-[9px] font-mono uppercase tracking-[0.2em]
          ${isActive ? "text-[#00FFD1]" : "text-slate-500"}`}
        >
          {data.level || "Academic Node"}
        </span>

        <h3
          className={`text-sm font-bold
          ${isActive ? "text-[#00FFD1]" : "text-white group-hover:text-[#00FFD1]"}`}
        >
          {data.label}
        </h3>
      </div>

      <button
        onClick={handleView}
        className="mt-4 w-full py-2.5 bg-white/5 hover:bg-[#00FFD1] hover:text-black rounded-xl text-[10px] text-[#00FFD1] font-black uppercase tracking-widest border border-white/5 transition-all duration-300"
      >
        View Intelligence
      </button>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-[#00FFD1] !w-2 !h-2 border-none"
      />
    </div>
  );
};

/////////////////////////
// 🔥 MAIN COMPONENT
/////////////////////////

const edgeTypes = {
  bezier: BezierEdge,
};

const CareerTree = ({ courseId }) => {
  const { addStep } = useTracker();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activePathIds, setActivePathIds] = useState([]);
  const [saved, setSaved] = useState(false);

  // const edgeTypes = useMemo(() => ({
  //   bezier: BezierEdge,
  // }), []);

  /////////////////////////
  // FETCH DATA
  /////////////////////////
  useEffect(() => {
    fetch("https://margaveda.onrender.com/api/courses")
      .then((res) => res.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  /////////////////////////
  // SAVING TRACKER DATA
  /////////////////////////
  const handleSavePath = () => {
    if (!activePathIds.length) return;

    const cleanedIds = activePathIds.map((id) => id.replace(/_\d+$/, ""));

    cleanedIds.forEach((courseId) => {
      const course = courseMap[courseId];

      addStep({
        _id: courseId,
        title: course?.name || courseId,
      });
    });

    // 🔥 success feedback
    setSaved(true);

    // 🔥 reset after 2 sec
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };
  /////////////////////////
  // MAP
  /////////////////////////
  const courseMap = useMemo(() => {
    const map = {};
    courses.forEach((c) => (map[c._id] = c));
    return map;
  }, [courses]);

  /////////////////////////
  // TREE BUILD
  /////////////////////////
  const buildTree = useCallback(
    (id, visited = new Set()) => {
      if (!id || visited.has(id)) return null;

      const course = courseMap[id];
      if (!course) return null;

      const newVisited = new Set(visited);
      newVisited.add(id);

      return {
        ...course,
        nextCourses: (course.nextCourses || [])
          .map((n) => buildTree(n, newVisited))
          .filter(Boolean),
      };
    },
    [courseMap],
  );

  const treeData = useMemo(() => {
    if (!courseId || !courses.length) return null;
    return buildTree(courseId);
  }, [courseId, courses, buildTree]);

  /////////////////////////
  // GENERATE GRAPH
  /////////////////////////
  const { nodes, edges } = useMemo(() => {
    if (!treeData) return { nodes: [], edges: [] };

    let counter = 0;

    const generate = (data, level = 0) => {
      let nodes = [];
      let edges = [];

      const colors = [
        "#00ff0d",
        "#1b70f8",
        "#f74d04",
        "#fb027f",
        "#cf05f8",
        "#4C3BCF",
      ];
      const branchColor = colors[level % colors.length];

      const id = `${data._id}_${counter++}`;

      nodes.push({
        id,
        type: "courseNode",
        data: {
          label: data.name,
          fullData: data,
          level: data.level,
        },
        position: { x: 0, y: 0 },
      });

      (data.nextCourses || []).forEach((child) => {
        const res = generate(child, level + 1);

        edges.push({
          id: `e-${id}-${res.root}`,
          source: id,
          target: res.root,
          type: "bezier",
          style: { stroke: branchColor, strokeWidth: 3, opacity: 0.4 },
          markerEnd: { type: MarkerType.ArrowClosed, color: branchColor },
        });

        nodes.push(...res.nodes);
        edges.push(...res.edges);
      });

      return { nodes, edges, root: id };
    };

    return generate(treeData);
  }, [treeData]);

  /////////////////////////
  // LAYOUT
  /////////////////////////
  const { nodes: layoutNodes, edges: layoutEdges } = useMemo(() => {
    return getLayoutedElements(nodes, edges);
  }, [nodes, edges]);

  /////////////////////////
  // PARENT MAP (KEY 🔥)
  /////////////////////////
  const parentMap = useMemo(() => {
    const map = {};
    layoutEdges.forEach((e) => {
      map[e.target] = e.source;
    });
    return map;
  }, [layoutEdges]);

  /////////////////////////
  // CLICK HANDLER
  /////////////////////////
  const handleNodeClick = (id) => {
    let path = [];
    let current = id;

    while (current) {
      path.unshift(current);
      current = parentMap[current];
    }

    setActivePathIds(path);
  };

  /////////////////////////
  // APPLY HIGHLIGHT
  /////////////////////////
  const finalEdges = useMemo(() => {
    return layoutEdges.map((edge) => {
      const active =
        activePathIds.includes(edge.source) &&
        activePathIds.includes(edge.target);

      return {
        ...edge,

        // 🔥 IMPORTANT: ALL EDGES ANIMATED
        animated: true,

        style: {
          // 🟡 Yellow if active, else original color
          stroke: active ? "#FFD700" : edge.style?.stroke || "#00FFD1",

          // 🔥 Thickness difference
          strokeWidth: active ? 4 : 4,

          // 🔥 DOTTED FOR ALL
          strokeDasharray: "6 6",

          // 🔥 Fade inactive
          opacity: active ? 1 : 0.7,

          // 🔥 Glow only for active
          filter: active ? "drop-shadow(0 0 6px #FFD700)" : "none",
        },

        markerEnd: {
          ...edge.markerEnd,
          color: active ? "#FFD700" : edge.markerEnd?.color,
        },
      };
    });
  }, [layoutEdges, activePathIds]);

  /////////////////////////
  // REACTFLOW STATE
  /////////////////////////
  const [nodesState, setNodes, onNodesChange] = useNodesState([]);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes(layoutNodes);
    setEdges(finalEdges);
  }, [layoutNodes, finalEdges]);

  /////////////////////////
  // NODE TYPES
  /////////////////////////
  const nodeTypes = useMemo(
    () => ({
      courseNode: (props) => (
        <CourseNode
          {...props}
          onSelect={setSelectedCourse}
          onActivate={handleNodeClick}
          activePathIds={activePathIds}
        />
      ),
    }),
    [activePathIds],
  );

  /////////////////////////
  // UI
  /////////////////////////
  return (
    <>
      {activePathIds?.length > 0 && (
        <div className="w-full mb-6">
          <div
            className="
        w-full
        bg-[#0A0F12]/90 backdrop-blur-xl
        border border-white/10
        rounded-lg
        p-3
        flex flex-col md:flex-row gap-3
      "
          >
            {/* MOBILE HEADER */}
            <div className="flex justify-between items-center md:hidden border-b border-white/10 pb-2">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                Selected Courses
              </span>
              <button
                onClick={() => setActivePathIds([])}
                className="text-[10px] text-red-400 font-bold"
              >
                Clear
              </button>
            </div>

            {/* COURSES LIST */}
            <div
              className="
          flex-1 flex gap-3
          overflow-x-auto md:overflow-visible
          flex-nowrap md:flex-wrap
          py-2 px-1
        "
            >
              {activePathIds.map((id, index) => (
                <div key={index} className="flex items-center gap-2 shrink-0">
                  <div
                    className="
                px-3 py-1.5
                text-[11px]
                bg-cyan-500/10
                border border-cyan-500/20
                text-cyan-100
                rounded-md
                whitespace-nowrap
              "
                  >
                    {id.replace(/_\d+$/, "")}
                  </div>

                  {index < activePathIds.length - 1 && (
                    <span className="text-white/30 text-xs">→</span>
                  )}
                </div>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">
              {/* DESKTOP CLEAR */}
              <button
                onClick={() => setActivePathIds([])}
                className="hidden md:block text-xs text-[#CE2626] hover:text-white p-1"
              >
                Clear
              </button>

              {/* CONFIRM */}
              <button
                onClick={handleSavePath}
                className="
                  px-5 py-2
                  bg-cyan-400 hover:bg-cyan-300
                  text-black
                  text-xs font-bold
                  rounded-md
                  transition-all
                "
              >
                {saved ? "✓ Path Saved" : "Save Path"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-[90%] mx-auto h-[800px] bg-[#080B0D] border border-white/10 rounded-2xl overflow-hidden relative shadow-[0_0_40px_rgba(0,255,209,0.05)]">
        {/* 🔥 HEADER */}
        <div className="absolute top-6 left-6 z-10 space-y-1 pointer-events-none">
          <h2 className="text-[#00FFD1] text-xs font-black uppercase tracking-[0.4em]">
            Neural Courses Map
          </h2>
          <p className="text-slate-500 text-[12px] font-mono">
            Visualize your journey in a tree graph
          </p>
        </div>

        <ReactFlow
          key="bezier-flow"
          nodes={nodesState}
          edges={edgesState}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          // 🔥 REMOVE WATERMARK
          proOptions={{ hideAttribution: true }}
          // existing props
          panOnDrag={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={false}
          panOnScroll={false}
          minZoom={0.3}
          maxZoom={1.5}
        >
          <Background />
          <Controls />
        </ReactFlow>

        {selectedCourse && (
          <ViewDetails
            selectedCourse={selectedCourse}
            handleCloseModal={() => setSelectedCourse(null)}
          />
        )}
      </div>
    </>
  );
};

export default CareerTree;
