import { Link, useLocation } from "react-router";
import NavBreadcrumb from "./components/NavBreadcrumb";
import useSWR from "swr";
import { Card, CardContent } from "./components/ui/card";
import { cn, convertSlugToCategory } from "./lib/utils";
import { Skeleton } from "./components/ui/skeleton";
import NoneFoundText from "./components/NoneFoundText";

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

  if (error) {
    throw new Error("Failed to fetch products");
  }

  return (
    <>
      <NavBreadcrumb />
      <section
        className={cn(
          "grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          !products?.length ? "flex-1" : "",
        )}
      >
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[300px]" />
          ))}
        {products &&
          (products.length ? (
            products.map((product: Product) => {
              return (
                <Link to={`/products/${product.id}`} key={product.id}>
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
                </Link>
              );
            })
          ) : (
            <NoneFoundText text="No products found." />
          ))}
      </section>
    </>
  );
}
