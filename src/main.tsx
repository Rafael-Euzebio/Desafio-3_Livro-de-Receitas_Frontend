import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { MainLayout } from "./layouts/MainLayout.tsx";
import { MealDetailsPage } from "./pages/MealDetailsPage.tsx";
import { MenuPage } from "./pages/MenuPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <MenuPage />,
      },
      {
        path: "/meal/:mealId",
        element: <MealDetailsPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>,
);
