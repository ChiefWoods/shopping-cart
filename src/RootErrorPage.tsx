import Footer from "./components/Footer";
import ErrorText from "./components/ErrorText";
import ErrorBtn from "./components/ErrorBtn";
import Header from "./components/Header";

export default function RootErrorPage() {
  return (
    <>
      <Header reloadDocument={true} />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
        <ErrorText />
        <ErrorBtn />
      </main>
      <Footer />
    </>
  );
}
