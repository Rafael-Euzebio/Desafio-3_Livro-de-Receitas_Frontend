
import { RecipeApresentation } from "./RecipeApresentation";
import { RecipeDetails } from "./RecipeDetails";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeInstructions } from "./RecipeInstructions";
import { RecipeMediaLinks } from "./RecipeMediaLinks";
import type { RecipeDetailsViewModel } from "../types/recpe-data.types";

interface RecipeDetailPageContentProps {
    recipe: RecipeDetailsViewModel;
}

export function RecipeDetailPageContent({
    recipe,
}: RecipeDetailPageContentProps) {
    return (
        <div className="space-y-6">
            <RecipeApresentation recipe={recipe} />
            <RecipeDetails recipe={recipe} />
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <RecipeIngredients ingredients={recipe.ingredients} />
                <RecipeInstructions instructions={recipe.instructionsSteps} />
            </div>

            <RecipeMediaLinks youtube={recipe.youtube} source={recipe.source} />
        </div>
    );
}