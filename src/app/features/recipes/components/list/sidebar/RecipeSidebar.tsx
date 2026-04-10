import { Link } from "react-router-dom";
import type { RecipeApiItem } from "../../../types/recipe.type";
import { RecipeSidebarDescription } from "./RecipeSidebarDescription";
import { RecipeSidebarHeader } from "./RecipeSidebarHeader";
import { RecipeSidebarIngredients } from "./RecipeSidebarIngredients";



interface Props {
  recipe: RecipeApiItem | undefined;
  onClose: () => void;
  open: boolean;
}

export function RecipeSidebar({ recipe, onClose, open }: Props) {
  if (!open) return null;
  return (
    <aside className="fixed right-0 top-0 h-full w-[380px] bg-white shadow-lg border-l p-6 overflow-y-auto space-y-4">

      <RecipeSidebarHeader onClose={onClose} />
      {!recipe ? (
        <span>NÃO CONSEGUIMOS EXIBIR OS DETALHES</span>
      ) : (
        <>
          <RecipeSidebarDescription recipe={recipe} />
          <RecipeSidebarIngredients recipe={recipe} />
          <div className="mt-8 w-full flex justify-end ">


            <Link
              to={`/receita/${recipe.idMeal}`}
              className="inline-flex w-full items-center justify-center rounded-xl border border-green-600 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50"
            >
              Passo a Passo
            </Link>
          </div>
        </>
      )}
    </aside>
  );
}