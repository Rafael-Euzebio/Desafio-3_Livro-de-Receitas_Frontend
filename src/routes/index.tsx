import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../app/layouts/AppLayout";
import { RecipesPage } from "../app/features/recipes/RecipesPage";
import { RecipeDataPage } from "../app/features/recipe-data/RecipeDataPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <RecipesPage />,
      },
      {
        path: "/receitas",
        element: <RecipesPage />,
      },
      {
        path: "/receita/:id",
        element: <RecipeDataPage />,
      },
      {
        path: "*",
        element: <>NOTFOUND PAGE</>,
      },
    ]
  },


])
