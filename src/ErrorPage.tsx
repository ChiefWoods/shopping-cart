import ErrorText from "./components/ErrorText";
import ErrorBtn from "./components/ErrorBtn";

export default function ErrorPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <ErrorText />
      <ErrorBtn />
    </section>
  );
}
