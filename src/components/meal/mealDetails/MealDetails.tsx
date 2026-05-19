/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { get } from "../../../services/Service";
import type { Meal } from "../../../models/Meal";
import { getMealImage } from "../../../utils/imagesUtil";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* Hero Section com imagem principal */}
      <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
        <img
          src={getMealImage(meal.strMealThumb, 'large')}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = meal.strMealThumb;
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="container mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="mb-4 inline-flex items-center gap-2 text-white hover:text-green-200 transition"
            >
              ← Voltar
            </button>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              {meal.strMeal}
            </h1>
            <div className="flex flex-wrap gap-3">
              <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                🍽️ {meal.strCategory}
              </span>
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                🌍 {meal.strArea}
              </span>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-600 px-3 py-1 rounded-full text-sm"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna da Esquerda - Ingredientes e Imagem Preview */}
          <div className="lg:col-span-1">
            {/* Imagem Preview - TAMANHO PADRÃO FIXO */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="w-full h-64 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={getMealImage(meal.strMealThumb, 'medium')}
                  alt={meal.strMeal}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = meal.strMealThumb;
                  }}
                />
              </div>
            </div>

            {/* Lista de Ingredientes */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🛒 Ingredientes
              </h2>
              <div className="space-y-2">
                {ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 border-b border-gray-100"
                  >
                    <input
                      type="checkbox"
                      id={`ingredient-${index}`}
                      className="w-4 h-4 text-green-600"
                    />
                    <label
                      htmlFor={`ingredient-${index}`}
                      className="text-gray-700 cursor-pointer"
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
          <div className="lg:col-span-2 space-y-8">
            {/* Instruções */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                👨‍🍳 Modo de Preparo
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {meal.strInstructions}
                </p>
              </div>
            </div>

            {/* Vídeo do YouTube */}
            {youtubeId && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
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
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  📖 Fonte
                </h2>
                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 underline break-all"
                >
                  {meal.strSource}
                </a>
              </div>
            )}

            {/* Botões de Ação */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
              >
                🖨️ Imprimir Receita
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                🏠 Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealDetails;