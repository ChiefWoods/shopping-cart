import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout.tsx";
import { SWRConfig } from "swr";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  </StrictMode>,
);
