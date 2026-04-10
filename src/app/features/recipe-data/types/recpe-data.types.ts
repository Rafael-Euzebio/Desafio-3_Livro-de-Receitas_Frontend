export interface RecipeDetailsApiItem {
    idMeal: string;
    strMeal: string;
    strMealAlternate: string | null;
    strCategory: string | null;
    strArea: string | null;
    strInstructions: string | null;
    strMealThumb: string | null;
    strTags: string | null;
    strYoutube: string | null;
    strSource: string | null;
    strImageSource: string | null;
    strCreativeCommonsConfirmed: string | null;
    dateModified: string | null;
    [key: string]: string | null;
}

export interface RecipeDetailsResponse {
    meals: RecipeDetailsApiItem[] | null;
}

export interface RecipeIngredientItem {
    ingredient: string;
    measure: string;
}

export interface RecipeDetailsViewModel {
    id: string;
    name: string;
    alternateName: string | null;
    category: string | null;
    area: string | null;
    instructions: string;
    instructionsSteps: string[];
    image: string;
    tags: string[];
    youtube: string | null;
    source: string | null;
    dateModified: string | null;
    ingredients: RecipeIngredientItem[];
}