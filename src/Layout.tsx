import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "./providers/CartProvider";
import { SheetProvider } from "./providers/SheetProvider";

export default function Layout() {
  return (
    <SheetProvider>
      <CartProvider>
        <Header />
        <main className="relative flex flex-1 flex-col">
          <Outlet />
        </main>
        <Footer />
      </CartProvider>
    </SheetProvider>
  );
}
