import { ReactNode } from "react";
import { Link } from "react-router";

export default function Header({
  reloadDocument = false,
  children,
}: {
  reloadDocument?: boolean;
  children?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-3 p-6">
      <Link to="/" reloadDocument={reloadDocument}>
        <h1 className="text-primary text-2xl font-semibold">Fake Store</h1>
      </Link>
      {children}
    </header>
  );
}
