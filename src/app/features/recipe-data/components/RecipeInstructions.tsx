import { ListOrdered } from "lucide-react";

interface RecipeInstructionsProps {
  instructions: string[];
}

export function RecipeInstructions({
  instructions,
}: RecipeInstructionsProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <ListOrdered className="h-5 w-5 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">Modo de preparo</h2>
      </div>

      <ol className="space-y-4">
        {instructions.map((step, index) => (
          <li key={`${index}-${step.slice(0, 20)}`} className="flex gap-4">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white">
              {index + 1}
            </div>

            <p className="text-sm leading-7 text-gray-700">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}