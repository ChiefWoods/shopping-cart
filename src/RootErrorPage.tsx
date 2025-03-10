import { Link } from "react-router";
import Footer from "./components/Footer";
import ErrorText from "./components/ErrorText";
import ErrorBtn from "./components/ErrorBtn";

export default function RootErrorPage() {
  return (
    <>
      <header className="grid grid-cols-3 p-6">
        <Link to="/" reloadDocument>
          <h1 className="text-primary text-2xl font-semibold">Fake Store</h1>
        </Link>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
        <ErrorText />
        <ErrorBtn />
      </main>
      <Footer />
    </>
  );
}
