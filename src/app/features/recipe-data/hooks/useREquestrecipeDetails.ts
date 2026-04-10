import { useCallback, useEffect, useState } from "react";
import { mapRecipeDetailsToViewModel } from "../mappers/recipe-details.mapper";
import type { RecipeDetailsResponse, RecipeDetailsViewModel } from "../types/recpe-data.types";


interface UseRequestRecipeDetailsParams {
    id?: string;
}

interface UseRequestRecipeDetailsReturn {
    loadingRecipeDetails: boolean;
    recipeDetails: RecipeDetailsViewModel | null;
    errorRecipeDetails: string | null;
    refetchRecipeDetails: () => Promise<void>;
}

export function useRequestRecipeDetails({
    id,
}: UseRequestRecipeDetailsParams): UseRequestRecipeDetailsReturn {
    const [loadingRecipeDetails, setLoadingRecipeDetails] = useState(false);
    const [recipeDetails, setRecipeDetails] =
        useState<RecipeDetailsViewModel | null>(null);
    const [errorRecipeDetails, setErrorRecipeDetails] = useState<string | null>(
        null
    );

    const fetchRecipeDetails = useCallback(async () => {
        if (!id?.trim()) {
            setRecipeDetails(null);
            return;
        }

        try {
            setLoadingRecipeDetails(true);
            setErrorRecipeDetails(null);

            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
                    id
                )}`
            );

            if (!response.ok) {
                throw new Error("Erro ao buscar detalhes da receita.");
            }

            const data: RecipeDetailsResponse = await response.json();
            const recipe = data.meals?.[0];

            if (!recipe) {
                throw new Error("Receita não encontrada.");
            }

            setRecipeDetails(mapRecipeDetailsToViewModel(recipe));
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Erro ao buscar detalhes da receita.";

            setErrorRecipeDetails(message);
            setRecipeDetails(null);
        } finally {
            setLoadingRecipeDetails(false);
        }
    }, [id]);

    useEffect(() => {
        fetchRecipeDetails();
    }, [fetchRecipeDetails]);

    return {
        loadingRecipeDetails,
        recipeDetails,
        errorRecipeDetails,
        refetchRecipeDetails: fetchRecipeDetails,
    };
}