import { useState } from "react";
import {
  categories,
  colorClasses,
  SortingVisualizer,
  SearchingVisualizer,
  GraphVisualizer,
  StackQueueVisualizer,
} from "../components/visualizers";

function Visualize() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(
    categories[0].algorithms[0],
  );

  const colors = colorClasses[selectedCategory.color];

  // Render the appropriate visualizer based on category
  const renderVisualizer = () => {
    switch (selectedCategory.id) {
      case "sorting":
        return (
          <SortingVisualizer
            algorithm={selectedAlgorithm}
            color={selectedCategory.color}
          />
        );
      case "searching":
        return (
          <SearchingVisualizer
            algorithm={selectedAlgorithm}
            color={selectedCategory.color}
          />
        );
      case "graph":
        return (
          <GraphVisualizer
            algorithm={selectedAlgorithm}
            color={selectedCategory.color}
          />
        );
      case "stack-queue":
        return (
          <StackQueueVisualizer
            algorithm={selectedAlgorithm}
            color={selectedCategory.color}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-[70px] bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Algorithm Visualizer
          </h1>
          <p className="text-slate-400">
            Select an algorithm and watch it come to life with beautiful
            animations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const catColors = colorClasses[category.color];
                  const isSelected = selectedCategory.id === category.id;

                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category);
                        setSelectedAlgorithm(category.algorithms[0]);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isSelected
                          ? `${catColors.bg} ${catColors.text} border ${catColors.border}`
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{category.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Algorithms */}
            <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Algorithms
              </h3>
              <div className="space-y-2">
                {selectedCategory.algorithms.map((algo, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAlgorithm(algo)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                      selectedAlgorithm.name === algo.name
                        ? `${colors.bg} ${colors.text} border ${colors.border}`
                        : `text-slate-400 hover:text-white ${colors.hover}`
                    }`}
                  >
                    <span className="font-medium">{algo.name}</span>
                    <span className="text-xs opacity-70">
                      {algo.complexity}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Visualizer */}
          <div className="space-y-6">{renderVisualizer()}</div>
        </div>
      </div>
    </div>
  );
}

export default Visualize;
