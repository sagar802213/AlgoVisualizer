import { BarChart3, Search, Share2, Layers, GitBranch } from "lucide-react";

// Algorithm categories
export const categories = [
  {
    id: "sorting",
    icon: BarChart3,
    title: "Sorting",
    color: "blue",
    algorithms: [
      { name: "Bubble Sort", complexity: "O(n²)" },
      { name: "Selection Sort", complexity: "O(n²)" },
      { name: "Insertion Sort", complexity: "O(n²)" },
      { name: "Merge Sort", complexity: "O(n log n)" },
      { name: "Quick Sort", complexity: "O(n log n)" },
      { name: "Heap Sort", complexity: "O(n log n)" },
    ],
  },
  {
    id: "searching",
    icon: Search,
    title: "Searching",
    color: "purple",
    algorithms: [
      { name: "Linear Search", complexity: "O(n)" },
      { name: "Binary Search", complexity: "O(log n)" },
      { name: "Jump Search", complexity: "O(√n)" },
      { name: "Interpolation Search", complexity: "O(log log n)" },
    ],
  },
  {
    id: "graph",
    icon: Share2,
    title: "Graph",
    color: "cyan",
    algorithms: [
      { name: "BFS", complexity: "O(V+E)" },
      { name: "DFS", complexity: "O(V+E)" },
      { name: "Dijkstra", complexity: "O(V² or V+E log V)" },
      { name: "Bellman-Ford", complexity: "O(VE)" },
      { name: "Kruskal's MST", complexity: "O(E log E)" },
    ],
  },
  {
    id: "stack-queue",
    icon: Layers,
    title: "Stack & Queue",
    color: "emerald",
    algorithms: [
      { name: "Stack Operations", complexity: "O(1)" },
      { name: "Queue Operations", complexity: "O(1)" },
      { name: "Priority Queue", complexity: "O(log n)" },
      { name: "Deque", complexity: "O(1)" },
    ],
  },
];

// Color classes for styling
export const colorClasses = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "border-blue-500",
    hover: "hover:bg-blue-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    border: "border-purple-500",
    hover: "hover:bg-purple-500/20",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-500",
    border: "border-cyan-500",
    hover: "hover:bg-cyan-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500",
    hover: "hover:bg-emerald-500/20",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    border: "border-amber-500",
    hover: "hover:bg-amber-500/20",
  },
};

// Helper function for sleep/delay
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Calculate delay based on speed (1-100)
export const getDelay = (speed) => Math.max(10, 500 - speed * 4.9);
