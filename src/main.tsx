import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout.tsx";
import { SWRConfig } from "swr";
import Category from "./Category.tsx";
import Product from "./Product.tsx";
import Catalog from "./Catalog.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="categories" element={<Catalog />} />
            <Route path="categories/:category" element={<Category />} />
            <Route path="categories/:category/:id" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  </StrictMode>,
);
