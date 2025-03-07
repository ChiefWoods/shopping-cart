import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useCart } from "@/hooks/useCart";
import { NavLink } from "react-router";

export default function Header() {
  const { items } = useCart();

  return (
    <header className="flex items-center justify-between bg-amber-300 p-6">
      <NavLink to="/">
        <h1 className="text-2xl font-semibold">Fake Store</h1>
      </NavLink>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} size={"icon"} className="cursor-pointer">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
          </SheetHeader>
          <ul className="flex h-full flex-col px-4">
            {!items.length && (
              <li className="flex flex-1 items-center justify-center">
                No items added
              </li>
            )}
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
                <p>
                  {item.quantity} x ${item.price}
                </p>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </header>
  );
}
