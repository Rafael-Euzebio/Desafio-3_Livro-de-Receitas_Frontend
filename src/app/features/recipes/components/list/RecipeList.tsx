import type { RecipeCardItem } from "../../types/recipe.type";
import Logo from "../../../../../assets/images/logo-receitas.png"
import { RecipeCard } from "./card/RecipeCard";
import { EmptyState } from "../../../../components/empytState/EmpytState";

interface Props {
    recipes: RecipeCardItem[];
    onSelect: (recipeId: string) => void;
    aplicatedFilter: boolean
}

export function RecipesList({ recipes, onSelect, aplicatedFilter }: Props) {
    return (
        <div className="p-4  border border-gray-200 bg-white px-4 shadow-sm">
            <div className="flex items-center">
                <img
                    src={Logo}
                    alt="Logo"
                    className="h-16 w-16 object-contain"
                />

                <h2 className="font-semibold text-2xl">Receitas</h2>
            </div>

            {!recipes || recipes.length === 0 ? (
                <EmptyState />
            ) : (
                <div
                    style={{ maxHeight: '550px' }}
                    className="grid gap-4 overflow-y-auto max-w-full sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
                    {recipes.map((recipe) => (
                        <RecipeCard
                            aplicatedFilter={aplicatedFilter}
                            key={recipe.id}
                            recipe={recipe}
                            onViewDetails={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}