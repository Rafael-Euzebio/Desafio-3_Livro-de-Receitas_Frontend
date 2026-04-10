import type { Recipe } from "../../../types/recipe.type";


interface Props {
    recipe: Recipe;
    onViewDetails: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, onViewDetails }: Props) {
    return (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">

            <img
                src={recipe.image}
                alt={recipe.name}
                className="h-40 w-full object-cover"
            />

            <div className="p-4 flex flex-col gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 w-fit">
                    {recipe.category}
                </span>

                <h3 className="font-semibold text-gray-800">
                    {recipe.name}
                </h3>

                <div className="text-sm text-gray-500 flex gap-3">
                    <span>⏱ {recipe.time} min</span>
                    <span>📌 {recipe.difficulty}</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                    {recipe.description}
                </p>

                <button
                    onClick={() => onViewDetails(recipe)}
                    className="mt-2 border border-green-600 text-green-600 rounded-lg py-2 text-sm hover:bg-green-50 transition"
                >
                    Ver Detalhes
                </button>
            </div>
        </div>
    );
}