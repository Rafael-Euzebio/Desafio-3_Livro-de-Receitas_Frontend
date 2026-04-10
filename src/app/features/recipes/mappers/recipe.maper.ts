import type { RecipeApiItem, RecipeCardItem } from "../types/recipe.type";


export function mapRecipeToCard(recipe: RecipeApiItem): RecipeCardItem {
    return {
        id: recipe.idMeal,
        name: recipe.strMeal,
        image: recipe.strMealThumb,
        category: recipe.strCategory,
    };
}