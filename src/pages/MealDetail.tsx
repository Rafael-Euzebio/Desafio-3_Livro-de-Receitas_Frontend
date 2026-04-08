import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StatusMessage from "../components/StatusMessage";
import { getMealById } from "../services/mealApi";
import type { Meal } from "../types/meal";

type IngredientItem = {
  ingredient: string;
  measure: string;
};

export default function MealDetail() {
  const { mealId } = useParams();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!mealId) {
      setError("Receita não encontrada.");
      setLoading(false);
      return;
    }

    loadMealDetail(mealId);
  }, [mealId]);

  async function loadMealDetail(id: string) {
    try {
      setLoading(true);
      setError("");

      const data = await getMealById(id);

      if (!data) {
        setError("Receita não encontrada.");
        setMeal(null);
        return;
      }

      setMeal(data);
    } catch (error) {
      setError("Não foi possível carregar os detalhes da receita.");
      setMeal(null);
    } finally {
      setLoading(false);
    }
  }

  const ingredients = useMemo<IngredientItem[]>(() => {
    if (!meal) return [];

    const mealData = meal as Meal & Record<string, string | undefined>;
    const items: IngredientItem[] = [];

    for (let index = 1; index <= 20; index++) {
      const ingredient = mealData[`strIngredient${index}`]?.trim();
      const measure = mealData[`strMeasure${index}`]?.trim();

      if (ingredient) {
        items.push({
          ingredient,
          measure: measure || "",
        });
      }
    }

    return items;
  }, [meal]);

  return (
    <section className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-md md:p-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-gray-100 hover:text-slate-900"
        >
          ← Voltar
        </Link>

        {loading && (
          <StatusMessage message="Carregando detalhes da receita..." />
        )}

        {!loading && error && (
          <StatusMessage message={error} type="error" />
        )}

        {!loading && !error && meal && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full rounded-3xl object-cover shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-5xl">
                {meal.strMeal}
              </h1>

              <div className="mb-6 flex flex-wrap gap-3">
                {meal.strCategory && (
                  <Link
                    to={`/?category=${encodeURIComponent(meal.strCategory)}`}
                    className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    {meal.strCategory}
                  </Link>
                )}

                {meal.strArea && (
                  <span className="inline-flex rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                    {meal.strArea}
                  </span>
                )}
              </div>

              {ingredients.length > 0 && (
                <div className="mb-8 rounded-2xl bg-gray-50 p-5">
                  <h2 className="mb-4 text-xl font-semibold text-slate-900">
                    Ingredientes
                  </h2>

                  <ul className="grid gap-3 sm:grid-cols-2">
                    {ingredients.map((item) => (
                      <li
                        key={`${item.ingredient}-${item.measure}`}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-700"
                      >
                        <span className="font-semibold text-slate-900">
                          {item.measure ? `${item.measure} ` : ""}
                        </span>
                        {item.ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl bg-white">
                <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                  Instruções
                </h2>

                <p className="whitespace-pre-line text-base leading-8 text-slate-700">
                  {meal.strInstructions}
                </p>

                {meal.strYoutube && (
                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-block rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:opacity-90"
                  >
                    Assistir vídeo da receita
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}