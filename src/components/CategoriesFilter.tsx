import { useSearchParams } from "react-router";

import type { CategoryItem } from "@/constants/category";

import { useCategories } from "../hooks/useCategories";
import { CategoryButton } from "./CategoryButton";

export const CategoriesFilter = () => {
  const { data: categories, error, isPending } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get("category") || "All";

  const handleCategoryClick = (categoryName: string) => {
    setSearchParams((prev) => {
      if (categoryName === "All") {
        prev.delete("category");
      } else {
        prev.set("category", categoryName);
      }
      prev.delete("q");
      return prev;
    });
  };

  if (isPending)
    return (
      <div className="text-center text-slate-500">Carregando categorias...</div>
    );
  if (error)
    return <div className="text-red-500">Erro ao carregar categorias.</div>;

  return (
    <section className="flex flex-wrap gap-3">
      <CategoryButton
        label="All"
        isActive={currentCategory === "All"}
        onClick={() => handleCategoryClick("All")}
      />

      {categories?.map((category: CategoryItem) => (
        <CategoryButton
          key={category.strCategory}
          label={category.strCategory}
          isActive={currentCategory === category.strCategory}
          onClick={() => handleCategoryClick(category.strCategory)}
        />
      ))}
    </section>
  );
};
