import { Menu, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { NavLink, useLocation } from "react-router";
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
import { useFakeStore } from "@/hooks/useFakeStore";
import { useCart } from "@/providers/CartProvider";
import { useSheet } from "@/providers/SheetProvider";
import { Separator } from "./ui/separator";

export default function Header() {
  const { pathname } = useLocation();
  const { items, setItems, total } = useCart();
  const { isOpen, setIsOpen } = useSheet();
  const { categories, isLoading, error } = useFakeStore();

  const routesToDisableSheet = ["checkout"];

  function updateAmount(id: number, amount: number) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            amount,
            total: item.price * amount,
          };
        }

        return item;
      }),
    );
  }

  function removeItem(id: number) {
    setItems(items.filter((item) => item.id !== id));
  }

  if (error) {
    throw new Error("Failed to fetch categories");
  }

  return (
    <header className="grid grid-cols-3 p-6">
      <NavLink to="/">
        <h1 className="text-primary text-2xl font-semibold">Fake Store</h1>
      </NavLink>
      {isLoading && <Skeleton className="h-8 w-[100px] justify-self-center" />}
      {!isLoading && categories && (
        <NavigationMenu className="justify-self-center">
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
      {!routesToDisableSheet.includes(pathname.split("/")[1]) && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant={"outline"}
              size={"icon"}
              className="cursor-pointer justify-self-end"
            >
              <Menu className="text-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent className="px-4 pb-4">
            <SheetHeader className="px-0">
              <SheetTitle className="text-primary text-xl">Cart</SheetTitle>
            </SheetHeader>
            <ul className="flex h-full flex-col gap-4 overflow-y-auto pr-6">
              {!items.length && (
                <li className="text-primary flex flex-1 items-center justify-center">
                  No items added
                </li>
              )}
              {items.map((item, index) => (
                <div key={item.id} className="flex flex-col gap-4">
                  {index > 0 && <Separator />}
                  <li className="flex gap-4">
                    <NavLink
                      to={`/categories/${convertCategoryToSlug(item.category)}/${item.id}`}
                      onClick={() => setIsOpen(false)}
                      className="aspect-square size-20 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="size-20"
                      />
                    </NavLink>
                    <div className="flex w-full flex-col gap-4">
                      <div className="flex items-start gap-2">
                        <NavLink
                          to={`/categories/${convertCategoryToSlug(item.category)}/${item.id}`}
                          onClick={() => setIsOpen(false)}
                          className="w-full"
                        >
                          <p>{item.title}</p>
                        </NavLink>
                        <Button
                          size={"icon"}
                          variant={"ghost"}
                          className="cursor-pointer"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <p>${item.price}</p>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            size={"icon"}
                            onClick={() =>
                              updateAmount(item.id, item.amount - 1)
                            }
                            disabled={item.amount === 1}
                            className="size-6 cursor-pointer rounded-tr-none rounded-br-none"
                          >
                            <Minus />
                          </Button>
                          <p className="border-y-input h-6 w-8 border-y-1 text-center text-sm">
                            {item.amount}
                          </p>
                          <Button
                            type="button"
                            size={"icon"}
                            onClick={() =>
                              updateAmount(item.id, item.amount + 1)
                            }
                            className="size-6 cursor-pointer rounded-tl-none rounded-bl-none"
                          >
                            <Plus />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
            {Boolean(items.length) && (
              <>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p>Subtotal:</p>
                  <p className="font-semibold">${total}</p>
                </div>
                <NavLink to="/checkout">
                  <Button
                    className="w-full cursor-pointer font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Checkout
                  </Button>
                </NavLink>
              </>
            )}
          </SheetContent>
        </Sheet>
      )}
    </header>
  );
}
