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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { capitalizeFirstLetter, convertCategoryToSlug } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import { useFakeStore } from "@/hooks/useFakeStore";

export default function Header() {
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { categories, isLoading, error } = useFakeStore();

  if (error) {
    throw new Error("Failed to fetch categories");
  }

  return (
    <header className="flex items-center justify-between p-6">
      <NavLink to="/">
        <h1 className="text-primary text-2xl font-semibold">Fake Store</h1>
      </NavLink>
      {isLoading && <Skeleton className="h-8 w-[100px]" />}
      {!isLoading && categories && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink to="/categories">
                <NavigationMenuTrigger className="text-primary hover:text-primary cursor-pointer font-semibold">
                  Categories
                </NavigationMenuTrigger>
              </NavLink>
              <NavigationMenuContent className="grid gap-3 p-4 md:w-[350px] md:grid-cols-2">
                {categories.map((category: string) => (
                  <NavigationMenuLink key={category} asChild>
                    <NavLink
                      to={`/categories/${convertCategoryToSlug(category)}`}
                    >
                      {capitalizeFirstLetter(category)}
                    </NavLink>
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant={"outline"} size={"icon"} className="cursor-pointer">
            <Menu className="text-primary" />
          </Button>
        </SheetTrigger>
        <SheetContent className="px-4 pb-4">
          <SheetHeader className="px-0">
            <SheetTitle className="text-primary text-xl">Cart</SheetTitle>
          </SheetHeader>
          <ul className="flex h-full flex-col">
            {!items.length && (
              <li className="text-primary flex flex-1 items-center justify-center">
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
          {Boolean(items.length) && (
            <NavLink to="/checkout">
              <Button
                className="w-full cursor-pointer font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Checkout
              </Button>
            </NavLink>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
}
