import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createHashRouter, RouterProvider } from "react-router";
import Layout from "./Layout.tsx";
import { SWRConfig } from "swr";
import Category from "./Category.tsx";
import Product from "./Product.tsx";
import Catalog from "./Catalog.tsx";
import Checkout from "./Checkout.tsx";
import ErrorPage from "./ErrorPage.tsx";
import RootErrorPage from "./RootErrorPage.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RootErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <App />,
          },
          {
            path: "categories",
            element: <Catalog />,
          },
          {
            path: "categories/:category",
            element: <Category />,
          },
          {
            path: "products/:id",
            element: <Product />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <RouterProvider router={router} />
    </SWRConfig>
  </StrictMode>,
);
