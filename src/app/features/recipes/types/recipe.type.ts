export interface Recipe {
  id: string;
  name: string;
  image: string;
  category: string;
  time: number;
  difficulty: "Fácil" | "Média" | "Difícil";
  description: string;
  ingredients: string[];
  instructions: string[];
}

export interface RecipeApiItem {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strInstructions?: string;
  strArea?: string;
  strYoutube?: string;
  [key: string]: string | undefined;
}

export interface RecipesByNameResponse {
  meals: RecipeApiItem[] | null;
}

export interface RecipesByCategoryResponse {
  meals: Array<Pick<RecipeApiItem, "idMeal" | "strMeal" | "strMealThumb">> | null;
}

export interface RecipeCardItem {
  id: string;
  name: string;
  image: string;
  category?: string;
}