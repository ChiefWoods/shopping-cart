import { useState } from "react";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  return { items, setItems };
}
