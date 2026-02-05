import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { colorClasses, sleep, getDelay } from "./config";
import { HowItWorksModal } from "../HowItWorksModal";
import { algorithmDetails } from "./algorithmDetails";

// Sample graph structure
const createGraph = () => ({
  nodes: [
    { id: 0, x: 150, y: 50 },
    { id: 1, x: 50, y: 150 },
    { id: 2, x: 250, y: 150 },
    { id: 3, x: 50, y: 280 },
    { id: 4, x: 150, y: 200 },
    { id: 5, x: 250, y: 280 },
  ],
  edges: [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 2 },
    { from: 1, to: 3, weight: 5 },
    { from: 1, to: 4, weight: 1 },
    { from: 2, to: 4, weight: 3 },
    { from: 2, to: 5, weight: 6 },
    { from: 3, to: 4, weight: 2 },
    { from: 4, to: 5, weight: 4 },
  ],
});

function GraphVisualizer({ algorithm, color }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [graph, setGraph] = useState(createGraph());
  const [visited, setVisited] = useState([]);
  const [current, setCurrent] = useState(-1);
  const [visitedEdges, setVisitedEdges] = useState([]);
  const [queue, setQueue] = useState([]);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const runningRef = useRef(false);

  const colors = colorClasses[color];

  const resetGraph = () => {
    if (isRunning) return;
    setGraph(createGraph());
    setVisited([]);
    setCurrent(-1);
    setVisitedEdges([]);
    setQueue([]);
  };

  // Get adjacency list
  const getAdjList = () => {
    const adj = {};
    graph.nodes.forEach((node) => (adj[node.id] = []));
    graph.edges.forEach((edge) => {
      adj[edge.from].push({ node: edge.to, weight: edge.weight });
      adj[edge.to].push({ node: edge.from, weight: edge.weight }); // undirected
    });
    return adj;
  };

  // BFS
  const bfs = async () => {
    const adj = getAdjList();
    const visited = new Set();
    const q = [0];
    visited.add(0);

    while (q.length > 0) {
      if (!runningRef.current) return;

      const node = q.shift();
      setCurrent(node);
      setQueue([...q]);
      await sleep(getDelay(speed) * 2);

      setVisited((prev) => [...prev, node]);

      for (const neighbor of adj[node]) {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node);
          q.push(neighbor.node);
          setQueue([...q]);
          setVisitedEdges((prev) => [
            ...prev,
            { from: node, to: neighbor.node },
          ]);
          await sleep(getDelay(speed));
        }
      }
    }
    setCurrent(-1);
  };

  // DFS
  const dfs = async () => {
    const adj = getAdjList();
    const visited = new Set();

    const dfsHelper = async (node) => {
      if (!runningRef.current || visited.has(node)) return;

      visited.add(node);
      setCurrent(node);
      await sleep(getDelay(speed) * 2);
      setVisited((prev) => [...prev, node]);

      for (const neighbor of adj[node]) {
        if (!visited.has(neighbor.node)) {
          setVisitedEdges((prev) => [
            ...prev,
            { from: node, to: neighbor.node },
          ]);
          await sleep(getDelay(speed));
          await dfsHelper(neighbor.node);
        }
      }
    };

    await dfsHelper(0);
    setCurrent(-1);
  };

  // Dijkstra
  const dijkstra = async () => {
    const adj = getAdjList();
    const dist = {};
    const visited = new Set();
    graph.nodes.forEach((n) => (dist[n.id] = Infinity));
    dist[0] = 0;

    while (visited.size < graph.nodes.length) {
      if (!runningRef.current) return;

      let minDist = Infinity;
      let minNode = -1;

      for (const node of graph.nodes) {
        if (!visited.has(node.id) && dist[node.id] < minDist) {
          minDist = dist[node.id];
          minNode = node.id;
        }
      }

      if (minNode === -1) break;

      setCurrent(minNode);
      await sleep(getDelay(speed) * 2);
      visited.add(minNode);
      setVisited((prev) => [...prev, minNode]);

      for (const neighbor of adj[minNode]) {
        const newDist = dist[minNode] + neighbor.weight;
        if (newDist < dist[neighbor.node]) {
          dist[neighbor.node] = newDist;
          setVisitedEdges((prev) => [
            ...prev,
            { from: minNode, to: neighbor.node },
          ]);
          await sleep(getDelay(speed));
        }
      }
    }
    setCurrent(-1);
  };

  // Start algorithm
  const startAlgorithm = async () => {
    setVisited([]);
    setCurrent(-1);
    setVisitedEdges([]);
    setQueue([]);
    runningRef.current = true;
    setIsRunning(true);
    setIsPlaying(true);

    switch (algorithm.name) {
      case "BFS":
        await bfs();
        break;
      case "DFS":
        await dfs();
        break;
      case "Dijkstra":
        await dijkstra();
        break;
      default:
        break;
    }

    runningRef.current = false;
    setIsRunning(false);
    setIsPlaying(false);
  };

  const stopAlgorithm = () => {
    runningRef.current = false;
    setIsRunning(false);
    setIsPlaying(false);
  };

  useEffect(() => {
    stopAlgorithm();
    setVisited([]);
    setCurrent(-1);
    setVisitedEdges([]);
    setQueue([]);
  }, [algorithm]);

  // Check if edge is visited
  const isEdgeVisited = (from, to) => {
    return visitedEdges.some(
      (e) =>
        (e.from === from && e.to === to) || (e.from === to && e.to === from),
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={isPlaying ? stopAlgorithm : startAlgorithm}
              disabled={!["BFS", "DFS", "Dijkstra"].includes(algorithm.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                isPlaying
                  ? "bg-red-500/20 text-red-500 border border-red-500"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
              } ${!["BFS", "DFS", "Dijkstra"].includes(algorithm.name) ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start
                </>
              )}
            </button>
            <button
              onClick={resetGraph}
              disabled={isRunning}
              className={`flex items-center gap-2 px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white hover:bg-slate-700 transition-all ${
                isRunning ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={() => setShowHowItWorks(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-xl hover:bg-indigo-500/20 transition-all"
              title="Learn how this algorithm works"
            >
              <HelpCircle className="w-4 h-4" />
              How it works
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">Speed:</span>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24 accent-cyan-500"
            />
            <span className="text-sm text-white w-8">{speed}%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-slate-600"></div>
            <span className="text-xs text-slate-400">Unvisited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-slate-400">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
            <span className="text-xs text-slate-400">Visited</span>
          </div>
        </div>
      </div>

      {/* Graph Visualization */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-8">
        <div className="mb-6">
          <h2 className={`text-2xl font-bold ${colors.text} mb-1`}>
            {algorithm.name}
          </h2>
          <p className="text-slate-400">
            Time Complexity:{" "}
            <span className="text-white">{algorithm.complexity}</span>
            {queue.length > 0 && (
              <>
                {" • "}
                Queue:{" "}
                <span className="text-cyan-400">[{queue.join(", ")}]</span>
              </>
            )}
          </p>
        </div>

        {/* SVG Graph */}
        <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
          <svg viewBox="0 0 300 330" className="w-full max-w-md mx-auto">
            {/* Edges */}
            {graph.edges.map((edge, idx) => {
              const from = graph.nodes.find((n) => n.id === edge.from);
              const to = graph.nodes.find((n) => n.id === edge.to);
              const isActive = isEdgeVisited(edge.from, edge.to);
              return (
                <g key={idx}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isActive ? "#22d3ee" : "#475569"}
                    strokeWidth={isActive ? 3 : 2}
                    className="transition-all duration-300"
                  />
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 5}
                    fill="#94a3b8"
                    fontSize="12"
                    textAnchor="middle"
                  >
                    {edge.weight}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {graph.nodes.map((node) => (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={20}
                  fill={
                    current === node.id
                      ? "#eab308"
                      : visited.includes(node.id)
                        ? "#22d3ee"
                        : "#475569"
                  }
                  className="transition-all duration-300"
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {node.id}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Visited Order */}
        {visited.length > 0 && (
          <div className="text-center p-4 bg-slate-800/50 rounded-xl">
            <span className="text-slate-400">Visited Order: </span>
            <span className="text-cyan-400 font-mono">
              {visited.join(" → ")}
            </span>
          </div>
        )}
      </div>

      {/* Algorithm Info */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How it works</h3>
        <p className="text-slate-400 leading-relaxed mb-4">
          {algorithm.name === "BFS" &&
            "Breadth-First Search explores all neighbors at the current depth before moving to nodes at the next depth level."}
          {algorithm.name === "DFS" &&
            "Depth-First Search explores as far as possible along each branch before backtracking."}
          {algorithm.name === "Dijkstra" &&
            "Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a weighted graph."}
          {!["BFS", "DFS", "Dijkstra"].includes(algorithm.name) &&
            `${algorithm.name} visualization coming soon!`}
        </p>
        <Link
          to="/learn"
          className={`inline-flex items-center gap-2 ${colors.text} font-medium group`}
        >
          Learn more about {algorithm.name}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* How It Works Modal */}
      <HowItWorksModal
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
        algorithm={algorithm}
        algorithmDetails={algorithmDetails[algorithm.name]}
      />
    </div>
  );
}

export default GraphVisualizer;
