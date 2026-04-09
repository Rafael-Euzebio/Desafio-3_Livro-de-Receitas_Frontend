import z from "zod";

export const categoryItemSchema = z.object({
  strCategory: z.string(),
});

export const apiCategoriesResponseSchema = z.object({
  meals: z.array(categoryItemSchema),
});

export type ApiCategoriesResponse = z.infer<typeof apiCategoriesResponseSchema>;

export type CategoryItem = z.infer<typeof categoryItemSchema>;
export type CategoryList = CategoryItem[];
