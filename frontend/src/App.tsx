import { Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/Landing/LandingPage";
import { Dashboard } from "@/pages/Dashboard";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/jobs" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
