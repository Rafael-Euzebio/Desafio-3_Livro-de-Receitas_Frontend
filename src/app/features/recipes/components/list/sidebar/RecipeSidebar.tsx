import { Button } from "../../../../../components/Header/ActionButton";
import type { Recipe } from "../../../types/recipe.type";



interface Props {
  recipe: Recipe | null;
  onClose: () => void;
}

export function RecipeSidebar({ recipe, onClose }: Props) {
  if (!recipe) return null;

  return (
    <aside className="fixed right-0 top-0 h-full w-[380px] bg-white shadow-lg border-l p-6 overflow-y-auto">
      
      <button
        onClick={onClose}
        className="mb-4 text-sm text-gray-500 hover:text-gray-800"
      >
        ← Voltar
      </button>

      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h2 className="mt-4 text-xl font-semibold">
        {recipe.name}
      </h2>

      <div className="flex gap-3 text-sm text-gray-500 mt-2">
        <span>⏱ {recipe.time} min</span>
        <span>📌 {recipe.difficulty}</span>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        {recipe.description}
      </p>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Ingredientes</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          {recipe.ingredients.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Modo de Preparo</h3>
        <ol className="text-sm text-gray-600 space-y-2">
          {recipe.instructions.map((step, i) => (
            <li key={i}>
              <span className="font-semibold mr-2">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <Button variant="outlined" color="success" onFunction={() => {}}>
        Ver Receita Completa
      </Button>
    </aside>
  );
}