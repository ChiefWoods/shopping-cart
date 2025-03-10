import { useFakeStore } from "@/hooks/useFakeStore";
import { Skeleton } from "./ui/skeleton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Link } from "react-router";
import { capitalizeFirstLetter, convertCategoryToSlug } from "@/lib/utils";

export default function NavMenu() {
  const { categories, isLoading, error } = useFakeStore();

  if (isLoading) {
    return <Skeleton className="h-8 w-[100px] justify-self-center" />;
  }

  if (error) {
    throw new Error("Failed to fetch categories");
  }

  return (
    categories && (
      <NavigationMenu className="justify-self-center">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/categories">
              <NavigationMenuTrigger className="text-primary hover:text-primary cursor-pointer font-semibold">
                Categories
              </NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent className="grid gap-3 p-4 md:w-[350px] md:grid-cols-2">
              {categories.map((category: string) => (
                <NavigationMenuLink key={category} asChild>
                  <Link to={`/categories/${convertCategoryToSlug(category)}`}>
                    {capitalizeFirstLetter(category)}
                  </Link>
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  );
}
