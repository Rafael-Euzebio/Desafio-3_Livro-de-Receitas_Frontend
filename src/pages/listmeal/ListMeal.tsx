/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import CardMeal from "../../components/meal/cardmeal/CardMeal";
import { useState, useEffect } from "react";
import { get } from "../../services/Service";
import type { Meal } from "../../models/Meal";
import type { Area } from "../../models/Area";

interface ListMealProps {
  category?: string;
  area?: string;
  searchTerm?: string;
}

interface Category {
  strCategory: string;
}

function ListMeal({
  category = "Beef",
  area,
  searchTerm: initialSearchTerm = "",
}: ListMealProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingAreas, setIsLoadingAreas] = useState<boolean>(true);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [selectedArea, setSelectedArea] = useState<string>(area || "");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>(initialSearchTerm);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [filterError, setFilterError] = useState<string | null>(null);

  // Buscar categorias da API
  const fetchCategories = async () => {
    try {
      await get("/list.php?c=list", (data: any) => {
        if (data.meals) {
          const categoryList = data.meals.map(
            (item: Category) => item.strCategory,
          );
          setCategories(categoryList);
        } else {
          setCategories([]);
        }
      });
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      setCategories([]);
    }
  };

  // Buscar receitas e extrair áreas únicas
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

          // Extrair áreas únicas das receitas carregadas
          if (!searchTerm && !selectedArea && data.meals.length > 0) {
            extractUniqueAreas(data.meals);
          }
        } else {
          setMeals([]);
          if (!searchTerm && !selectedArea) {
            setAreas([]);
            setIsLoadingAreas(false);
          }
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

  // Extrair áreas únicas das receitas
  const extractUniqueAreas = (mealsList: Meal[]) => {
    const areasMap = new Map<string, number>();

    mealsList.forEach((meal) => {
      if (meal.strArea) {
        const count = areasMap.get(meal.strArea) || 0;
        areasMap.set(meal.strArea, count + 1);
      }
    });

    const areasList: Area[] = Array.from(areasMap.entries()).map(
      ([areaName, count]) => ({
        strArea: areaName,
        strCountry: areaName,
        recipeCount: count,
        recipes: [],
      }),
    );

    // Ordenar por quantidade de receitas
    areasList.sort((a, b) => (b.recipeCount || 0) - (a.recipeCount || 0));

    setAreas(areasList);
    setIsLoadingAreas(false);
  };

  // Buscar todas as áreas disponíveis (primeira carga)
  const fetchAllAreas = async () => {
    try {
      setIsLoadingAreas(true);

      // Buscar uma categoria que geralmente tem muitas receitas para extrair áreas
      await get("/filter.php?c=Beef", (data: any) => {
        if (data.meals && data.meals.length > 0) {
          extractUniqueAreas(data.meals);
        } else {
          // Fallback: buscar receitas aleatórias
          get("/search.php?s=", (fallbackData: any) => {
            if (fallbackData.meals && fallbackData.meals.length > 0) {
              extractUniqueAreas(fallbackData.meals);
            } else {
              setIsLoadingAreas(false);
            }
          });
        }
      });
    } catch (error) {
      console.error("Erro ao buscar áreas:", error);
      setIsLoadingAreas(false);
    }
  };

  // Carregar categorias e áreas ao montar o componente
  useEffect(() => {
    fetchCategories();
    fetchAllAreas();
  }, []);

  // Buscar receitas quando os filtros mudarem
  useEffect(() => {
    getMeal();
  }, [selectedCategory, selectedArea, searchTerm]);

  // Função para lidar com a pesquisa
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
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
    setSearchTerm("");
    setSearchInput("");
    setShowFilters(false);
  };

  // Função para mudar de área
  const handleAreaChange = (newArea: string) => {
    setSelectedArea(newArea);
    setSelectedCategory("");
    setSearchTerm("");
    setSearchInput("");
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

  function handleMealClick(meal: Meal) {
    navigate(`/meal/${meal.idMeal}`);
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

            {/* Áreas - Extraídas diretamente das receitas */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Países/Regiões com receitas:
              </h3>

              {isLoadingAreas ? (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                    <span className="text-sm text-gray-600">
                      Carregando regiões disponíveis...
                    </span>
                  </div>
                </div>
              ) : areas.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Nenhuma região encontrada
                </p>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                  {areas.map((areaItem) => (
                    <button
                      key={areaItem.strArea}
                      onClick={() => handleAreaChange(areaItem.strArea)}
                      className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                        selectedArea === areaItem.strArea
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-green-100"
                      }`}
                    >
                      <span>{areaItem.strArea}</span>
                      <span
                        className={`text-xs ${
                          selectedArea === areaItem.strArea
                            ? "text-green-200"
                            : "text-gray-500"
                        }`}
                      >
                        ({areaItem.recipeCount})
                      </span>
                    </button>
                  ))}
                </div>
              )}
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
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Carregando receitas...</p>
              </div>
            </div>
          ) : meals.length === 0 ? (
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
