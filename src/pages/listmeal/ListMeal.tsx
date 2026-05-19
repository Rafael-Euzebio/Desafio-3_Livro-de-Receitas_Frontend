/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import CardMeal from "../../components/meal/cardmeal/CardMeal";
import { useState, useEffect } from "react";
import { get } from "../../services/Service";
import type { Meal } from "../../models/Meal";

interface ListMealProps {
  category?: string;
  area?: string;
  searchTerm?: string;
}

function ListMeal({
  category = "Beef",
  area,
  searchTerm: initialSearchTerm = "",
}: ListMealProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [selectedArea, setSelectedArea] = useState<string>(area || "");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>(initialSearchTerm);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);

  // Lista de categorias disponíveis
  const categories = [
    "Beef",
    "Chicken",
    "Dessert",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
    "Breakfast",
    "Goat",
  ];

  // Lista de áreas populares
  const areas = [
    "American",
    "British",
    "Canadian",
    "Chinese",
    "Croatian",
    "Dutch",
    "Egyptian",
    "French",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Kenyan",
    "Malaysian",
    "Mexican",
    "Moroccan",
    "Polish",
    "Portuguese",
    "Russian",
    "Spanish",
    "Thai",
    "Tunisian",
    "Turkish",
    "Vietnamese",
  ];

  async function getMeal() {
    try {
      setIsLoading(true);
      let url = "";

      if (searchTerm) {
        url = `/search.php?s=${searchTerm}`;
      } else if (selectedArea) {
        url = `/filter.php?a=${selectedArea}`;
      } else {
        url = `/filter.php?c=${selectedCategory}`;
      }

      await get(url, (data: any) => {
        if (data.meals) {
          setMeals(data.meals);
        } else {
          setMeals([]);
        }
      });
    } catch (error: any) {
      if (error.toString().includes("404")) {
        console.log("Página não encontrada");
        setMeals([]);
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Função para lidar com a pesquisa
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    // Limpa outros filtros quando pesquisa
    setSelectedCategory("");
    setSelectedArea("");
  };

  // Função para limpar a pesquisa
  const clearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
    setSelectedCategory(category);
    setSelectedArea("");
  };

  // Função para mudar de categoria
  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    setSelectedArea("");
    setSearchTerm(""); // Limpa pesquisa quando muda categoria
    setSearchInput(""); // Limpa input da pesquisa
    setShowFilters(false);
  };

  // Função para mudar de área
  const handleAreaChange = (newArea: string) => {
    setSelectedArea(newArea);
    setSelectedCategory("");
    setSearchTerm(""); // Limpa pesquisa quando muda área
    setSearchInput(""); // Limpa input da pesquisa
    setShowFilters(false);
  };

  // Função para resetar filtros
  const handleReset = () => {
    setSelectedCategory(category);
    setSelectedArea("");
    setSearchTerm("");
    setSearchInput("");
    setShowFilters(false);
  };

  useEffect(() => {
    getMeal();
  }, [selectedCategory, selectedArea, searchTerm]);

  function handleMealClick(meal: Meal) {
    navigate(`/meal/${meal.idMeal}`);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando receitas...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col px-4">
          {/* BARRA DE PESQUISA */}
          <div className="mb-6">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="🔍 Buscar receitas... (ex: Chicken, Pasta, Cake)"
                  className="w-full px-6 py-4 pl-12 pr-24 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => setSearchInput("")}
                      className="text-gray-400 hover:text-gray-600 p-2"
                    >
                      ✕
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </form>

            {/* Sugestões de busca rápida */}
            <div className="flex gap-2 mt-3 flex-wrap">
              <span className="text-xs text-gray-500">Buscas rápidas:</span>
              {["Chicken", "Pasta", "Cake", "Soup", "Curry", "Rice"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setSearchInput(suggestion);
                      setSearchTerm(suggestion);
                      setSelectedCategory("");
                      setSelectedArea("");
                    }}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition"
                  >
                    {suggestion}
                  </button>
                ),
              )}
            </div>
          </div>
          {/* Botão para mostrar/esconder filtros em mobile */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <span>📂</span>
              {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
            </button>
          </div>
          {/* Filtros de Categorias e Áreas */}
          <div className={`${showFilters ? "block" : "hidden"} md:block mb-6`}>
            {/* Categorias */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Categorias:
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      selectedCategory === cat && !selectedArea && !searchTerm
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-green-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Áreas */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Países/Regiões:
              </h3>
              <div className="flex flex-wrap gap-2">
                {areas.slice(0, 12).map((area) => (
                  <button
                    key={area}
                    onClick={() => handleAreaChange(area)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      selectedArea === area
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-green-100"
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Botão Reset */}
            {(selectedCategory !== category || selectedArea || searchTerm) && (
              <button
                onClick={handleReset}
                className="text-sm text-red-600 hover:text-red-700 underline"
              >
                Limpar todos os filtros
              </button>
            )}
          </div>
          {/* Indicador do filtro ativo */}
          <div className="mb-4 text-sm text-gray-600">
            {searchTerm ? (
              <div className="flex items-center gap-2">
                <span>
                  🔍 Resultados para: <strong>"{searchTerm}"</strong>
                </span>
                <button
                  onClick={clearSearch}
                  className="text-red-600 hover:text-red-700 text-xs"
                >
                  [x] limpar
                </button>
              </div>
            ) : selectedArea ? (
              <span>
                🌍 Receitas da região: <strong>{selectedArea}</strong>
              </span>
            ) : (
              <span>
                🍽️ Categoria: <strong>{selectedCategory}</strong>
              </span>
            )}
            <span className="ml-2">({meals.length} receitas encontradas)</span>
          </div>
          {/* Lista de Receitas */}
          {meals.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">
                {searchTerm
                  ? `Nenhuma receita encontrada para "${searchTerm}"`
                  : "Nenhuma receita encontrada nesta categoria"}
              </p>
              <button
                onClick={handleReset}
                className="mt-4 text-green-600 hover:text-green-700 underline"
              >
                Ver todas as receitas
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {meals.map((meal) => (
                <CardMeal
                  key={meal.idMeal}
                  meal={meal}
                  onClick={handleMealClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ListMeal;
