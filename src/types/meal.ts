export type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strArea?: string;
    strInstructions?: string;
    strYoutube?: string;
};

export type MealApiResponse = {
    meals: Meal[] | null;
};

export type Category = {
    strCategory: string;
};

export type CategoryApiResponse = {
    meals: Category[] | null;
};