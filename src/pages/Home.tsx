import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import MealCard from "../components/MealCard";
import SearchBar from "../components/SearchBar";
import StatusMessage from "../components/StatusMessage";
import {
  filterMealsByCategory,
  getCategories,
  searchMealsByName,
} from "../services/mealApi";
import type { Meal } from "../types/meal";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategoryFromUrl = searchParams.get("category") || "Beef";

  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState(initialCategoryFromUrl);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInitialData(initialCategoryFromUrl);
  }, []);

  async function loadInitialData(initialCategory: string) {
    try {
      setLoading(true);
      setError("");

      const categoryList = await getCategories();
      const initialMeals = await filterMealsByCategory(initialCategory);

      setCategories(categoryList);
      setMeals(initialMeals);
      setActiveCategory(initialCategory);
    } catch (error) {
      setError("Não foi possível carregar as receitas.");
      setMeals([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setActiveCategory("");
      setSearchParams({});

      const trimmedSearch = search.trim();
      const result = await searchMealsByName(trimmedSearch || "chicken");

      setMeals(result);
    } catch (error) {
      setError("Não foi possível realizar a busca.");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCategoryClick(category: string) {
    try {
      setLoading(true);
      setError("");
      setSearch("");
      setActiveCategory(category);
      setSearchParams({ category });

      const result = await filterMealsByCategory(category);
      setMeals(result);
    } catch (error) {
      setError("Não foi possível filtrar as receitas.");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }

  const sortedMeals = useMemo(() => {
    return [...meals].sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  }, [meals]);

  return (
    <section className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-md md:p-8">
        <h1 className="mb-3 text-center text-3xl font-bold text-slate-900 md:text-4xl">
          Categorias e pratos
        </h1>

        <p className="mb-8 text-center text-sm text-slate-600 md:text-base">
          Explore receitas, filtre por categoria e veja os detalhes completos de cada prato.
        </p>

        <SearchBar
          value={search}
          onChange={setSearch}
          onSubmit={handleSearch}
        />

        <div className="mb-8">
          <h2 className="mb-4 text-center text-2xl font-semibold text-slate-900">
            Categorias
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`rounded-xl border px-4 py-2 font-medium transition ${isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-gray-300 bg-white text-slate-900 hover:bg-gray-100"
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {loading && <StatusMessage message="Carregando receitas..." />}

        {!loading && error && (
          <StatusMessage message={error} type="error" />
        )}

        {!loading && !error && sortedMeals.length === 0 && (
          <StatusMessage message="Nenhuma receita encontrada." />
        )}

        {!loading && !error && sortedMeals.length > 0 && (
          <>
            <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900">
              {activeCategory
                ? `Pratos da categoria ${activeCategory}`
                : "Receitas encontradas"}
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedMeals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}