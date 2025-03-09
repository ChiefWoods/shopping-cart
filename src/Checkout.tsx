import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useCart } from "./providers/CartProvider";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, setItems, total } = useCart();
  const [payBtnText, setPayBtnText] = useState<string>("Pay");
  const [isPaying, setIsPaying] = useState<boolean>(false);

  function makePayment() {
    setIsPaying(true);
    setPayBtnText("Processing...");

    let seconds = 4;

    const interval = setInterval(() => {
      seconds -= 1;
      setPayBtnText(`Purchase confirmed! Redirecting in ${seconds}..`);

      if (seconds === 0) {
        clearInterval(interval);
        setItems([]);
      }
    }, 1000);
  }

  useEffect(() => {
    void (async () => {
      if (!items.length) {
        await navigate("/");
      }
    })();
  }, [items, navigate]);

  return (
    <section className="flex flex-col gap-6 p-6">
      <h2 className="text-primary text-xl font-semibold">Checkout</h2>
      <ul className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-4">
            {index > 0 && <Separator />}
            <li key={index} className="flex gap-4">
              <img src={item.image} alt={item.title} className="size-[100px]" />
              <div className="flex w-full flex-col gap-2">
                <h3 className="text-xl">{item.title}</h3>
                <div className="flex justify-between">
                  <p>{item.amount}</p>
                  <p>${item.total.toFixed(2)}</p>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
      <div className="flex justify-between">
        <p>Total:</p>
        <p className="font-semibold underline">${total}</p>
      </div>
      <Button
        className="cursor-pointer font-semibold"
        onClick={makePayment}
        disabled={isPaying}
      >
        {payBtnText}
      </Button>
    </section>
  );
}
