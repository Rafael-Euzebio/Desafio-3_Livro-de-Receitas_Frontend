import { Refrigerator } from "lucide-react";
import type { RecipeIngredientItem } from "../types/recpe-data.types";


interface RecipeIngredientsProps {
    ingredients: RecipeIngredientItem[];
}

export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
                <Refrigerator className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Ingredientes</h2>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
                {ingredients.map((item) => (
                    <li
                        key={`${item.ingredient}-${item.measure}`}
                        className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700"
                    >
                        <span className="font-medium text-gray-900">{item.ingredient}</span>
                        {item.measure ? (
                            <span className="ml-2 text-gray-500">— {item.measure}</span>
                        ) : null}
                    </li>
                ))}
            </ul>
        </section>
    );
}