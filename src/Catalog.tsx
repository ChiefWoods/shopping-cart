import { NavLink } from "react-router";
import NavBreadcrumb from "./components/NavBreadcrumb";
import { Card, CardContent } from "./components/ui/card";
import { useFakeStore } from "./hooks/useFakeStore";
import { convertCategoryToSlug, convertSlugToCategory } from "./lib/utils";

export default function Catalog() {
  const { oneOfEach, isLoading, error } = useFakeStore();

  return (
    <>
      <NavBreadcrumb />
      <section className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading && <p>Loading...</p>}
        {error && <p>Unable to fetch categories</p>}
        {oneOfEach?.map((product: Product) => (
          <NavLink
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
          </NavLink>
        ))}
      </section>
    </>
  );
}
