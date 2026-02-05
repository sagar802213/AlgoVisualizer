import { Routes, Route } from "react-router-dom";
import Home, { Navbar, Footer } from "./pages/Home";
import Login from "./pages/Login";
import Visualize from "./pages/Visualize";
import SettingsPanel from "./components/SettingsPanel";
import FeedbackPanel from "./components/FeedbackPanel";
import { useTheme } from "./context/ThemeContext";

// Layout component with Navbar and Footer
function Layout({ children, showNav = true, showFooter = true }) {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col bg-slate-950 text-white ${theme === "light" ? "light-theme" : ""}`}
    >
      <SettingsPanel />
      <FeedbackPanel />
      {showNav && <Navbar />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

// Main App Component with Routes
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout showNav={false} showFooter={false}>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/visualize"
        element={
          <Layout showFooter={false}>
            <Visualize />
          </Layout>
        }
      />
      <Route
        path="/visualize/:category"
        element={
          <Layout showFooter={false}>
            <Visualize />
          </Layout>
        }
      />
      <Route
        path="/learn"
        element={
          <Layout>
            <div className="min-h-screen pt-[70px] flex items-center justify-center">
              <h1 className="text-3xl font-bold text-white">
                Learn Page - Coming Soon
              </h1>
            </div>
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <div className="min-h-screen pt-[70px] flex items-center justify-center">
              <h1 className="text-3xl font-bold text-white">
                About Page - Coming Soon
              </h1>
            </div>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
