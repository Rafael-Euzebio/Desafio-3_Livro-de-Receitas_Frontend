import { useNavigate } from "react-router-dom";
import type { Meal } from "../../../models/Meal";

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
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(meal);
    } else {
      navigate(`/meal/${meal.idMeal}`);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col h-full"
      onClick={handleClick}
    >
      {/* Imagem da receita */}
      <div className="relative h-40 md:h-48 overflow-hidden bg-gray-200">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Conteúdo do card */}
      <div className="flex-1 flex flex-col p-2 md:p-3 lg:p-4">
        {/* Título - Responsivo */}
        <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-800 mb-1 line-clamp-2 group-hover:text-green-600 transition-colors">
          {meal.strMeal}
        </h3>

        {/* Informações adicionais - Responsivo */}
        <div className="space-y-1 text-xs md:text-sm text-gray-600">
          {showCategory && meal.strCategory && (
            <div className="flex items-center gap-1">
              <span className="text-xs md:text-sm">🍽️</span>
              <span className="truncate">{meal.strCategory}</span>
            </div>
          )}

          {showArea && meal.strArea && (
            <div className="flex items-center gap-1">
              <span className="text-xs md:text-sm">🌍</span>
              <span className="truncate">{meal.strArea}</span>
            </div>
          )}
        </div>

        {/* Botão - Responsivo */}
        <button
          className="mt-3 md:mt-4 w-full bg-green-600 text-white py-1.5 md:py-2 px-3 md:px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-xs md:text-sm font-medium"
          onClick={handleClick}
        >
          Ver Receita →
        </button>
      </div>
    </div>
  );
}

export default CardMeal;
