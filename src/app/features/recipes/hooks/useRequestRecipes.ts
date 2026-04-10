import { useCallback, useEffect, useMemo, useState } from "react";


import { mapRecipeToCard } from "../mappers/recipe.maper";
import { recipesByNameMock } from "../../../mocks/recipes.mock";
import type { RecipeApiItem, RecipeCardItem, RecipesByNameResponse } from "../types/recipe.type";


interface UseRequestRecipesParams {
    search?: string;
    autoFetch?: boolean;
    currentRecepts?: RecipesByNameResponse;
}

interface UseRequestRecipesReturn {
    loadingRecipes: boolean;
    resultSetRecipesToCard: RecipeCardItem[];
    recipeSearchFiltered: RecipeCardItem[] | (() => RecipeCardItem[]);
    resultSetRecipes: RecipeApiItem[];
    errorRecipes: string | null;
    refetchRecipes: () => Promise<void>;
    isUsingMock: boolean;
}

export function useRequestRecipes({
    search = "",
    autoFetch = true,
    currentRecepts,
}: UseRequestRecipesParams = {}): UseRequestRecipesReturn {
    const [loadingRecipes, setLoadingRecipes] = useState(false);
    const [resultSetRecipesToCard, setResultSetRecipesToCard] = useState<RecipeCardItem[]>([]);
    const [resultSetRecipes, setResultSetRecipes] = useState<RecipeApiItem[]>([]);
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

            const responseJson = await response.json();
            const data: RecipesByNameResponse = responseJson;

            const mapped = (data.meals ?? []).map(mapRecipeToCard);

            setResultSetRecipesToCard(mapped);
            setResultSetRecipes(responseJson.meals);
        } catch (error) {
            console.warn("API falhou ao buscar receitas por nome, usando mock.");

            const mappedMock = (recipesByNameMock.meals ?? []).map(mapRecipeToCard);

            setResultSetRecipesToCard(mappedMock);
            setIsUsingMock(true);

            const message =
                error instanceof Error ? error.message : "Erro ao buscar receitas";

            setErrorRecipes(message);
        } finally {
            setLoadingRecipes(false);
        }
    }, []);

    function normalize(text: string) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }
    const recipeSearchFiltered = useMemo(() => {
        const recepts = currentRecepts?.meals && currentRecepts?.meals?.length > 0 ? currentRecepts.meals : resultSetRecipes;
        if (!search.trim()) {
            return [];
        }

        const normalizedSearch = normalize(search);
        const resultSet = recepts?.filter((recipe) =>
            normalize(recipe?.strMeal || '').includes(normalizedSearch)
        );

        return (resultSet ?? []).map(mapRecipeToCard);
    }, [search, currentRecepts, resultSetRecipes]);





    useEffect(() => {
        if (!autoFetch) return;
        fetchRecipes();
    }, [autoFetch, fetchRecipes]);

    return {
        loadingRecipes,
        resultSetRecipes,
        resultSetRecipesToCard,
        recipeSearchFiltered,
        errorRecipes,
        refetchRecipes: fetchRecipes,
        isUsingMock,
    };
}