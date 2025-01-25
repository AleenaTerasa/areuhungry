import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import RealTimeFeed from "@/pages/RealTimeFeed";
import ClaimMeal from "@/pages/ClaimMeal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/find-meal" element={<RealTimeFeed />} />
      <Route path="/claim-meal" element={<ClaimMeal />} />
    </Routes>
  );
}

export default App;