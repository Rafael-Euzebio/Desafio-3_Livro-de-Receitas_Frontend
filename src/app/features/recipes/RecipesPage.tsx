import { useState } from "react";
import { RecipeFilters } from "./components/filters/RecipeFilters";
import { RecipesList } from "./components/list/RecipeList";
import type { Recipe } from "./types/recipe.type";
import { RecipeSidebar } from "./components/list/sidebar/RecipeSidebar";
import { recipesByNameMock } from "../../mocks/recipes.mock";
import { useRequestRecipes } from "./hooks/useRequestRecipes";




export function RecipesPage() {
    const [selected, setSelected] = useState<Recipe | null>(null);
    const [searchValue, setSearchValue] = useState('')
    function handleFiltersChange(filters: {
        search: string;
        selectedCategories: string[];
        selectedExtraFilters: string[];
    }) {
        console.log('filtros atualizados:', filters);
    }
    const {
        loadingRecipes,
        resultSetRecipes,
        errorRecipes,
    } = useRequestRecipes({
        search: searchValue,
    });

    console.log({resultSetRecipes})

    return (
        <div className="mih-h-screen bg-bakcground text-foreground">
            <RecipeFilters onFiltersChange={handleFiltersChange} />
            <div className="flex-1">
                {/* <RecipesList
                    recipes={recipesByNameMock}
                    onSelect={setSelected}
                /> */}
            </div>
            <RecipeSidebar
                recipe={selected}
                onClose={() => setSelected(null)}
            />
        </div>
    )
}