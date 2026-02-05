import { useState } from "react";
import { Settings2, X, Sun, Moon, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setLightTheme, setDarkTheme } = useTheme();

  return (
    <>
      {/* Floating Settings Button */}
      <div className="fixed top-20 left-3 z-50 group">
        <div className="relative">
          {/* Ping animations */}
          <div
            className="absolute inset-0 rounded-full bg-purple-400/30 animate-ping scale-110"
            style={{ animationDuration: "2s" }}
          />
          <div
            className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping scale-125"
            style={{ animationDuration: "3s" }}
          />

          <button
            onClick={() => setIsOpen(true)}
            className="relative h-16 w-16 rounded-full shadow-2xl transition-all duration-500 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 border-2 border-purple-300/60 hover:border-purple-200/80 overflow-hidden group-hover:scale-110 group-hover:rotate-3 active:scale-95 flex items-center justify-center"
            aria-label="Open Settings"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-300/40 via-transparent to-purple-300/30 animate-pulse" />

            {/* Sparkle effects */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div
                className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-purple-200 rounded-full animate-ping"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-white rounded-full animate-ping"
                style={{ animationDelay: "1.5s" }}
              />
            </div>

            <Settings2 className="h-8 w-8 relative z-10 text-slate-900 drop-shadow-lg transition-all duration-500" />
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 shadow-2xl shadow-emerald-500/10 rounded-2xl animate-in zoom-in-95 fade-in duration-300">
            {/* Close & Info buttons */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-slate-800 transition-colors border border-slate-600 hover:border-emerald-500/50"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-slate-400 hover:text-emerald-400 transition-colors" />
              </button>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-1.5 px-8 pt-8 text-center pr-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Settings2
                  className="h-7 w-7 text-emerald-400 animate-pulse"
                  style={{ animationDuration: "2.5s" }}
                />
                <h2 className="text-2xl font-bold font-mono text-white">
                  <span className="text-purple-400">Settings</span>
                </h2>
              </div>

              {/* Theme Section */}
              <div className="space-y-4 mb-8 px-4">
                <div className="flex items-center gap-2 text-sm font-mono text-purple-400 mb-1">
                  <span className="text-amber-400"></span>
                  <span>Theme</span>
                </div>
                <p className="text-xs font-mono text-slate-500 mb-2">
                  <span className="text-amber-400">//</span> Choose your
                  preferred color theme
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {/* Light Theme */}
                  <button
                    onClick={setLightTheme}
                    className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-md overflow-hidden bg-slate-800/70 ${
                      theme === "light"
                        ? "border-purple-400/60 shadow-purple-500/10"
                        : "border-slate-700 hover:border-purple-400/40"
                    }`}
                  >
                    <Sun
                      className="h-7 w-7 text-yellow-300"
                      style={{
                        transform:
                          theme === "light"
                            ? "scale(1.1) rotate(-20deg)"
                            : "none",
                      }}
                    />
                    <span
                      className={`text-base font-mono font-semibold ${theme === "light" ? "text-purple-400" : "text-white"}`}
                    >
                      Light Theme
                    </span>
                    {theme === "light" && (
                      <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-purple-400/20 flex items-center justify-center shadow-lg">
                        <Check className="h-4 w-4 text-purple-400" />
                      </div>
                    )}
                  </button>

                  {/* Dark Theme */}
                  <button
                    onClick={setDarkTheme}
                    className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-md overflow-hidden bg-slate-800/70 ${
                      theme === "dark"
                        ? "border-purple-400/60 shadow-purple-500/10"
                        : "border-slate-700 hover:border-purple-400/40"
                    }`}
                  >
                    <Moon
                      className="h-7 w-7 text-purple-400"
                      style={{
                        transform:
                          theme === "dark"
                            ? "scale(1.1) rotate(-20deg)"
                            : "none",
                      }}
                    />
                    <span
                      className={`text-base font-mono font-semibold ${theme === "dark" ? "text-purple-400" : "text-white"}`}
                    >
                      Dark Theme
                    </span>
                    {theme === "dark" && (
                      <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-purple-400/20 flex items-center justify-center shadow-lg">
                        <Check className="h-4 w-4 text-purple-400" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SettingsPanel;
