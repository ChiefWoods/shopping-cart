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
import useSWR from "swr";
import { Skeleton } from "./ui/skeleton";

export default function Header() {
  const { items } = useCart();
  const {
    data: categories,
    isLoading,
    error,
  } = useSWR(
    `${import.meta.env.VITE_FAKE_STORE_API}/products/categories`,
    async (url) => {
      const res = await fetch(url);
      const categories: string[] = await res.json();

      return categories;
    },
  );

  if (error) {
    throw new Error("Failed to fetch categories");
  }

  return (
    <header className="flex items-center justify-between p-6">
      <NavLink to="/">
        <h1 className="text-2xl font-semibold">Fake Store</h1>
      </NavLink>
      {isLoading && <Skeleton className="h-8 w-[100px]" />}
      {!isLoading && categories && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink to="/categories">
                <NavigationMenuTrigger className="cursor-pointer font-semibold">
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
