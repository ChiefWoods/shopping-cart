import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  amount: number;
  image: string;
  total: number;
}

interface CartContextType {
  items: CartItem[];
  setItems: Dispatch<SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ items, setItems }}>
      {children}
    </CartContext.Provider>
  );
}
