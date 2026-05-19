import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ListMeal from "./pages/listmeal/ListMeal";
import MealDetails from "./components/meal/mealDetails/MealDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<ListMeal />} />
              <Route path="/receitas" element={<ListMeal />} />
              <Route path="/meal/:id" element={<MealDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
