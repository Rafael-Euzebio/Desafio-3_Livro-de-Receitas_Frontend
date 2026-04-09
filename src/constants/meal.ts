import z from "zod";

export const MealItemSchema = z.object({
  strMeal: z.string(),
  strMealThumb: z.string(),
  idMeal: z.string(),
});

export type MealItem = z.infer<typeof MealItemSchema>;
