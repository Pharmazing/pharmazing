import { createContext, useContext, useState } from 'react';
import { Cart } from '../../generated/graphql';

export type CartType = Omit<Cart, '__typename'>;

export interface ICartContext {
  cart: CartType | null;
  getCart: (userId: string) => void;
  setCart: (cart: CartType | null) => void;
  // addToCart: (product: ProductType) => void;
  clearCart: () => void;
}

const CartContext = createContext<ICartContext>({
  cart: {
    cartId: '',
    items: [],
  },
  setCart: () => null,
  // addToCart: () => null,
  clearCart: () => null,
  getCart: () => null,
});

export function useCart() {
  const value = useContext(CartContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useCart must be wrapped in a <CartProvider />');
    }
  }

  return value;
}

export function CartProvider({ children }: React.PropsWithChildren<{}>) {
  // const {user: {userId}} = useUser();
  // const [getCartTrigger, {data, loading, error}] = useGetCartLazyQuery({variables: {userId: userId || ''}});
  const [cart, setCart] = useState<CartType | null>(null);

  const clearCart = () => {
    setCart(null);
  };

  const getCart = (userId: string) => {
    // getCartTrigger({variables: {userId}});
  };
  console.log('cart', cart);
  return (
    <CartContext.Provider value={{ getCart, cart, setCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
