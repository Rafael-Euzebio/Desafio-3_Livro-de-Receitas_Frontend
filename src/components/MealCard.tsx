import { Link } from "react-router-dom";
import type { Meal } from "../types/meal";

type MealCardProps = {
    meal: Meal;
};

export default function MealCard({ meal }: MealCardProps) {
    return (
        <Link
            to={`/meal/${meal.idMeal}`}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
            <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="h-56 w-full object-cover"
            />

            <div className="p-4">
                <h2 className="text-lg font-semibold text-slate-900">{meal.strMeal}</h2>
            </div>
        </Link>
    );
}