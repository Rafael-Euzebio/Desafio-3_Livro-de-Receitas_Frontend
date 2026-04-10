import type { RecipeDetailsApiItem, RecipeDetailsViewModel, RecipeIngredientItem } from "../types/recpe-data.types";


function cleanValue(value: string | null | undefined): string {
    return (value ?? "").trim();
}

export function extractIngredients(
    recipe: RecipeDetailsApiItem
): RecipeIngredientItem[] {
    const items: RecipeIngredientItem[] = [];

    for (let index = 1; index <= 20; index += 1) {
        const ingredient = cleanValue(recipe[`strIngredient${index}`]);
        const measure = cleanValue(recipe[`strMeasure${index}`]);

        if (!ingredient) continue;

        items.push({
            ingredient,
            measure,
        });
    }

    return items;
}

export function extractInstructionSteps(instructions: string | null): string[] {
    const normalized = cleanValue(instructions);

    if (!normalized) return [];

    return normalized
        .split(/\r?\n+/)
        .map((step) => step.replace(/^\d+\s*/, "").trim())
        .filter(Boolean);
}

export function extractTags(tags: string | null): string[] {
    const normalized = cleanValue(tags);

    if (!normalized) return [];

    return normalized
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
}

export function mapRecipeDetailsToViewModel(
    recipe: RecipeDetailsApiItem
): RecipeDetailsViewModel {
    const instructions = cleanValue(recipe.strInstructions);

    return {
        id: recipe.idMeal,
        name: cleanValue(recipe.strMeal),
        alternateName: recipe.strMealAlternate,
        category: recipe.strCategory,
        area: recipe.strArea,
        instructions,
        instructionsSteps: extractInstructionSteps(recipe.strInstructions),
        image: cleanValue(recipe.strMealThumb),
        tags: extractTags(recipe.strTags),
        youtube: recipe.strYoutube,
        source: recipe.strSource,
        dateModified: recipe.dateModified,
        ingredients: extractIngredients(recipe),
    };
}