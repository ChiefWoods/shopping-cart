import { Minus, Plus, Star } from "lucide-react";
import { useLocation } from "react-router";
import useSWR from "swr";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { useCart } from "./providers/CartProvider";
import { useSheet } from "./providers/SheetProvider";
import { Skeleton } from "./components/ui/skeleton";

export default function Product() {
  const { pathname } = useLocation();
  const { items, setItems } = useCart();
  const { setIsOpen } = useSheet();
  const id = pathname.split("/")[3];
  const [amount, setAmount] = useState<number>(1);

  const {
    data: product,
    isLoading,
    error,
  } = useSWR(
    `${import.meta.env.VITE_FAKE_STORE_API}/products/${id}`,
    async (url) => {
      const res = await fetch(url);
      const product: Product = await res.json();

      return product;
    },
  );

  function addToCart(product: Product) {
    const index = items.findIndex((item) => item.id === product.id);

    if (index > -1) {
      const updatedItems = [...items];
      updatedItems[index].amount += amount;
      updatedItems[index].total += product.price * amount;

      setItems(updatedItems);
    } else {
      setItems([
        ...items,
        {
          id: product.id,
          category: product.category,
          title: product.title,
          price: product.price,
          amount,
          image: product.image,
          total: product.price * amount,
        },
      ]);
    }

    setIsOpen(true);
  }

  return (
    <section className="flex items-start gap-6 p-6">
      {isLoading && (
        <>
          <Skeleton className="aspect-square size-[200px]" />
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-8 w-12" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          </div>
        </>
      )}
      {error && <p>Unable to fetch product</p>}
      {product && (
        <>
          <img
            src={product.image}
            alt={product.title}
            className="aspect-square size-[200px]"
          />
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-semibold">{product.title}</h2>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center">
                  {Array.from({
                    length: Math.max(Math.floor(product.rating.rate), 1),
                  }).map((_, index) => (
                    <Star key={index} className="text-yellow-400" size={16} />
                  ))}
                </div>
                <p className="text-xs">{`(${product.rating.count})`}</p>
              </div>
            </div>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-semibold">${product.price}</p>
            <div className="flex">
              <Button
                type="button"
                size={"icon"}
                onClick={() => setAmount(amount - 1)}
                disabled={amount === 1}
                className="cursor-pointer rounded-tr-none rounded-br-none"
              >
                <Minus />
              </Button>
              <Input
                type="number"
                className="max-w-[100px] rounded-none text-center"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                min={1}
                step={1}
              />
              <Button
                type="button"
                size={"icon"}
                onClick={() => setAmount(amount + 1)}
                className="cursor-pointer rounded-tl-none rounded-bl-none"
              >
                <Plus />
              </Button>
            </div>
            <Button
              type="button"
              onClick={() => addToCart(product)}
              className="cursor-pointer font-semibold"
            >
              Add to Cart
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
