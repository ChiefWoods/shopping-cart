import { Link } from "react-router";
import NavBreadcrumb from "./components/NavBreadcrumb";
import { Card, CardContent } from "./components/ui/card";
import { useFakeStore } from "./hooks/useFakeStore";
import { convertCategoryToSlug, convertSlugToCategory } from "./lib/utils";
import { Skeleton } from "./components/ui/skeleton";

export default function Catalog() {
  const { oneOfEach, isLoading, error } = useFakeStore();

  if (error) {
    throw new Error("Failed to fetch categories");
  }

  return (
    <>
      <NavBreadcrumb />
      <section className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[200px]" />
          ))}
        {oneOfEach?.map((product: Product) => (
          <Link
            to={`/categories/${convertCategoryToSlug(product.category)}`}
            key={product.category}
          >
            <Card className="hover:shadow-lg">
              <CardContent className="flex w-full flex-col items-center justify-center gap-2">
                <img
                  src={product.image}
                  alt={product.category}
                  className="aspect-square size-[100px]"
                />
                <h3 className="text-xl font-semibold">
                  {convertSlugToCategory(product.category)}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </>
  );
}
