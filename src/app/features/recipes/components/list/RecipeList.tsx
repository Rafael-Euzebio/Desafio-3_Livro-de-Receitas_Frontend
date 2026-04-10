import type { Recipe } from "../../types/recipe.type";
import { RecipeCard } from "./card/RecipeCard";

interface Props {
    recipes: Recipe[];
    onSelect: (recipe: Recipe) => void;
}

export function RecipesList({ recipes, onSelect }: Props) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onViewDetails={onSelect}
                />
            ))}
        </div>
    );
}