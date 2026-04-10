import { ChefHat, Globe2, UtensilsCrossed } from "lucide-react";
import type { RecipeDetailsViewModel } from "../types/recpe-data.types";


interface RecipeDetailsProps {
    recipe: RecipeDetailsViewModel;
}

export function RecipeDetails({ recipe }: RecipeDetailsProps) {
    const items = [
        {
            icon: <UtensilsCrossed className="h-5 w-5 text-green-600" />,
            label: "Categoria",
            value: recipe.category || "Não informado",
        },
        {
            icon: <Globe2 className="h-5 w-5 text-orange-500" />,
            label: "Origem",
            value: recipe.area || "Não informado",
        },
        {
            icon: <ChefHat className="h-5 w-5 text-gray-700" />,
            label: "Ingredientes",
            value: `${recipe.ingredients.length} itens`,
        },
    ];

    return (
        <section className="grid gap-4 md:grid-cols-3">
            {items.map((item) => (
                <article
                    key={item.label}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                    <div className="mb-3">{item.icon}</div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{item.value}</p>
                </article>
            ))}
        </section>
    );
}