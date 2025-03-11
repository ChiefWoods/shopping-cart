import useSWR from "swr";
import { Skeleton } from "./components/ui/skeleton";
import { Link } from "react-router";
import { cn, convertSlugToCategory } from "./lib/utils";
import { Card, CardContent } from "./components/ui/card";
import NoneFoundText from "./components/NoneFoundText";

export default function App() {
  const {
    data: products,
    isLoading,
    error,
  } = useSWR(
    `${import.meta.env.VITE_FAKE_STORE_API}/products?limit=10`,
    async (url) => {
      const res = await fetch(url);
      const products: Product[] = await res.json();
      const shuffled = products.sort(() => 0.5 - Math.random());

      return shuffled;
    },
    {
      revalidateIfStale: false,
    },
  );

  if (error) {
    throw new Error("Failed to fetch products");
  }

  return (
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
                  <CardContent className="flex h-full w-full flex-col items-center justify-start gap-2">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="aspect-square size-[100px]"
                    />
                    <h3 className="line-clamp-3 text-xl font-semibold">
                      {product.title}
                    </h3>
                    <p className="mt-auto self-start text-xs text-gray-600">
                      {convertSlugToCategory(product.category)}
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
  );
}
