import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="relative flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
