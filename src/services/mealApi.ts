import type {
    CategoryApiResponse,
    Meal,
    MealApiResponse,
} from "../types/meal";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function searchMealsByName(name: string): Promise<Meal[]> {
    const response = await fetch(
        `${BASE_URL}/search.php?s=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar receitas por nome.");
    }

    const data: MealApiResponse = await response.json();
    return data.meals || [];
}

export async function getMealById(mealId: string): Promise<Meal | null> {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${mealId}`);

    if (!response.ok) {
        throw new Error("Erro ao buscar detalhes da receita.");
    }

    const data: MealApiResponse = await response.json();
    return data.meals?.[0] || null;
}

export async function getCategories(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/list.php?c=list`);

    if (!response.ok) {
        throw new Error("Erro ao buscar categorias.");
    }

    const data: CategoryApiResponse = await response.json();
    return data.meals?.map((item) => item.strCategory) || [];
}

export async function filterMealsByCategory(category: string): Promise<Meal[]> {
    const response = await fetch(
        `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
    );

    if (!response.ok) {
        throw new Error("Erro ao filtrar receitas por categoria.");
    }

    const data: MealApiResponse = await response.json();
    return data.meals || [];
}