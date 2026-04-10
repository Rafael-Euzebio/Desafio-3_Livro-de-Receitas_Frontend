import { useCallback, useEffect, useState } from "react";


import { mapRecipeToCard } from "../mappers/recipe.maper";
import { recipesByNameMock } from "../../../mocks/recipes.mock";
import type { RecipeCardItem, RecipesByNameResponse } from "../types/recipe.type";


interface UseRequestRecipesParams {
    search?: string;
    autoFetch?: boolean;
}

interface UseRequestRecipesReturn {
    loadingRecipes: boolean;
    resultSetRecipes: RecipeCardItem[];
    errorRecipes: string | null;
    refetchRecipes: () => Promise<void>;
    isUsingMock: boolean;
}

export function useRequestRecipes({
    search = "",
    autoFetch = true,
}: UseRequestRecipesParams = {}): UseRequestRecipesReturn {
    const [loadingRecipes, setLoadingRecipes] = useState(false);
    const [resultSetRecipes, setResultSetRecipes] = useState<RecipeCardItem[]>([]);
    const [errorRecipes, setErrorRecipes] = useState<string | null>(null);
    const [isUsingMock, setIsUsingMock] = useState(false);

    const fetchRecipes = useCallback(async () => {
        try {
            setLoadingRecipes(true);
            setErrorRecipes(null);
            setIsUsingMock(false);

            const normalizedSearch = search.trim();

            const url = normalizedSearch
                ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(normalizedSearch)}`
                : `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Erro ao buscar receitas");
            }

            const data: RecipesByNameResponse = await response.json();

            const mapped = (data.meals ?? []).map(mapRecipeToCard);

            setResultSetRecipes(mapped);
        } catch (error) {
            console.warn("API falhou ao buscar receitas por nome, usando mock.");

            const mappedMock = (recipesByNameMock.meals ?? []).map(mapRecipeToCard);

            setResultSetRecipes(mappedMock);
            setIsUsingMock(true);

            const message =
                error instanceof Error ? error.message : "Erro ao buscar receitas";

            setErrorRecipes(message);
        } finally {
            setLoadingRecipes(false);
        }
    }, [search]);

    useEffect(() => {
        if (!autoFetch) return;
        fetchRecipes();
    }, [autoFetch, fetchRecipes]);

    return {
        loadingRecipes,
        resultSetRecipes,
        errorRecipes,
        refetchRecipes: fetchRecipes,
        isUsingMock,
    };
}