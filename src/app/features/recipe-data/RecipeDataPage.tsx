import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useRequestRecipeDetails } from "./hooks/useREquestrecipeDetails";
import { RecipeDetailPageContent } from "./components/RecipeDetailPageContent";
import { DontRequestRecept } from "./components/DontRequestRecept";


export function RecipeDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const {
        loadingRecipeDetails,
        recipeDetails,
        errorRecipeDetails,
        refetchRecipeDetails,
    } = useRequestRecipeDetails({ id });

    if (loadingRecipeDetails) {
        return (
            <section className="space-y-4">
                <div className="h-10 w-40 animate-pulse rounded-xl bg-gray-200" />
                <div className="h-[320px] animate-pulse rounded-3xl bg-gray-200" />
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="h-32 animate-pulse rounded-2xl bg-gray-200" />
                    <div className="h-32 animate-pulse rounded-2xl bg-gray-200" />
                    <div className="h-32 animate-pulse rounded-2xl bg-gray-200" />
                </div>
            </section>
        );
    }

    if (errorRecipeDetails || !recipeDetails) {
        return (
            <DontRequestRecept refetchRecipeDetails={refetchRecipeDetails} errorRecipeDetails={errorRecipeDetails} />
        );
    }

    return (
        <div className="space-y-6">
            <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
                <ArrowLeft className="h-4 w-4" />
                Voltar para receitas
            </Link>

            <RecipeDetailPageContent recipe={recipeDetails} />
        </div>
    );
}