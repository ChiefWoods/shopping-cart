interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Product extends CartItem {
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}
