import type { RecipeApiItem } from "../../../types/recipe.type";

interface RecipeSidebarDescriptionProps {
  recipe: RecipeApiItem;
}

export function RecipeSidebarDescription({ recipe }: RecipeSidebarDescriptionProps) {

  return (
    <div className="w-full">

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h2 className="mt-4 text-xl font-semibold">
        {recipe.strMeal}
      </h2>

      <p className="mt-4 text-sm text-gray-600 line-clamp-6">
        {recipe.strInstructions}
      </p>


    </div>
  );
}