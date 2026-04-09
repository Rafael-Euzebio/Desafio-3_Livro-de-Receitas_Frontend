import type { FilterOption } from "../types/category.types";


const categoryLabelMap: Record<string, string> = {
    Beef: 'Carne',
    Chicken: 'Frango',
    Dessert: 'Sobremesas',
    Lamb: 'Cordeiro',
    Pasta: 'Massas',
    Pork: 'Porco',
    Seafood: 'Peixes e Frutos do Mar',
    Vegan: 'Vegano',
    Vegetarian: 'Vegetariano',
};

export function mapCategoryToOption(category: {
    idCategory: string;
    strCategory: string;
}): FilterOption {
    return {
        id: category.idCategory,
        value: category.strCategory,
        label:
            categoryLabelMap[category.strCategory] ||
            category.strCategory,
    };
}