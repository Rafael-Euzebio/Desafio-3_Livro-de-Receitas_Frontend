import type { Meal } from "./Meal";

export interface Area {
  strArea: string;
  strCountry: string;
  recipes?: Meal[]; // Array de receitas daquela região
  recipeCount: number; // Quantidade de receitas
}
