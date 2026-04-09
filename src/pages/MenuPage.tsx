import { useState } from "react";
import { useSearchParams } from "react-router";

import { CategoriesFilter } from "@/components/CategoriesFilter";
import { MealsGrid } from "@/components/MealsGrid";
import { MenuSection } from "@/components/MenuSection";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");

  const handleSearch = () => {
    setSearchParams((prev) => {
      if (inputValue.trim() === "") prev.delete("q");
      else prev.set("q", inputValue);
      return prev;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <div className="mx-auto mt-10 flex w-full flex-col items-center">
        <CardHeader className="w-full flex-col items-center">
          <CardTitle className="mb-6 text-center text-2xl leading-normal font-semibold wrap-break-word text-slate-900">
            Categorias e pratos
          </CardTitle>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Input
              className="w-full rounded-lg border border-slate-200 px-4 py-6 text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-slate-400"
              placeholder="Buscar refeição (ex: Arrabiata)"
              type="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              onClick={handleSearch}
              className="rounded-lg bg-slate-900 px-6 py-6 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Buscar
            </Button>
          </div>
        </CardHeader>

        <CardContent className="mt-4 w-full">
          <MenuSection title="Categorias">
            <CategoriesFilter />
          </MenuSection>

          <MenuSection title="Pratos do Cardápio">
            <MealsGrid />
          </MenuSection>
        </CardContent>
      </div>
    </>
  );
};
