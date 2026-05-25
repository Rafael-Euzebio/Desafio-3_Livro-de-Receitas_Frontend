/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import CardMeal from "../../components/meal/cardmeal/CardMeal";
import { useState, useEffect } from "react";

import { ToastAlerta } from "../../utils/ToastAlerta";
import { SyncLoader } from "react-spinners";
import type { Meal } from "../../models/Meal";
import {
  filterByCategory,
  getCategoryList,
  searchMealByName,
} from "../../services/Service";

interface ListMealProps {
  category?: string;
  searchTerm?: string;
}

function ListMeal({
  category = "Beef",
  searchTerm: initialSearchTerm = "",
}: ListMealProps) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnectionError, setIsConnectionError] = useState<boolean>(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>(initialSearchTerm);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);

  // Função para tratar erros da API
  function handleApiError(error: any): string {
    const errorMessage = error?.message || error?.toString() || "";
    
    // Erros de conexão
    if (errorMessage.includes("conexão") || 
        errorMessage.includes("internet") ||
        errorMessage.includes("ECONNABORTED") ||
        errorMessage.includes("Network Error") ||
        errorMessage.includes("Tempo limite")) {
      setIsConnectionError(true);
      return "Erro de conexão. Verifique sua internet e tente novamente.";
    }
    
    // Erro 400 - Bad Request
    if (errorMessage.includes("400") || errorMessage.includes("Requisição inválida")) {
      setIsConnectionError(false);
      return "Busca inválida. Verifique o termo pesquisado.";
    }
    
    // Erro 404 - Não encontrado
    if (errorMessage.includes("404")) {
      setIsConnectionError(false);
      return "Recurso não encontrado. Tente outra busca.";
    }
    
    // Outros erros
    setIsConnectionError(false);
    return "Erro ao carregar os dados. Tente novamente mais tarde.";
  }

  // Buscar categorias usando getCategoryList
  async function fetchCategories() {
    try {
      setIsLoadingCategories(true);
      setError(null);
      setIsConnectionError(false);
      
      await getCategoryList((data: string[]) => {
        console.log("Categorias recebidas do service:", data);
        if (data && data.length > 0) {
          setCategories(data);
        } else {
          setCategories([]);
          setError("Nenhuma categoria encontrada");
        }
      });
    } catch (error: any) {
      console.error("Erro ao buscar categorias:", error);
      const userMessage = handleApiError(error);
      setError(userMessage);
      ToastAlerta(userMessage, "erro");
    } finally {
      setIsLoadingCategories(false);
    }
  }

  // Buscar receitas
  async function fetchMeals() {
    try {
      setIsLoading(true);
      setError(null);
      setIsConnectionError(false);

      if (searchTerm) {
        await searchMealByName(searchTerm, (data: Meal[]) => {
          if (data && data.length > 0) {
            setMeals(data);
          } else {
            setMeals([]);
            setError(`Nenhuma receita encontrada para "${searchTerm}"`);
          }
        });
      } else {
        await filterByCategory(selectedCategory, (data: any[]) => {
          if (data && data.length > 0) {
            setMeals(data);
          } else {
            setMeals([]);
            setError(
              `Nenhuma receita encontrada para a categoria ${selectedCategory}`
            );
          }
        });
      }
    } catch (error: any) {
      console.error("Erro ao buscar receitas:", error);
      const userMessage = handleApiError(error);
      setError(userMessage);
      ToastAlerta(userMessage, "erro");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [selectedCategory, searchTerm]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchTerm(searchInput.trim());
      setSelectedCategory("");
    } else if (searchInput === "") {
      clearSearch();
    }
  }

  function clearSearch() {
    setSearchInput("");
    setSearchTerm("");
    setSelectedCategory(category);
  }

  function clearSearchInput() {
    setSearchInput("");
  }

  function handleCategoryChange(newCategory: string) {
    setSelectedCategory(newCategory);
    setSearchTerm("");
    setSearchInput("");
    setShowFilters(false);
  }

  function handleReset() {
    setSelectedCategory(category);
    setSearchTerm("");
    setSearchInput("");
    setShowFilters(false);
  }

  function handleMealClick(meal: Meal) {
    navigate(`/meal/${meal.idMeal}`);
  }

  return (
    <div className="flex justify-center w-full my-4">
      <div className="container flex flex-col px-4">
        {/* BARRA DE PESQUISA */}
        <div className="mb-6">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar receitas..."
                className="w-full px-3 md:px-6 py-2 md:py-4 pl-8 md:pl-12 pr-16 md:pr-24 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm md:text-base"
              />
              <svg
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400"
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
              <div className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 flex gap-1 md:gap-2">
                {searchInput && (
                  <button
                    type="button"
                    onClick={clearSearchInput}
                    className="text-gray-400 hover:text-gray-600 p-1 md:p-2"
                  >
                    ✕
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-green-600 text-white px-3 md:px-6 py-1 md:py-2 rounded-full hover:bg-green-700 transition text-sm md:text-base"
                >
                  Buscar
                </button>
              </div>
            </div>
          </form>

          <div className="flex gap-1 md:gap-2 mt-3 flex-wrap">
            <span className="text-xs text-gray-500">Buscas rápidas:</span>
            {["Chicken", "Pasta", "Cake", "Soup", "Curry", "Rice"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setSearchInput(suggestion);
                    setSearchTerm(suggestion);
                    setSelectedCategory("");
                  }}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition"
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        </div>

        {/* Botão para mostrar/esconder filtros em mobile */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
        </div>

        {/* Filtros de Categorias */}
        <div className={`${showFilters ? "block" : "hidden"} md:block mb-6`}>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Categorias:
            </h3>

            {isLoadingCategories && (
              <div className="flex justify-center w-full my-4">
                <SyncLoader color="#16a34a" size={12} />
              </div>
            )}

            {!isLoadingCategories && categories.length === 0 && !error && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-700 text-sm">
                  Nenhuma categoria encontrada
                </p>
                <button
                  onClick={fetchCategories}
                  className="mt-2 text-sm text-green-600 hover:text-green-700 underline"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {!isLoadingCategories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      selectedCategory === cat && !searchTerm
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-green-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {(selectedCategory !== category || searchTerm) && (
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
            <div className="flex items-center gap-2 flex-wrap">
              <span>
                Resultados para: <strong>"{searchTerm}"</strong>
              </span>
              <button
                onClick={clearSearch}
                className="text-red-600 hover:text-red-700 text-xs"
              >
                [x] limpar
              </button>
            </div>
          ) : (
            <span>
              Categoria: <strong>{selectedCategory}</strong>
            </span>
          )}
          {!error && !isLoading && (
            <span className="ml-2">
              ({meals.length} receita{meals.length !== 1 ? "s" : ""} encontrada
              {meals.length !== 1 ? "s" : ""})
            </span>
          )}
        </div>

        {/* Lista de Receitas */}
        {isLoading && (
          <div className="flex justify-center w-full my-8">
            <SyncLoader color="#16a34a" size={20} />
          </div>
        )}

        {!isLoading && error && (
          <div className="text-center py-10">
            <div className={`rounded-lg p-6 max-w-md mx-auto ${
              isConnectionError 
                ? "bg-yellow-50 border border-yellow-200" 
                : "bg-red-50 border border-red-200"
            }`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {isConnectionError ? (
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`${isConnectionError ? 'text-yellow-700' : 'text-red-600'}`}>
                    {error}
                  </p>
                  <button
                    onClick={fetchMeals}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Tentar novamente
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !error && meals.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              {searchTerm
                ? `Nenhuma receita encontrada para "${searchTerm}"`
                : `Nenhuma receita encontrada na categoria ${selectedCategory}`}
            </p>
            <button
              onClick={handleReset}
              className="mt-4 text-green-600 hover:text-green-700 underline"
            >
              Ver todas as receitas
            </button>
          </div>
        )}

        {!isLoading && !error && meals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meals.map((meal) => (
              <CardMeal
                key={meal.idMeal}
                meal={meal}
                onClick={() => handleMealClick(meal)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListMeal;