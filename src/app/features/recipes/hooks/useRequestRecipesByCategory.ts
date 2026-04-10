import { useCallback, useEffect, useState } from "react";
import { recipesByCategoryMock } from "../../../mocks/recipes.mock";
import type { RecipeCardItem, RecipesByCategoryResponse } from "../types/recipe.type";
import { mapRecipeToCard } from "../mappers/recipe.maper";

interface UseRequestRecipesByCategoryParams {
    category?: string[];
    autoFetch?: boolean;
}

interface UseRequestRecipesByCategoryReturn {
    loadingRecipesByCategory: boolean;
    resultSetRecipesByCategoryToCard: RecipeCardItem[];
    resultSetRecipesByCategory: RecipesByCategoryResponse | undefined;
    errorRecipesByCategory: string | null;
    refetchRecipesByCategory: () => Promise<void>;
    isUsingMock: boolean;
}

export function useRequestRecipesByCategory({
    category = [],
    autoFetch = true,
}: UseRequestRecipesByCategoryParams = {}): UseRequestRecipesByCategoryReturn {
    const [loadingRecipesByCategory, setLoadingRecipesByCategory] = useState(false);
    const [resultSetRecipesByCategory, setResultSetRecipesByCategory] = useState<RecipesByCategoryResponse>();
    const [resultSetRecipesByCategoryToCard, setResultSetRecipesByCategoryToCard] = useState<RecipeCardItem[]>([]);
    const [errorRecipesByCategory, setErrorRecipesByCategory] = useState<string | null>(null);
    const [isUsingMock, setIsUsingMock] = useState(false);

    const fetchRecipesByCategory = useCallback(async () => {        
        if (!category || category.length === 0) {
            setResultSetRecipesByCategory(undefined);
            setResultSetRecipesByCategoryToCard([]);
            return;
        }
        try {
            setLoadingRecipesByCategory(true);
            setErrorRecipesByCategory(null);
            setIsUsingMock(false);

            function concatWithUnderscore(arr: string[]): string {
                return arr.join("_");
            }
            const result = concatWithUnderscore(category);

            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(result)}`
            );

            if (!response.ok) {
                throw new Error("Erro ao buscar receitas por categoria");
            }

            const responseJson = await response.json();
            const data: RecipesByCategoryResponse = responseJson;

            const mapped = (data.meals ?? []).map(mapRecipeToCard);

            setResultSetRecipesByCategory(responseJson);
            setResultSetRecipesByCategoryToCard(mapped);
        } catch (error) {
            console.warn("API falhou ao buscar receitas por categoria, usando mock.");

            const mappedMock = (recipesByCategoryMock.meals ?? []).map(mapRecipeToCard);

            setResultSetRecipesByCategoryToCard(mappedMock);
            setIsUsingMock(true);

            const message =
                error instanceof Error
                    ? error.message
                    : "Erro ao buscar receitas por categoria";

            setErrorRecipesByCategory(message);
        } finally {
            setLoadingRecipesByCategory(false);
        }
    }, [category]);

    useEffect(() => {
        if (!autoFetch) return;
        fetchRecipesByCategory();
    }, [autoFetch, fetchRecipesByCategory]);

    return {
        loadingRecipesByCategory,
        resultSetRecipesByCategoryToCard,
        resultSetRecipesByCategory,
        errorRecipesByCategory,
        refetchRecipesByCategory: fetchRecipesByCategory,
        isUsingMock,
    };
}