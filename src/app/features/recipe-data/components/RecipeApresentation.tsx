import { Clock3, MapPin, Tag } from "lucide-react";
import type { RecipeDetailsViewModel } from "../types/recpe-data.types";


interface RecipeApresentationProps {
    recipe: RecipeDetailsViewModel;

}

export function RecipeApresentation({
    recipe,

}: RecipeApresentationProps) {
    return (
        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="p-6 md:p-8">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                        {recipe.category && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                {recipe.category}
                            </span>
                        )}

                        {recipe.area && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                <MapPin className="h-3.5 w-3.5" />
                                {recipe.area}
                            </span>
                        )}
                    </div>

                    <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-4xl">
                                {recipe.name}
                            </h1>

                            {recipe.alternateName && (
                                <p className="mt-2 text-sm text-gray-500">
                                    Também conhecida como: {recipe.alternateName}
                                </p>
                            )}
                        </div>
                    </div>

                    <p className="max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
                        {recipe.instructionsSteps[0] || recipe.instructions}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2 text-sm text-gray-700">
                            <Clock3 className="h-4 w-4 text-green-600" />
                            Receita detalhada
                        </div>

                        {recipe.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1 rounded-xl bg-gray-50 px-3 py-2 text-sm text-gray-700"
                            >
                                <Tag className="h-4 w-4 text-orange-500" />
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="relative max-h-[250px] bg-gray-100">
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}