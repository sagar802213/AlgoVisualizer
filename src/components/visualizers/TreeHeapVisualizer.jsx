import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Minus,
  Play,
  Pause,
  ArrowRight,
  RotateCcw,
  Settings,
} from "lucide-react";
import { colorClasses, sleep, getDelay } from "./config";

// Tree Node class
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Build BST from array
const buildBST = (values) => {
  if (values.length === 0) return null;

  const insert = (root, value) => {
    if (!root) return new TreeNode(value);
    if (value < root.value) {
      root.left = insert(root.left, value);
    } else {
      root.right = insert(root.right, value);
    }
    return root;
  };

  let root = null;
  values.forEach((v) => (root = insert(root, v)));
  return root;
};

// Convert tree to array for rendering
const treeToArray = (root, level = 0, pos = 0, arr = []) => {
  if (!root) return arr;
  arr.push({ value: root.value, level, pos });
  treeToArray(root.left, level + 1, pos * 2, arr);
  treeToArray(root.right, level + 1, pos * 2 + 1, arr);
  return arr;
};

function TreeHeapVisualizer({ algorithm, color }) {
  const [values, setValues] = useState([50, 30, 70, 20, 40, 60, 80]);
  const [inputValue, setInputValue] = useState("");
  const [highlighted, setHighlighted] = useState([]);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const runningRef = useRef(false);

  const colors = colorClasses[color];
  const tree = buildBST(values);
  const nodes = treeToArray(tree);

  // Insert value
  const insertValue = () => {
    if (!inputValue) return;
    const val = parseInt(inputValue);
    if (!values.includes(val)) {
      setValues((prev) => [...prev, val]);
    }
    setInputValue("");
    setHighlighted([]);
    setTraversalOrder([]);
  };

  // Delete value
  const deleteValue = () => {
    if (!inputValue || values.length <= 1) return;
    const val = parseInt(inputValue);
    setValues((prev) => prev.filter((v) => v !== val));
    setInputValue("");
    setHighlighted([]);
    setTraversalOrder([]);
  };

  // Search value
  const searchValue = async () => {
    if (!inputValue) return;
    const val = parseInt(inputValue);
    let node = tree;
    const path = [];

    runningRef.current = true;
    setIsPlaying(true);
    setTraversalOrder([]);

    while (node) {
      if (!runningRef.current) break;
      path.push(node.value);
      setHighlighted([...path]);
      await sleep(getDelay(speed) * 2);

      if (node.value === val) {
        setTraversalOrder([`Found ${val}!`]);
        break;
      } else if (val < node.value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    if (!node) {
      setTraversalOrder([`${val} not found`]);
    }

    runningRef.current = false;
    setIsPlaying(false);
  };

  // Traversals
  const inorderTraversal = async (node, result = []) => {
    if (!node || !runningRef.current) return result;
    await inorderTraversal(node.left, result);
    if (!runningRef.current) return result;
    result.push(node.value);
    setHighlighted([...result]);
    setTraversalOrder([...result]);
    await sleep(getDelay(speed) * 2);
    await inorderTraversal(node.right, result);
    return result;
  };

  const preorderTraversal = async (node, result = []) => {
    if (!node || !runningRef.current) return result;
    result.push(node.value);
    setHighlighted([...result]);
    setTraversalOrder([...result]);
    await sleep(getDelay(speed) * 2);
    await preorderTraversal(node.left, result);
    await preorderTraversal(node.right, result);
    return result;
  };

  const postorderTraversal = async (node, result = []) => {
    if (!node || !runningRef.current) return result;
    await postorderTraversal(node.left, result);
    await postorderTraversal(node.right, result);
    if (!runningRef.current) return result;
    result.push(node.value);
    setHighlighted([...result]);
    setTraversalOrder([...result]);
    await sleep(getDelay(speed) * 2);
    return result;
  };

  const startTraversal = async (type) => {
    setHighlighted([]);
    setTraversalOrder([]);
    runningRef.current = true;
    setIsPlaying(true);

    switch (type) {
      case "inorder":
        await inorderTraversal(tree);
        break;
      case "preorder":
        await preorderTraversal(tree);
        break;
      case "postorder":
        await postorderTraversal(tree);
        break;
    }

    runningRef.current = false;
    setIsPlaying(false);
  };

  const stopTraversal = () => {
    runningRef.current = false;
    setIsPlaying(false);
  };

  const reset = () => {
    setValues([50, 30, 70, 20, 40, 60, 80]);
    setHighlighted([]);
    setTraversalOrder([]);
    setInputValue("");
    stopTraversal();
  };

  // Calculate node position
  const getNodePosition = (level, pos) => {
    const maxWidth = 320;
    const levelWidth = maxWidth / Math.pow(2, level);
    const x =
      levelWidth * (pos + 0.5) +
      levelWidth * Math.pow(2, level - 1) * (level > 0 ? 0 : 0);
    const y = level * 70 + 40;
    return {
      x: 40 + pos * (280 / Math.pow(2, level)) + 280 / Math.pow(2, level + 1),
      y,
    };
  };

  const isBST = algorithm.name === "BST Operations";
  const isTraversal = algorithm.name === "Tree Traversals";

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="w-32 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />

          {isBST && (
            <>
              <button
                onClick={insertValue}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-all"
              >
                <Plus className="w-4 h-4" />
                Insert
              </button>
              <button
                onClick={deleteValue}
                disabled={values.length <= 1}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={searchValue}
                disabled={isPlaying}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-all disabled:opacity-50"
              >
                Search
              </button>
            </>
          )}

          {isTraversal && (
            <>
              <button
                onClick={() => startTraversal("inorder")}
                disabled={isPlaying}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                Inorder
              </button>
              <button
                onClick={() => startTraversal("preorder")}
                disabled={isPlaying}
                className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                Preorder
              </button>
              <button
                onClick={() => startTraversal("postorder")}
                disabled={isPlaying}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                Postorder
              </button>
              {isPlaying && (
                <button
                  onClick={stopTraversal}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition-all"
                >
                  <Pause className="w-4 h-4" />
                  Stop
                </button>
              )}
            </>
          )}

          <button
            onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white hover:bg-slate-700 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <Settings className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">Speed:</span>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24 accent-amber-500"
            />
          </div>
        </div>

        {traversalOrder.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <span className="text-slate-400">Order: </span>
            <span className="text-amber-400 font-mono">
              {traversalOrder.join(" → ")}
            </span>
          </div>
        )}
      </div>

      {/* Visualization */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-8">
        <div className="mb-6">
          <h2 className={`text-2xl font-bold ${colors.text} mb-1`}>
            {algorithm.name}
          </h2>
          <p className="text-slate-400">
            Time Complexity:{" "}
            <span className="text-white">{algorithm.complexity}</span>
          </p>
        </div>

        {/* Tree SVG */}
        <div className="bg-slate-800/50 rounded-xl p-6 overflow-x-auto">
          <svg
            viewBox="0 0 360 280"
            className="w-full max-w-lg mx-auto min-w-[300px]"
          >
            {/* Edges */}
            {nodes.map((node) => {
              const parent = nodes.find(
                (n) =>
                  n.level === node.level - 1 &&
                  Math.floor(node.pos / 2) === n.pos,
              );
              if (!parent) return null;

              const parentPos = getNodePosition(parent.level, parent.pos);
              const childPos = getNodePosition(node.level, node.pos);

              return (
                <line
                  key={`edge-${node.value}`}
                  x1={parentPos.x}
                  y1={parentPos.y}
                  x2={childPos.x}
                  y2={childPos.y}
                  stroke={
                    highlighted.includes(node.value) &&
                    highlighted.includes(parent.value)
                      ? "#f59e0b"
                      : "#475569"
                  }
                  strokeWidth={2}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const pos = getNodePosition(node.level, node.pos);
              const isHighlighted = highlighted.includes(node.value);

              return (
                <g key={node.value}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={22}
                    fill={isHighlighted ? "#f59e0b" : "#475569"}
                    className="transition-all duration-300"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 5}
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {node.value}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Values */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {values
            .sort((a, b) => a - b)
            .map((value) => (
              <span
                key={value}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  highlighted.includes(value)
                    ? "bg-amber-500 text-white"
                    : "bg-slate-800 border border-slate-700 text-white"
                } transition-all duration-300`}
              >
                {value}
              </span>
            ))}
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How it works</h3>
        <p className="text-slate-400 leading-relaxed mb-4">
          {isBST &&
            "A Binary Search Tree maintains the property that left children are smaller and right children are larger than the parent. This enables O(log n) search, insert, and delete operations."}
          {isTraversal &&
            "Tree traversals visit all nodes in a specific order. Inorder (Left-Root-Right) gives sorted order for BST. Preorder (Root-Left-Right) is used for copying. Postorder (Left-Right-Root) is used for deletion."}
          {!isBST &&
            !isTraversal &&
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
    </div>
  );
}

export default TreeHeapVisualizer;
