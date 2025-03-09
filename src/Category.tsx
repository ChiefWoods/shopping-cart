import { NavLink, useLocation } from "react-router";
import NavBreadcrumb from "./components/NavBreadcrumb";
import useSWR from "swr";
import { Card, CardContent } from "./components/ui/card";
import { convertCategoryToSlug, convertSlugToCategory } from "./lib/utils";
import { Skeleton } from "./components/ui/skeleton";

export default function Category() {
  const { pathname } = useLocation();
  const category = pathname.split("/")[2];

  const {
    data: products,
    isLoading,
    error,
  } = useSWR(
    `${import.meta.env.VITE_FAKE_STORE_API}/products/category/${encodeURIComponent(convertSlugToCategory(category).toLowerCase())}`,
    async (url) => {
      const res = await fetch(url);
      const products: Product[] = await res.json();

      return products;
    },
  );

  return (
    <>
      <NavBreadcrumb />
      <section className="grid auto-rows-fr grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[300px]" />
          ))}
        {error && <p>Unable to fetch products</p>}
        {products?.map((product: Product) => {
          return (
            <NavLink
              to={`/categories/${convertCategoryToSlug(product.category)}/${product.id}`}
              key={product.id}
            >
              <Card className="h-full hover:shadow-lg">
                <CardContent className="flex w-full flex-col items-center justify-start gap-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="aspect-square size-[100px]"
                  />
                  <h3 className="line-clamp-3 text-xl font-semibold">
                    {product.title}
                  </h3>
                  <p className="line-clamp-4 w-full text-gray-600">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </NavLink>
          );
        })}
      </section>
    </>
  );
}
