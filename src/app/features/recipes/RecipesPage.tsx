import { RecipeFilters } from "./components/filters/RecipeFilters";



export function RecipesPage() {

    function handleFiltersChange(filters: {
        search: string;
        selectedCategories: string[];
        selectedExtraFilters: string[];
    }) {
        console.log('filtros atualizados:', filters);
    }



    return (
        <div className="mih-h-screen bg-bakcground text-foreground">
            <RecipeFilters onFiltersChange={handleFiltersChange} />
        </div>
    )
}