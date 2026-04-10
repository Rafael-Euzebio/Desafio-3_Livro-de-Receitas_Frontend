import type { RecipesByCategoryResponse, RecipesByNameResponse } from "../features/recipes/types/recipe.type";

export const recipesByNameMock: RecipesByNameResponse = {
    meals: [
        {
            idMeal: "52772",
            strMeal: "Teriyaki Chicken Casserole",
            strMealThumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
            strCategory: "Chicken",
        },
        {
            idMeal: "52818",
            strMeal: "Chicken Fajita Mac and Cheese",
            strMealThumb: "https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg",
            strCategory: "Chicken",
        },
    ],
};

export const recipesByCategoryMock: RecipesByCategoryResponse = {
    meals: [
        {
            idMeal: "52795",
            strMeal: "Chicken Handi",
            strMealThumb: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
        },
        {
            idMeal: "52846",
            strMeal: "Chicken & mushroom Hotpot",
            strMealThumb: "https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg",
        },
    ],
};