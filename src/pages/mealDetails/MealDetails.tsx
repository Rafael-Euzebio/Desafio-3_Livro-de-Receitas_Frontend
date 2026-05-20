/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { get } from "../../services/Service";
import type { Meal } from "../../models/Meal";
import { getMealImage } from "../../utils/imagesUtil";

function MealDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para extrair ingredientes e medidas
  const getIngredientsList = (meal: Meal) => {
    const ingredients: { ingredient: string; measure: string }[] = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal];
      const measure = meal[`strMeasure${i}` as keyof Meal];

      if (
        ingredient &&
        typeof ingredient === "string" &&
        ingredient.trim() !== ""
      ) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure:
            (measure && typeof measure === "string" ? measure.trim() : "") ||
            "",
        });
      }
    }

    return ingredients;
  };

  // Função para extrair tags
  const getTags = (meal: Meal) => {
    return meal.strTags ? meal.strTags.split(",") : [];
  };

  // Função para obter ID do YouTube
  const getYoutubeId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  async function fetchMealDetails() {
    try {
      setIsLoading(true);
      setError(null);
      await get(`/lookup.php?i=${id}`, (data: any) => {
        if (data.meals && data.meals.length > 0) {
          setMeal(data.meals[0]);
        } else {
          setError("Receita não encontrada");
        }
      });
    } catch (error: any) {
      console.error("Erro ao buscar receita:", error);
      setError("Erro ao carregar os detalhes da receita");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchMealDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando receita...</p>
        </div>
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">
            {error || "Receita não encontrada"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  const ingredients = getIngredientsList(meal);
  const tags = getTags(meal);
  const youtubeId = meal.strYoutube ? getYoutubeId(meal.strYoutube) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Altura responsiva gradual */}
      <div className="relative h-48 sm:h-60 md:h-80 lg:h-96 xl:h-[500px] overflow-hidden">
        <img
          src={getMealImage(meal.strMealThumb, "large")}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = meal.strMealThumb;
          }}
        />

        {/* Gradiente inferior */}
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-linear-to-t from-black/70 via-black/40 to-transparent"></div>

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
                Ingredientes
              </h2>
              <div className="space-y-2">
                {ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2 border-b border-gray-100 hover:bg-gray-50 rounded transition"
                  >
                    <input
                      type="checkbox"
                      id={`ingredient-${index}`}
                      className="w-4 h-4 text-green-600 rounded mt-0.5 shrink-0"
                    />
                    <label
                      htmlFor={`ingredient-${index}`}
                      className="text-gray-700 cursor-pointer text-sm sm:text-base"
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
                Modo de Preparo
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
                  Vídeo da Receita
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
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  Fonte
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
                Imprimir
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Início
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealDetails;
