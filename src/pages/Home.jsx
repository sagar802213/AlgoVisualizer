import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Menu,
  X,
  Github,
  Twitter,
  Linkedin,
  Play,
  BookOpen,
  BarChart3,
  Search,
  Share2,
  Layers,
  Zap,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Feature card data
const features = [
  {
    icon: BarChart3,
    title: "Sorting Algorithms",
    description:
      "Visualize Bubble Sort, Quick Sort, Merge Sort, and more with step-by-step animations.",
    color: "blue",
    path: "/visualize/sorting",
  },
  {
    icon: Search,
    title: "Searching Algorithms",
    description:
      "Explore Linear Search, Binary Search, and understand time complexities visually.",
    color: "purple",
    path: "/visualize/searching",
  },
  {
    icon: Share2,
    title: "Graph Algorithms",
    description:
      "Learn BFS, DFS, Dijkstra, and other graph traversal algorithms interactively.",
    color: "cyan",
    path: "/visualize/graph",
  },
  {
    icon: Layers,
    title: "Stack & Queue",
    description:
      "Understand LIFO and FIFO operations with real-time push/pop visualizations.",
    color: "emerald",
    path: "/visualize/stack-queue",
  },
];

// Stats data
const stats = [
  { value: "25+", label: "Algorithms Covered" },
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "Visualizations" },
];

// Color mapping for feature cards
const colorClasses = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "hover:border-blue-500",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    border: "hover:border-purple-500",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-500",
    border: "hover:border-cyan-500",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "hover:border-emerald-500",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    border: "hover:border-amber-500",
  },
};

// Navigation Component
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-[70px] bg-slate-950/90 backdrop-blur-xl border-b border-slate-700 z-40">
      <div className="max-w-6xl h-full mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-2xl font-bold text-white"
        >
          <Zap className="w-7 h-7 text-blue-500" />
          AlgoViz
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/"
            className="px-4 py-2.5 text-sm font-medium text-blue-500 bg-blue-500/10 rounded-lg"
          >
            Home
          </Link>
          <Link
            to="/visualize"
            className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            Visualize
          </Link>
          <Link
            to="/learn"
            className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            Learn
          </Link>
          <Link
            to="/about"
            className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            About
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-lg">
                {user.initial}
              </div>
              <button
                onClick={handleLogout}
                className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-11 h-11 flex items-center justify-center text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-[70px] left-0 right-0 bg-slate-950 border-b border-slate-700 p-5 flex flex-col gap-2 transition-all duration-300 ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          <Link
            to="/"
            className="w-full text-center py-3.5 text-sm font-medium text-blue-500 bg-blue-500/10 rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/visualize"
            className="w-full text-center py-3.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            onClick={() => setIsMenuOpen(false)}
          >
            Visualize
          </Link>
          <Link
            to="/learn"
            className="w-full text-center py-3.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            onClick={() => setIsMenuOpen(false)}
          >
            Learn
          </Link>
          <Link
            to="/about"
            className="w-full text-center py-3.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>

          {user ? (
            <div className="flex items-center justify-center gap-3 py-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-lg">
                {user.initial}
              </div>
              <span className="text-white text-sm">{user.email}</span>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="w-full text-center py-3.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-[110px] pb-16 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        {/* Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-4xl text-center z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
          Visualize <span className="gradient-text">Data Structures</span>
          <br />& <span className="gradient-text">Algorithms</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Learn DSA interactively with beautiful animations and step-by-step
          explanations. Master complex concepts through visual learning.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/visualize"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 transition-all"
          >
            <Play className="w-5 h-5" />
            Start Visualizing
          </Link>
          <Link
            to="/learn"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 text-base font-semibold text-white bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 hover:border-blue-500 transition-all"
          >
            <BookOpen className="w-5 h-5" />
            Learn More
          </Link>
        </div>

        {/* Visualizer Demo */}
        <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-5 max-w-md mx-auto">
          <div className="flex items-end justify-center gap-2 h-36">
            {[64, 34, 25, 12, 22, 11, 90, 45].map((height, index) => (
              <div
                key={index}
                className="w-7 sm:w-8 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-md animate-bar-pulse"
                style={{
                  height: `${height}%`,
                  animationDelay: `${index * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, color, path }) {
  const colors = colorClasses[color];

  return (
    <div
      className={`bg-slate-900/80 border border-slate-700 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${colors.border}`}
    >
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-xl mb-5 ${colors.bg}`}
      >
        <Icon className={`w-7 h-7 ${colors.text}`} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed mb-5">{description}</p>
      <Link
        to={path}
        className={`flex items-center gap-2 text-sm font-semibold ${colors.text} group`}
      >
        Explore
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

// Features Section Component
function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 text-sm font-semibold text-blue-500 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Explore Algorithms Visually
          </h2>
          <p className="text-lg text-slate-400 max-w-lg mx-auto">
            Choose from a wide range of data structures and algorithms to
            visualize and learn
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Stats Section Component
function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-2">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold gradient-text">
                {stat.value}
              </span>
              <span className="text-base text-slate-400 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer Component
export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-700 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-12 mb-10">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-xl font-bold text-white mb-4"
            >
              <Zap className="w-6 h-6 text-blue-500" />
              AlgoViz
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Making Data Structures & Algorithms easy to understand through
              visualization.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-5">
                Quick Links
              </h4>
              <div className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="text-slate-400 hover:text-blue-500 transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/visualize"
                  className="text-slate-400 hover:text-blue-500 transition-colors"
                >
                  Visualize
                </Link>
                <Link
                  to="/learn"
                  className="text-slate-400 hover:text-blue-500 transition-colors"
                >
                  Learn
                </Link>
                <Link
                  to="/about"
                  className="text-slate-400 hover:text-blue-500 transition-colors"
                >
                  About
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-5">
                Algorithms
              </h4>
              <div className="flex flex-col gap-3">
                <Link
                  to="/visualize/sorting"
                  className="text-slate-400 hover:text-blue-500 transition-colors"
                >
                  Sorting
                </Link>
                <Link
                  to="/visualize/searching"
                  className="text-slate-400 hover:text-blue-500 transition-colors"
                >
                  Searching
                </Link>
                <Link
                  to="/visualize/graph"
                  className="text-slate-400 hover:text-blue-500 transition-colors"
                >
                  Graph
                </Link>
                <Link
                  to="/visualize/tree-heap"
                  className="text-slate-400 hover:text-blue-500 transition-colors"
                >
                  Trees
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-5">
                Resources
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href="#"
                  className="text-slate-400 hover:text-blue-500 transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-blue-500 transition-colors"
                >
                  Tutorials
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-blue-500 transition-colors"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-blue-500 transition-colors"
                >
                  FAQ
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-700 gap-5">
          <p className="text-sm text-slate-500">
            © 2026 AlgoViz. All rights reserved.
          </p>
          <div className="flex gap-3">
            <Link
              to="https://github.com/sagar802213"
              className="w-10 h-10 flex items-center justify-center bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:bg-blue-500 hover:border-blue-500 hover:text-white hover:-translate-y-0.5 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            {/* <Link
              to="#"
              className="w-10 h-10 flex items-center justify-center bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:bg-blue-500 hover:border-blue-500 hover:text-white hover:-translate-y-0.5 transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </Link> */}
            <Link
              to="https://www.linkedin.com/in/sagar-gupta-3406a9252/"
              className="w-10 h-10 flex items-center justify-center bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:bg-blue-500 hover:border-blue-500 hover:text-white hover:-translate-y-0.5 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Home Page Component
function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
    </>
  );
}

export default Home;
