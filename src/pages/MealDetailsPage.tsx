import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import { useMealDetails } from "@/hooks/useMealDetails";

export const MealDetailsPage = () => {
  const { mealId } = useParams();
  const { data: meal, error, isPending } = useMealDetails(mealId!);

  if (isPending)
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="font-medium text-slate-500">Buscando prato...</p>
      </div>
    );

  if (error || !meal)
    return (
      <div className="flex h-40 flex-col items-center justify-center space-y-5 text-center">
        <p className="text-lg font-semibold text-slate-700">
          Prato não encontrado :(
        </p>
        <Button className="" variant={"default"}>
          <Link to="/">Voltar ao cardápio</Link>
        </Button>
      </div>
    );

  return (
    <>
      <div className="mt-10 flex w-full flex-col items-center p-3">
        <div className="relative flex w-full items-center">
          <div className="absolute left-0">
            <Button variant={"ghost"} asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span>Voltar</span>
              </Link>
            </Button>
          </div>
        </div>
        <section className="mt-9 flex flex-col items-center justify-center space-y-9">
          <h2 className="text-3xl font-semibold text-slate-900">
            {meal?.strMeal}
          </h2>
          <span>
            {meal?.strCategory} • {meal?.strArea}
          </span>

          <div>
            <img
              className="h-80 w-full rounded-xl object-contain"
              src={meal?.strMealThumb}
              alt=""
            />
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold text-slate-900">
              Instruções
            </h3>
            <summary className="list-none">{meal?.strInstructions}</summary>
          </div>
        </section>
      </div>
    </>
  );
};
