import { Link } from "react-router";

import { Card } from "@/components/ui/card";

interface MealCardProps {
  idMeal: string;
  mealThumb: string;
  strMeal: string;
}

export const MealCard = ({ idMeal, mealThumb, strMeal }: MealCardProps) => {
  return (
    <Link to={`/meal/${idMeal}`} className="block h-full">
      <Card className="flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-md">
        <div className="bg-muted h-48 w-full shrink-0">
          <img
            src={mealThumb}
            alt={strMeal}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="text-foreground flex flex-1 justify-between p-4">
          <span className="truncate font-medium">{strMeal}</span>
        </div>
      </Card>
    </Link>
  );
};
