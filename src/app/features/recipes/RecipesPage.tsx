import { useState } from "react";
import { RecipeFilters } from "./components/filters/RecipeFilters";
import { RecipesList } from "./components/list/RecipeList";
import { RecipeSidebar } from "./components/list/sidebar/RecipeSidebar";
import { useRequestRecipes } from "./hooks/useRequestRecipes";
import LoaderComponent from "../../components/loader/LoaderComponent";
import { useRequestRecipesByCategory } from "./hooks/useRequestRecipesByCategory";




export function RecipesPage() {
    const [selected, setSelected] = useState<string | null>(null);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [categoryFilter, setCategoryFilter] = useState([''])


    function handleFiltersChange(filters: {
        search: string;
        selectedCategories: string[];
    }, isCategory: boolean) {
        if (isCategory) {
            setOpenSidebar(false)
            setCategoryFilter(filters.selectedCategories);
        }
    }
    const {
        loadingRecipesByCategory,
        resultSetRecipesByCategory,
        resultSetRecipesByCategoryToCard,
        // errorRecipesByCategory,
    } = useRequestRecipesByCategory({
        category: categoryFilter,
    });
    const {
        loadingRecipes,
        resultSetRecipes,
        resultSetRecipesToCard,
        // errorRecipes,
        recipeSearchFiltered,
    } = useRequestRecipes({
        search: searchValue,
        currentRecepts: resultSetRecipesByCategory
    });

    const resultByCategoryIsExist = resultSetRecipesByCategory && resultSetRecipesByCategory?.meals?.length > 0
    const resultSelected = resultSetRecipesByCategoryToCard.length > 0 ? resultSetRecipesByCategoryToCard : resultSetRecipesToCard
    const resultBaseToDetails = resultByCategoryIsExist ? resultSetRecipesByCategory?.meals : resultSetRecipes

    const handleControlSidebar = (recipeId: string | null) => {
        setSelected(recipeId)
        setOpenSidebar(!!recipeId);
    }


    return (
        <div className="mih-h-screen bg-bakcground text-foreground space-y-6">
            <RecipeFilters setSearchValue={setSearchValue} onFiltersChange={handleFiltersChange} />
            <div className="flex-1">
                {loadingRecipes || loadingRecipesByCategory ? (
                    <LoaderComponent messageLoading={` ${loadingRecipesByCategory ? 'filtrando receitas...' : 'buscando principais receitas...'} `} title="Carregando Receitas" />
                ) : (
                    <RecipesList
                        aplicatedFilter={!!resultByCategoryIsExist}
                        recipes={Array.isArray(recipeSearchFiltered) && searchValue != '' ? recipeSearchFiltered : resultSelected}
                        onSelect={handleControlSidebar}
                    />
                )}
            </div>

            <RecipeSidebar
                open={openSidebar}
                recipe={resultBaseToDetails?.find((result) => result.idMeal === selected)}
                onClose={() => handleControlSidebar(null)}
            />
        </div>
    )
}