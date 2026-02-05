import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  ArrowRight,
  Plus,
  HelpCircle,
} from "lucide-react";
import { colorClasses, sleep, getDelay } from "./config";
import { HowItWorksModal } from "../HowItWorksModal";
import { algorithmDetails } from "./algorithmDetails";

function SortingVisualizer({ algorithm, color }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [array, setArray] = useState([
    64, 34, 25, 12, 22, 11, 90, 45, 78, 33, 55, 42, 67, 29, 81,
  ]);
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [inputError, setInputError] = useState("");
  const sortingRef = useRef(false);

  const colors = colorClasses[color];

  const generateNewArray = () => {
    if (isSorting) return;
    const newArray = Array.from(
      { length: 15 },
      () => Math.floor(Math.random() * 85) + 15,
    );
    setArray(newArray);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setCustomInput("");
    setInputError("");
  };

  // Handle custom array input
  const handleCustomArray = () => {
    if (isSorting) return;
    setInputError("");

    // Parse input - accept comma, space, or both as separators
    const values = customInput
      .split(/[\s,]+/)
      .filter((v) => v.trim() !== "")
      .map((v) => parseInt(v.trim(), 10));

    // Validate
    if (values.length === 0) {
      setInputError("Please enter at least one number");
      return;
    }

    if (values.length > 20) {
      setInputError("Maximum 20 elements allowed");
      return;
    }

    if (values.some((v) => isNaN(v))) {
      setInputError("Please enter valid numbers only");
      return;
    }

    if (values.some((v) => v < 1 || v > 100)) {
      setInputError("Values must be between 1 and 100");
      return;
    }

    setArray(values);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setCustomInput("");
  };

  // Bubble Sort
  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!sortingRef.current) return;

        setComparing([j, j + 1]);
        await sleep(getDelay(speed));

        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          await sleep(getDelay(speed));

          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);

          setSwapping([]);
        }
        setComparing([]);
      }
      setSorted((prev) => [...prev, n - 1 - i]);
    }
    setSorted(Array.from({ length: n }, (_, i) => i));
  };

  // Selection Sort
  const selectionSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      for (let j = i + 1; j < n; j++) {
        if (!sortingRef.current) return;

        setComparing([minIdx, j]);
        await sleep(getDelay(speed));

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        setSwapping([i, minIdx]);
        await sleep(getDelay(speed));

        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);

        setSwapping([]);
      }
      setComparing([]);
      setSorted((prev) => [...prev, i]);
    }
    setSorted(Array.from({ length: n }, (_, i) => i));
  };

  // Insertion Sort
  const insertionSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      setComparing([i]);
      await sleep(getDelay(speed));

      while (j >= 0 && arr[j] > key) {
        if (!sortingRef.current) return;

        setSwapping([j, j + 1]);
        await sleep(getDelay(speed));

        arr[j + 1] = arr[j];
        setArray([...arr]);
        j--;
      }

      arr[j + 1] = key;
      setArray([...arr]);
      setSwapping([]);
      setComparing([]);
    }
    setSorted(Array.from({ length: n }, (_, i) => i));
  };

  // Merge Sort
  const merge = async (arr, left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (!sortingRef.current) return;

      setComparing([left + i, mid + 1 + j]);
      await sleep(getDelay(speed));

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }

      setSwapping([k]);
      setArray([...arr]);
      await sleep(getDelay(speed));
      setSwapping([]);
      k++;
    }

    while (i < leftArr.length) {
      if (!sortingRef.current) return;
      arr[k] = leftArr[i];
      setArray([...arr]);
      await sleep(getDelay(speed));
      i++;
      k++;
    }

    while (j < rightArr.length) {
      if (!sortingRef.current) return;
      arr[k] = rightArr[j];
      setArray([...arr]);
      await sleep(getDelay(speed));
      j++;
      k++;
    }

    setComparing([]);
  };

  const mergeSortHelper = async (arr, left, right) => {
    if (left >= right || !sortingRef.current) return;

    const mid = Math.floor((left + right) / 2);
    await mergeSortHelper(arr, left, mid);
    await mergeSortHelper(arr, mid + 1, right);
    await merge(arr, left, mid, right);
  };

  const mergeSort = async () => {
    const arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
    if (sortingRef.current) {
      setSorted(Array.from({ length: arr.length }, (_, i) => i));
    }
  };

  // Quick Sort
  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (!sortingRef.current) return -1;

      setComparing([j, high]);
      await sleep(getDelay(speed));

      if (arr[j] < pivot) {
        i++;
        setSwapping([i, j]);
        await sleep(getDelay(speed));

        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        setSwapping([]);
      }
      setComparing([]);
    }

    setSwapping([i + 1, high]);
    await sleep(getDelay(speed));

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    setSwapping([]);

    return i + 1;
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high && sortingRef.current) {
      const pi = await partition(arr, low, high);
      if (pi === -1) return;

      setSorted((prev) => [...prev, pi]);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  const quickSort = async () => {
    const arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
    if (sortingRef.current) {
      setSorted(Array.from({ length: arr.length }, (_, i) => i));
    }
  };

  // Heap Sort
  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (!sortingRef.current) return;

    if (left < n) {
      setComparing([largest, left]);
      await sleep(getDelay(speed));
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      setComparing([largest, right]);
      await sleep(getDelay(speed));
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      setSwapping([i, largest]);
      await sleep(getDelay(speed));

      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      setSwapping([]);

      await heapify(arr, n, largest);
    }
    setComparing([]);
  };

  const heapSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      if (!sortingRef.current) return;
      await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      if (!sortingRef.current) return;

      setSwapping([0, i]);
      await sleep(getDelay(speed));

      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      setSwapping([]);

      setSorted((prev) => [...prev, i]);
      await heapify(arr, i, 0);
    }
    setSorted(Array.from({ length: n }, (_, i) => i));
  };

  // Start sorting
  const startSorting = async () => {
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    sortingRef.current = true;
    setIsSorting(true);
    setIsPlaying(true);

    switch (algorithm.name) {
      case "Bubble Sort":
        await bubbleSort();
        break;
      case "Selection Sort":
        await selectionSort();
        break;
      case "Insertion Sort":
        await insertionSort();
        break;
      case "Merge Sort":
        await mergeSort();
        break;
      case "Quick Sort":
        await quickSort();
        break;
      case "Heap Sort":
        await heapSort();
        break;
      default:
        break;
    }

    sortingRef.current = false;
    setIsSorting(false);
    setIsPlaying(false);
    setComparing([]);
    setSwapping([]);
  };

  // Stop sorting
  const stopSorting = () => {
    sortingRef.current = false;
    setIsSorting(false);
    setIsPlaying(false);
  };

  // Get bar color
  const getBarColor = (index) => {
    if (sorted.includes(index)) return "from-emerald-500 to-emerald-400";
    if (swapping.includes(index)) return "from-red-500 to-red-400";
    if (comparing.includes(index)) return "from-yellow-500 to-yellow-400";
    return "from-blue-500 to-purple-500";
  };

  // Reset when algorithm changes
  useEffect(() => {
    stopSorting();
    setSorted([]);
    setComparing([]);
    setSwapping([]);
  }, [algorithm]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={isPlaying ? stopSorting : startSorting}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                isPlaying
                  ? "bg-red-500/20 text-red-500 border border-red-500"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              }`}
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
              onClick={generateNewArray}
              disabled={isSorting}
              className={`flex items-center gap-2 px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white hover:bg-slate-700 transition-all ${
                isSorting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              New Array
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
              className="w-24 accent-blue-500"
            />
            <span className="text-sm text-white w-8">{speed}%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-t from-blue-500 to-purple-500"></div>
            <span className="text-xs text-slate-400">Unsorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-t from-yellow-500 to-yellow-400"></div>
            <span className="text-xs text-slate-400">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-t from-red-500 to-red-400"></div>
            <span className="text-xs text-slate-400">Swapping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-t from-emerald-500 to-emerald-400"></div>
            <span className="text-xs text-slate-400">Sorted</span>
          </div>
        </div>

        {/* Custom Array Input */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                value={customInput}
                onChange={(e) => {
                  setCustomInput(e.target.value);
                  setInputError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleCustomArray()}
                disabled={isSorting}
                placeholder="Enter values: 64, 34, 25, 12... (1-100)"
                className={`w-full bg-slate-800 border ${
                  inputError ? "border-red-500" : "border-slate-600"
                } rounded-xl py-2.5 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm ${
                  isSorting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </div>
            <button
              onClick={handleCustomArray}
              disabled={isSorting || !customInput.trim()}
              className={`flex items-center gap-2 px-4 py-2.5 bg-emerald-500/20 border border-emerald-500 text-emerald-500 rounded-xl font-medium hover:bg-emerald-500/30 transition-all ${
                isSorting || !customInput.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <Plus className="w-4 h-4" />
              Set Array
            </button>
          </div>
          {inputError && (
            <p className="mt-2 text-sm text-red-400">{inputError}</p>
          )}
          <p className="mt-2 text-xs text-slate-500">
            Enter numbers separated by commas or spaces (max 20 values, 1-100)
          </p>
        </div>
      </div>

      {/* Visualization Area */}
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

        {/* Bars */}
        <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
          <div className="flex items-end justify-center gap-1 sm:gap-2 h-64">
            {array.map((value, index) => (
              <div
                key={index}
                className={`flex-1 max-w-12 bg-gradient-to-t ${getBarColor(index)} rounded-t-md transition-all duration-150 relative group`}
                style={{ height: `${value}%` }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Array Values */}
        <div className="flex flex-wrap justify-center gap-2">
          {array.map((value, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white"
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
          {algorithm.name} is a comparison-based algorithm that works by
          repeatedly comparing and swapping elements. Click "Start" to see the
          algorithm in action with step-by-step animations.
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

export default SortingVisualizer;
