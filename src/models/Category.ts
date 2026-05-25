export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface CategoryResponse {
  categories: Category[] | null;
}

export interface CategorySummary {
  strCategory: string;
}

export interface CategorySummaryResponse {
  meals: CategorySummary[] | null;
}