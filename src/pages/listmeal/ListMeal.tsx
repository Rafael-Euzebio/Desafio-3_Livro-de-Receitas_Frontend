/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CardMeal from "../../components/meal/cardmeal/CardMeal";
import { SyncLoader } from "react-spinners";
import type { Meal } from "../../models/Meal";
import { useCategories } from "../../hooks/useCategories";
import { useMeals } from "../../hooks/useMeals";
import { useUI } from "../../hooks/useUI";

interface ListMealProps {
  category?: string;
  searchTerm?: string;
}

function ListMeal({
  category = "Beef",
  searchTerm: initialSearchTerm = "",
}: ListMealProps) {
  const navigate = useNavigate();

  // Estado local para busca
  const [searchInput, setSearchInput] = useState<string>(initialSearchTerm);
  const [activeSearchTerm, setActiveSearchTerm] =
    useState<string>(initialSearchTerm);

  // Hooks
  const { categories, isLoadingCategories, errorCategories, fetchCategories } =
    useCategories();
  const {
    meals,
    isLoading,
    error,
    isConnectionError,
    selectedCategory,
    fetchMeals,
    updateCategory,
    updateSearchTerm,
    resetFilters,
    clearError,
  } = useMeals({ defaultCategory: category });

  const { showFilters, toggleFilters, hideFilters } = useUI();

  // Funções de busca
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveSearchTerm(searchInput.trim());
      updateSearchTerm(searchInput.trim());
    } else if (searchInput === "") {
      clearSearch();
    }
  }

  function clearSearch() {
    setSearchInput("");
    setActiveSearchTerm("");
    updateSearchTerm("");
  }

  function clearSearchInput() {
    setSearchInput("");
  }

  function handleSuggestionClick(suggestion: string) {
    setSearchInput(suggestion);
    setActiveSearchTerm(suggestion);
    updateSearchTerm(suggestion);
  }

  // Carregar categorias
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Buscar receitas quando os filtros mudarem
  useEffect(() => {
    fetchMeals();
  }, [selectedCategory, activeSearchTerm, fetchMeals]);

  // Sincronizar searchTerm inicial
  useEffect(() => {
    if (initialSearchTerm) {
      setSearchInput(initialSearchTerm);
      setActiveSearchTerm(initialSearchTerm);
      updateSearchTerm(initialSearchTerm);
    }
  }, [initialSearchTerm, updateSearchTerm]);

  // Funções de manipulação
  function handleCategoryChange(newCategory: string) {
    clearSearch();
    updateCategory(newCategory);
    hideFilters();
  }

  function handleReset() {
    setSearchInput("");
    setActiveSearchTerm("");
    clearError();
    resetFilters(category);
    hideFilters();
  }

  function handleMealClick(meal: Meal) {
    navigate(`/meal/${meal.idMeal}`);
  }

  // Componente de erro
  const ErrorDisplay = ({
    message,
    isConnectionError,
  }: {
    message: string;
    isConnectionError: boolean;
  }) => (
    <div className="text-center py-10">
      <div
        className={`rounded-lg p-6 max-w-md mx-auto ${
          isConnectionError
            ? "bg-yellow-50 border border-yellow-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            {isConnectionError ? (
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <p
              className={`${isConnectionError ? "text-yellow-700" : "text-red-600"}`}
            >
              {message}
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
  );

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
                  onClick={() => handleSuggestionClick(suggestion)}
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
            onClick={toggleFilters}
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

            {!isLoadingCategories && errorCategories && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-700 text-sm">{errorCategories}</p>
                <button
                  onClick={fetchCategories}
                  className="mt-2 text-sm text-green-600 hover:text-green-700 underline"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {!isLoadingCategories &&
              !errorCategories &&
              categories.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-700 text-sm">
                    Nenhuma categoria encontrada
                  </p>
                </div>
              )}

            {!isLoadingCategories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      selectedCategory === cat && !activeSearchTerm
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

          {(selectedCategory !== category || activeSearchTerm) && (
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
          {activeSearchTerm ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span>
                Resultados para: <strong>"{activeSearchTerm}"</strong>
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
          <ErrorDisplay message={error} isConnectionError={isConnectionError} />
        )}

        {!isLoading && !error && meals.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              {activeSearchTerm
                ? `Nenhuma receita encontrada para "${activeSearchTerm}"`
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
