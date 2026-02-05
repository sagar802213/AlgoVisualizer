import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, ArrowRight, RotateCcw, HelpCircle } from "lucide-react";
import { colorClasses } from "./config";
import { HowItWorksModal } from "../HowItWorksModal";
import { algorithmDetails } from "./algorithmDetails";

function StackQueueVisualizer({ algorithm, color }) {
  const [stack, setStack] = useState([40, 25, 60, 15]);
  const [queue, setQueue] = useState([40, 25, 60, 15]);
  const [inputValue, setInputValue] = useState("");
  const [lastAction, setLastAction] = useState("");
  const [poppedValue, setPoppedValue] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const colors = colorClasses[color];

  // Stack operations
  const pushStack = () => {
    if (!inputValue || animating) return;
    setAnimating(true);
    setLastAction(`Pushed ${inputValue}`);
    setPoppedValue(null);
    setStack((prev) => [...prev, parseInt(inputValue)]);
    setInputValue("");
    setTimeout(() => setAnimating(false), 300);
  };

  const popStack = () => {
    if (stack.length === 0 || animating) return;
    setAnimating(true);
    const popped = stack[stack.length - 1];
    setPoppedValue(popped);
    setLastAction(`Popped ${popped}`);
    setStack((prev) => prev.slice(0, -1));
    setTimeout(() => setAnimating(false), 300);
  };

  const peekStack = () => {
    if (stack.length === 0) return;
    const top = stack[stack.length - 1];
    setLastAction(`Peek: ${top} (top element)`);
    setPoppedValue(null);
  };

  // Queue operations
  const enqueue = () => {
    if (!inputValue || animating) return;
    setAnimating(true);
    setLastAction(`Enqueued ${inputValue}`);
    setPoppedValue(null);
    setQueue((prev) => [...prev, parseInt(inputValue)]);
    setInputValue("");
    setTimeout(() => setAnimating(false), 300);
  };

  const dequeue = () => {
    if (queue.length === 0 || animating) return;
    setAnimating(true);
    const dequeued = queue[0];
    setPoppedValue(dequeued);
    setLastAction(`Dequeued ${dequeued}`);
    setQueue((prev) => prev.slice(1));
    setTimeout(() => setAnimating(false), 300);
  };

  const peekQueue = () => {
    if (queue.length === 0) return;
    const front = queue[0];
    setLastAction(`Front: ${front}`);
    setPoppedValue(null);
  };

  const reset = () => {
    setStack([40, 25, 60, 15]);
    setQueue([40, 25, 60, 15]);
    setLastAction("");
    setPoppedValue(null);
    setInputValue("");
  };

  const isStack = algorithm.name === "Stack Operations";
  const isQueue = algorithm.name === "Queue Operations";
  const data = isStack ? stack : queue;

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
            className="w-32 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />

          {isStack && (
            <>
              <button
                onClick={pushStack}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-all"
              >
                <Plus className="w-4 h-4" />
                Push
              </button>
              <button
                onClick={popStack}
                disabled={stack.length === 0}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
                Pop
              </button>
              <button
                onClick={peekStack}
                disabled={stack.length === 0}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition-all disabled:opacity-50"
              >
                Peek
              </button>
            </>
          )}

          {isQueue && (
            <>
              <button
                onClick={enqueue}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-all"
              >
                <Plus className="w-4 h-4" />
                Enqueue
              </button>
              <button
                onClick={dequeue}
                disabled={queue.length === 0}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
                Dequeue
              </button>
              <button
                onClick={peekQueue}
                disabled={queue.length === 0}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition-all disabled:opacity-50"
              >
                Front
              </button>
            </>
          )}

          <button
            onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white hover:bg-slate-700 transition-all"
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

        {lastAction && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <span className="text-emerald-400">{lastAction}</span>
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
            {" • "}
            Size: <span className="text-emerald-400">{data.length}</span>
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-8 min-h-[300px]">
          {isStack && (
            <div className="flex flex-col items-center">
              {/* Stack visualization - vertical */}
              <div className="flex flex-col-reverse items-center gap-1 mb-4">
                {stack.map((item, index) => (
                  <div
                    key={index}
                    className={`w-24 h-12 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white font-bold transition-all duration-300 ${
                      index === stack.length - 1 ? "ring-2 ring-yellow-400" : ""
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              {stack.length === 0 && (
                <div className="text-slate-400 text-center py-8">
                  Stack is empty
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-slate-400 mt-4">
                <span>← Bottom</span>
                <div className="w-24 h-1 bg-slate-700 rounded"></div>
                <span>Top →</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                LIFO - Last In, First Out
              </p>
            </div>
          )}

          {isQueue && (
            <div className="flex flex-col items-center">
              {/* Queue visualization - horizontal */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-sm">Front →</span>
                {queue.map((item, index) => (
                  <div
                    key={index}
                    className={`w-14 h-14 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white font-bold transition-all duration-300 ${
                      index === 0 ? "ring-2 ring-yellow-400" : ""
                    } ${index === queue.length - 1 ? "ring-2 ring-blue-400" : ""}`}
                  >
                    {item}
                  </div>
                ))}
                <span className="text-blue-400 text-sm">← Rear</span>
              </div>
              {queue.length === 0 && (
                <div className="text-slate-400 text-center py-8">
                  Queue is empty
                </div>
              )}
              <p className="text-xs text-slate-500 mt-4">
                FIFO - First In, First Out
              </p>
            </div>
          )}

          {!isStack && !isQueue && (
            <div className="flex items-center justify-center h-full text-slate-400">
              {algorithm.name} visualization coming soon!
            </div>
          )}
        </div>

        {/* Popped Value Display */}
        {poppedValue !== null && (
          <div className="mt-4 text-center p-4 bg-red-500/10 border border-red-500 rounded-xl">
            <span className="text-red-400">
              Removed:{" "}
              <span className="font-bold text-white">{poppedValue}</span>
            </span>
          </div>
        )}
      </div>

      {/* Algorithm Info */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How it works</h3>
        <p className="text-slate-400 leading-relaxed mb-4">
          {isStack &&
            "A Stack follows LIFO (Last In, First Out) principle. The last element added is the first one to be removed. Push adds to the top, Pop removes from the top."}
          {isQueue &&
            "A Queue follows FIFO (First In, First Out) principle. The first element added is the first one to be removed. Enqueue adds to the rear, Dequeue removes from the front."}
          {!isStack &&
            !isQueue &&
            `${algorithm.name} is a data structure for organizing and accessing data efficiently.`}
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

export default StackQueueVisualizer;
