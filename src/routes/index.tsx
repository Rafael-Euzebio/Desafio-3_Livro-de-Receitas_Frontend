import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../app/layouts/AppLayout";
import { RecipesPage } from "../app/features/recipes/RecipesPage";
import { RecipeDetailsPage } from "../app/features/recipe-data/RecipeDataPage";
import { NotFound } from "../app/components/notfound/NotFoundComponent";


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
        element: <RecipeDetailsPage />,
      },
      {
        path: "*",
        element: <NotFound  title="PAGINA NÃO ENCONTRADA" />,
      },
    ]
  },


])
