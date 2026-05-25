/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ToastAlerta } from "../../utils/ToastAlerta";
import { SyncLoader } from "react-spinners";
import type { Meal } from "../../models/Meal";
import { getMealById } from "../../services/Service";

function MealDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnectionError, setIsConnectionError] = useState<boolean>(false);
  const [meal, setMeal] = useState<Meal | null>(null);

  // Função para verificar tipo de erro (melhorada)
  function handleApiError(error: any): string {
    const errorMessage = error?.message || error?.toString() || "";
    
    // Log detalhado do erro para debug
    console.error("Detalhes do erro:", {
      message: errorMessage,
      code: error?.code,
      status: error?.response?.status,
      response: error?.response?.data
    });

    // Erros de conexão
    if (
      errorMessage.includes("conexão") ||
      errorMessage.includes("internet") ||
      errorMessage.includes("ECONNABORTED") ||
      errorMessage.includes("Network Error") ||
      error?.code === "ERR_NETWORK" ||
      error?.code === "ECONNABORTED"
    ) {
      setIsConnectionError(true);
      return "Erro de conexão. Verifique sua internet e tente novamente.";
    }

    // Timeout específico
    if (
      errorMessage.includes("timeout") ||
      errorMessage.includes("Tempo limite")
    ) {
      setIsConnectionError(true);
      return "Tempo limite excedido. O servidor demorou muito para responder.";
    }

    // Erro 404
    if (error?.response?.status === 404 || errorMessage.includes("404")) {
      setIsConnectionError(false);
      return "Receita não encontrada. O ID pode ser inválido ou a receita foi removida.";
    }

    // Erro 400
    if (error?.response?.status === 400 || errorMessage.includes("400")) {
      setIsConnectionError(false);
      return "Requisição inválida. Tente novamente mais tarde.";
    }

    // Erro 500
    if (error?.response?.status === 500 || errorMessage.includes("500")) {
      setIsConnectionError(false);
      return "Erro no servidor. Tente novamente mais tarde.";
    }

    setIsConnectionError(false);
    return "Erro ao carregar detalhes da receita. Tente novamente mais tarde.";
  }

  // Buscar detalhes da receita
  async function fetchMealDetails() {
    if (!id) {
      setError("ID da receita não encontrado");
      ToastAlerta("ID da receita não encontrado", "erro");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setIsConnectionError(false);

      await getMealById(id, (data: Meal) => {
        if (data && data.idMeal) {
          setMeal(data);
        } else {
          setError("Receita não encontrada");
          ToastAlerta("Receita não encontrada", "info");
        }
      });
    } catch (error: any) {
      console.error("Erro ao buscar detalhes da receita:", error);
      const userMessage = handleApiError(error);
      setError(userMessage);
      ToastAlerta(userMessage, "erro");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMealDetails();
  }, [id]);

  // Função para extrair ingredientes e medidas
  function getIngredientsList(meal: Meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal];
      const measure = meal[`strMeasure${i}` as keyof Meal];
      if (ingredient && ingredient.trim() && ingredient !== "") {
        ingredients.push({
          ingredient: ingredient,
          measure: measure || "",
        });
      }
    }
    return ingredients;
  }

  // Extrair tags
  function getTags(meal: Meal): string[] {
    if (!meal.strTags) return [];
    return meal.strTags.split(",").map((tag) => tag.trim());
  }

  // Extrair ID do YouTube
  function getYoutubeId(url: string): string | null {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  }

  // Botão de tentar novamente
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SyncLoader color="#16a34a" size={20} />
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">
          <div
            className={`rounded-lg p-6 max-w-md mx-auto ${
              isConnectionError
                ? "bg-yellow-50 border border-yellow-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0">
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
                  {error || "Receita não encontrada"}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={fetchMealDetails}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Tentar novamente
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Voltar para o início
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Voltar para página anterior
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ingredients = getIngredientsList(meal);
  const tags = getTags(meal);
  const youtubeId = getYoutubeId(meal.strYoutube);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Altura responsiva gradual */}
      <div className="relative h-48 sm:h-60 md:h-80 lg:h-96 xl:h-[500px] overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/800x400?text=Imagem+não+disponível";
            ToastAlerta("Não foi possível carregar a imagem da receita", "aviso");
          }}
        />

        {/* Gradiente inferior */}
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

        {/* Conteúdo do Hero - Padding responsivo */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8 text-white">
          <div className="container mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="mb-2 sm:mb-3 md:mb-4 inline-flex items-center gap-1 sm:gap-2 text-white hover:text-green-200 transition text-sm sm:text-base"
            >
              ← Voltar
            </button>

            {/* Título - Escala gradual responsiva */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 leading-tight">
              {meal.strMeal}
            </h1>

            {/* Tags - Responsivas */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
              <span className="bg-green-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                🍽️ {meal.strCategory}
              </span>
              <span className="bg-blue-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                🌍 {meal.strArea}
              </span>
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal - Grid responsivo */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Coluna da Esquerda - Ingredientes */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 sticky top-16 md:top-20">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                📝 Ingredientes
              </h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2 border-b border-gray-100 hover:bg-gray-50 rounded transition"
                  >
                    <input
                      type="checkbox"
                      id={`ingredient-${index}`}
                      className="w-4 h-4 text-green-600 rounded mt-0.5 shrink-0 cursor-pointer"
                    />
                    <label
                      htmlFor={`ingredient-${index}`}
                      className="text-gray-700 cursor-pointer text-sm sm:text-base hover:text-gray-900 transition"
                    >
                      <span className="font-medium">{item.measure}</span>{" "}
                      {item.ingredient}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna da Direita - Instruções e Vídeo */}
          <div className="md:col-span-2 space-y-6 sm:space-y-8">
            {/* Instruções */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                👩‍🍳 Modo de Preparo
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                  {meal.strInstructions}
                </p>
              </div>
            </div>

            {/* Vídeo do YouTube */}
            {youtubeId && (
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  📺 Vídeo da Receita
                </h2>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={meal.strMeal}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Fonte */}
            {meal.strSource && (
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  🔗 Fonte
                </h2>
                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 underline break-all text-sm sm:text-base"
                >
                  {meal.strSource}
                </a>
              </div>
            )}

            {/* Botões de Ação - Responsivos */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                🖨️ Imprimir
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                🏠 Início
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealDetails;