import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartItem {
  id: number;
  category: string;
  title: string;
  price: number;
  amount: number;
  image: string;
  total: number;
}

interface CartContextType {
  items: CartItem[];
  setItems: Dispatch<SetStateAction<CartItem[]>>;
  total: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(
      Number(items.reduce((acc, item) => acc + item.total, 0).toFixed(2)),
    );
  }, [items]);

  return (
    <CartContext.Provider value={{ items, setItems, total }}>
      {children}
    </CartContext.Provider>
  );
}
