import type { Meal } from "../../../models/Meal";
import { getMealImage } from "../../../utils/imagesUtil";

interface CardMealProps {
  meal: Meal;
  onClick?: (meal: Meal) => void;
  showCategory?: boolean;
  showArea?: boolean;
}

function CardMeal({
  meal,
  onClick,
  showCategory = true,
  showArea = true,
}: CardMealProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(meal);
    }
  };

  // Extrair as primeiras 3 tags (se existirem)
  const tags = meal.strTags ? meal.strTags.split(",").slice(0, 3) : [];

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Imagem da receita */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getMealImage(meal.strMealThumb, "medium")}
          alt={meal.strMeal}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Badge de tags (opcional) */}
        {tags.length > 0 && (
          <div className="absolute top-2 right-2 flex gap-1">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="p-4">
        {/* Título */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {meal.strMeal}
        </h3>

        {/* Informações adicionais */}
        <div className="space-y-1 text-sm text-gray-600">
          {showCategory && meal.strCategory && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">Categoria:</span>
              <span className="text-indigo-600">{meal.strCategory}</span>
            </div>
          )}

          {showArea && meal.strArea && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">Origem:</span>
              <span>{meal.strArea}</span>
            </div>
          )}

          {/* Indicador de ingredientes */}
          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6"
              />
            </svg>
            <span>Ver ingredientes</span>
          </div>
        </div>

        {/* Botão de ação */}
        <button
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
          onClick={handleClick}
        >
          Ver Receita
        </button>
      </div>
    </div>
  );
}

export default CardMeal;
