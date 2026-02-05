import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  ArrowRight,
  Target,
  HelpCircle,
} from "lucide-react";
import { colorClasses, sleep, getDelay } from "./config";
import { HowItWorksModal } from "../HowItWorksModal";
import { algorithmDetails } from "./algorithmDetails";

function SearchingVisualizer({ algorithm, color }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [array, setArray] = useState([
    11, 22, 25, 33, 34, 45, 55, 64, 67, 78, 81, 90, 95, 99,
  ]);
  const [target, setTarget] = useState(55);
  const [current, setCurrent] = useState(-1);
  const [found, setFound] = useState(-1);
  const [searched, setSearched] = useState([]);
  const [low, setLow] = useState(-1);
  const [high, setHigh] = useState(-1);
  const searchingRef = useRef(false);

  const colors = colorClasses[color];

  const generateNewArray = () => {
    if (isSearching) return;
    const newArray = Array.from(
      { length: 14 },
      () => Math.floor(Math.random() * 90) + 10,
    ).sort((a, b) => a - b);
    setArray(newArray);
    setTarget(newArray[Math.floor(Math.random() * newArray.length)]);
    resetState();
  };

  const resetState = () => {
    setCurrent(-1);
    setFound(-1);
    setSearched([]);
    setLow(-1);
    setHigh(-1);
  };

  // Linear Search
  const linearSearch = async () => {
    for (let i = 0; i < array.length; i++) {
      if (!searchingRef.current) return;

      setCurrent(i);
      await sleep(getDelay(speed));

      if (array[i] === target) {
        setFound(i);
        return;
      }

      setSearched((prev) => [...prev, i]);
    }
    setFound(-2); // Not found
  };

  // Binary Search
  const binarySearch = async () => {
    let l = 0;
    let h = array.length - 1;

    while (l <= h) {
      if (!searchingRef.current) return;

      setLow(l);
      setHigh(h);
      const mid = Math.floor((l + h) / 2);
      setCurrent(mid);
      await sleep(getDelay(speed) * 2);

      if (array[mid] === target) {
        setFound(mid);
        return;
      }

      if (array[mid] < target) {
        for (let i = l; i <= mid; i++) {
          setSearched((prev) => [...prev, i]);
        }
        l = mid + 1;
      } else {
        for (let i = mid; i <= h; i++) {
          setSearched((prev) => [...prev, i]);
        }
        h = mid - 1;
      }
      await sleep(getDelay(speed));
    }
    setFound(-2);
  };

  // Jump Search
  const jumpSearch = async () => {
    const n = array.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;

    while (array[Math.min(step, n) - 1] < target) {
      if (!searchingRef.current) return;

      setCurrent(Math.min(step, n) - 1);
      await sleep(getDelay(speed));
      setSearched((prev) => [...prev, Math.min(step, n) - 1]);

      prev = step;
      if (prev >= n) {
        setFound(-2);
        return;
      }
    }

    while (array[prev] < target) {
      if (!searchingRef.current) return;

      setCurrent(prev);
      await sleep(getDelay(speed));
      setSearched((prev) => [...prev, prev]);

      prev++;
      if (prev === Math.min(step, n)) {
        setFound(-2);
        return;
      }
    }

    if (array[prev] === target) {
      setCurrent(prev);
      setFound(prev);
    } else {
      setFound(-2);
    }
  };

  // Interpolation Search
  const interpolationSearch = async () => {
    let l = 0;
    let h = array.length - 1;

    while (l <= h && target >= array[l] && target <= array[h]) {
      if (!searchingRef.current) return;

      setLow(l);
      setHigh(h);

      if (l === h) {
        if (array[l] === target) {
          setCurrent(l);
          setFound(l);
        } else {
          setFound(-2);
        }
        return;
      }

      const pos =
        l + Math.floor(((target - array[l]) * (h - l)) / (array[h] - array[l]));
      setCurrent(pos);
      await sleep(getDelay(speed) * 2);

      if (array[pos] === target) {
        setFound(pos);
        return;
      }

      if (array[pos] < target) {
        for (let i = l; i <= pos; i++) {
          setSearched((prev) => [...prev, i]);
        }
        l = pos + 1;
      } else {
        for (let i = pos; i <= h; i++) {
          setSearched((prev) => [...prev, i]);
        }
        h = pos - 1;
      }
      await sleep(getDelay(speed));
    }
    setFound(-2);
  };

  // Start searching
  const startSearching = async () => {
    resetState();
    searchingRef.current = true;
    setIsSearching(true);
    setIsPlaying(true);

    switch (algorithm.name) {
      case "Linear Search":
        await linearSearch();
        break;
      case "Binary Search":
        await binarySearch();
        break;
      case "Jump Search":
        await jumpSearch();
        break;
      case "Interpolation Search":
        await interpolationSearch();
        break;
      default:
        break;
    }

    searchingRef.current = false;
    setIsSearching(false);
    setIsPlaying(false);
  };

  // Stop searching
  const stopSearching = () => {
    searchingRef.current = false;
    setIsSearching(false);
    setIsPlaying(false);
  };

  // Get element color
  const getElementColor = (index) => {
    if (found === index) return "bg-emerald-500 border-emerald-400";
    if (current === index) return "bg-yellow-500 border-yellow-400";
    if (searched.includes(index))
      return "bg-slate-600 border-slate-500 opacity-50";
    if (low !== -1 && high !== -1 && index >= low && index <= high) {
      return "bg-purple-500/30 border-purple-500";
    }
    return "bg-slate-800 border-slate-700";
  };

  useEffect(() => {
    stopSearching();
    resetState();
  }, [algorithm]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={isPlaying ? stopSearching : startSearching}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                isPlaying
                  ? "bg-red-500/20 text-red-500 border border-red-500"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
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
                  Search
                </>
              )}
            </button>
            <button
              onClick={generateNewArray}
              disabled={isSearching}
              className={`flex items-center gap-2 px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white hover:bg-slate-700 transition-all ${
                isSearching ? "opacity-50 cursor-not-allowed" : ""
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

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-slate-400">Target:</span>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                disabled={isSearching}
                className="w-16 px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
              />
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
                className="w-24 accent-purple-500"
              />
              <span className="text-sm text-white w-8">{speed}%</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-800 border border-slate-700"></div>
            <span className="text-xs text-slate-400">Not Checked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500"></div>
            <span className="text-xs text-slate-400">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-600 opacity-50"></div>
            <span className="text-xs text-slate-400">Eliminated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-500"></div>
            <span className="text-xs text-slate-400">Found</span>
          </div>
        </div>
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
            {" • "}
            Searching for:{" "}
            <span className="text-purple-400 font-bold">{target}</span>
          </p>
        </div>

        {/* Array Elements */}
        <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
          <div className="flex flex-wrap justify-center gap-2">
            {array.map((value, index) => (
              <div
                key={index}
                className={`w-14 h-14 flex flex-col items-center justify-center ${getElementColor(index)} border rounded-xl transition-all duration-300`}
              >
                <span className="text-white font-bold">{value}</span>
                <span className="text-xs text-slate-400">[{index}]</span>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        {found !== -1 && (
          <div
            className={`text-center p-4 rounded-xl ${
              found === -2
                ? "bg-red-500/10 border border-red-500"
                : "bg-emerald-500/10 border border-emerald-500"
            }`}
          >
            <p className={found === -2 ? "text-red-400" : "text-emerald-400"}>
              {found === -2
                ? `${target} not found in the array`
                : `Found ${target} at index ${found}!`}
            </p>
          </div>
        )}
      </div>

      {/* Algorithm Info */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How it works</h3>
        <p className="text-slate-400 leading-relaxed mb-4">
          {algorithm.name === "Linear Search" &&
            "Linear Search sequentially checks each element until the target is found or the end is reached."}
          {algorithm.name === "Binary Search" &&
            "Binary Search repeatedly divides a sorted array in half, eliminating half of the remaining elements each step."}
          {algorithm.name === "Jump Search" &&
            "Jump Search jumps ahead by fixed steps and then performs a linear search in the smaller range."}
          {algorithm.name === "Interpolation Search" &&
            "Interpolation Search uses the value of the target to estimate its position, working best on uniformly distributed data."}
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

export default SearchingVisualizer;
