import { Button } from "../../../../../components/Header/ActionButton";
import type { RecipeCardItem } from "../../../types/recipe.type";


interface Props {
    recipe: RecipeCardItem;
    aplicatedFilter: boolean;
    onViewDetails: (recipeId: string) => void;
}

export function RecipeCard({ recipe, onViewDetails, aplicatedFilter }: Props) {
    return (
        <div className="rounded-xl w-full  max-w-80 min-w-80  border bg-white shadow-sm overflow-hidden">

            <img
                src={recipe.image}
                alt={recipe.name}
                className="h-40 w-full object-cover"
            />

            <div className="p-4 flex flex-col  justify-around    gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 w-fit">
                    {recipe.category}
                </span>

                <h3 className="font-semibold text-gray-800">
                    {recipe.name}
                </h3>


                <Button
                    children={aplicatedFilter ?"Ver receita Completa" : "Ver Detalhes"}
                    onFunction={() => onViewDetails(recipe.id)}
                    variant="outlined"
                    color="success"
                />


            </div>
        </div>
    );
}