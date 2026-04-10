import type { RecipeApiItem } from "../../../types/recipe.type";
import { extractIngredients } from "../../../utils";



interface RecipeSidebarIngredientsProps {
  recipe: RecipeApiItem | undefined;

}

export function RecipeSidebarIngredients({ recipe }: RecipeSidebarIngredientsProps) {

  const initialIngredients = extractIngredients(recipe);
  const ingredientsRest = extractIngredients(recipe, 11, 20);

  return (

    <div className="mt-6">
      <h3 className="font-semibold mb-2">Ingredientes</h3>
      <div className="flex justify-between">
        <ul className="text-sm text-gray-600 space-y-1">
          {initialIngredients.map((item, i) => (
            <li key={i}>
              • {item.name}{" "}
              <span className="text-gray-400">
                {item.measure && `- ${item.measure}`}
              </span>
            </li>
          ))}
        </ul>
        <ul className="text-sm text-gray-600 space-y-1">
          {ingredientsRest.map((item, i) => (
            <li key={i}>
              • {item.name}{" "}
              <span className="text-gray-400">
                {item.measure && `- ${item.measure}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
}