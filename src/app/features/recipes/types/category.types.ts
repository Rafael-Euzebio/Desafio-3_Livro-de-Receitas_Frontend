export interface RecipeCategoryItem{
    idCategory:  string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface RecipeCategoriesResponse {
    categories: RecipeCategoryItem[];
}

export interface FilterOption {
    id: string;
    label: string;
    value: string;
}