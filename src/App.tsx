import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MealDetail from "./pages/MealDetail";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meal/:mealId" element={<MealDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;