import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "./providers/CartProvider";

export default function Layout() {
  return (
    <CartProvider>
      <Header />
      <main className="relative flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </CartProvider>
  );
}
