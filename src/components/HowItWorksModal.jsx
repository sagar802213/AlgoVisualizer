import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

export function HowItWorksModal({
  isOpen,
  onClose,
  algorithm,
  algorithmDetails,
}) {
  const [copiedLang, setCopiedLang] = useState(null);

  if (!isOpen || !algorithmDetails) return null;

  const handleCopy = (text, lang) => {
    navigator.clipboard.writeText(text);
    setCopiedLang(lang);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{algorithm.name}</h2>
            <p className="text-slate-400 text-sm mt-1">
              Algorithm Details & Implementation
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-all"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Introduction */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-3">
              Introduction
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {algorithmDetails.introduction}
            </p>
          </section>

          {/* Java Code */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">
                Java Implementation
              </h3>
              <button
                onClick={() => handleCopy(algorithmDetails.javaCode, "java")}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all"
              >
                {copiedLang === "java" ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-400">Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-slate-300 overflow-x-auto">
              <code>{algorithmDetails.javaCode}</code>
            </pre>
          </section>

          {/* C++ Code */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">
                C++ Implementation
              </h3>
              <button
                onClick={() => handleCopy(algorithmDetails.cppCode, "cpp")}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all"
              >
                {copiedLang === "cpp" ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-400">Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-slate-300 overflow-x-auto">
              <code>{algorithmDetails.cppCode}</code>
            </pre>
          </section>

          {/* Complexity Analysis */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time Complexity */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">
                Time Complexity
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-slate-400 text-sm">Average Case:</span>
                  <p className="text-white font-mono text-lg">
                    {algorithmDetails.timeComplexity}
                  </p>
                </div>
                <div className="border-t border-slate-700 pt-3">
                  <span className="text-slate-400 text-sm">Worst Case:</span>
                  <p className="text-red-400 font-mono text-sm mt-1">
                    {algorithmDetails.timeComplexityWorst}
                  </p>
                </div>
                <div className="border-t border-slate-700 pt-3">
                  <span className="text-slate-400 text-sm">Best Case:</span>
                  <p className="text-green-400 font-mono text-sm mt-1">
                    {algorithmDetails.timeComplexityBest}
                  </p>
                </div>
              </div>
            </div>

            {/* Space Complexity */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">
                Space Complexity
              </h3>
              <div>
                <span className="text-slate-400 text-sm">Auxiliary Space:</span>
                <p className="text-white font-mono text-lg mt-2">
                  {algorithmDetails.spaceComplexity}
                </p>
              </div>
              <div className="mt-6 p-4 bg-slate-900 border border-slate-600 rounded-lg">
                <p className="text-slate-400 text-sm">
                  This represents the extra space needed beyond the input size.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
