import { createContext, useContext, useEffect, useState } from 'react';
import {
  Cart,
  useCreateCartMutation,
  useEditCartMutation,
  useGetCartLazyQuery,
} from '../../generated/graphql';
import { useUser } from './useUser';
import { useToast } from '../hooks';

export type CartType = Cart;

export interface ICartContext {
  cart: CartType | null;
  getCart: (userId?: string) => Promise<void>;
  setCart: (cart: CartType | null) => void;
  // addToCart: (product: ProductType) => void;
  clearCart: () => void;
  loading: boolean;
  setItemQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext<ICartContext>({
  cart: {
    cartId: '',
    items: [],
  },
  setCart: () => null,
  // addToCart: () => null,
  clearCart: () => null,
  getCart: () => Promise.resolve(),
  loading: false,
  setItemQuantity: () => null,
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
  const {
    user: { userId },
  } = useUser();
  const { showToast } = useToast();

  const [cart, setCart] = useState<CartType | null>(null);

  const [getCartTrigger, { loading: cartLoading, error }] = useGetCartLazyQuery(
    {
      onCompleted: (data) => setCart(data.getCart as CartType),
      onError: () => {
        setCart(null);
        showToast({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to get cart',
        });
      },
    }
  );

  const [editCartTrigger, { loading: editCartLoading }] = useEditCartMutation({
    onCompleted: (data) => {
      setCart(data.editCart as CartType);
      showToast({
        type: 'success',
        text1: 'Success',
        text2: 'Item added to cart',
        visibilityTime: 1500,
      });
    },
    onError: () => {
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to edit cart',
      });
    },
  });

  const [createCartTrigger, { loading: createCartLoading }] =
    useCreateCartMutation({
      onCompleted: (data) => setCart(data.createCart as CartType),
    });

  useEffect(() => {
    if (error && userId) {
      createCartTrigger({ variables: { cart: { userId: userId || '' } } });
    }
  }, [error, userId, createCartTrigger]);

  const clearCart = () => {
    setCart(null);
  };

  const getCart = async (userIdParam?: string) => {
    userId &&
      (await getCartTrigger({
        variables: { userId: userIdParam || userId || '' },
      }));
  };

  const setItemQuantity = (productId: string, quantity: number) => {
    let cartItems = Object.assign(cart?.items || []);
    if (!cart?.items?.find((item) => item?.productId === productId)) {
      cartItems = [...cartItems, { productId, quantity }];
    }
    const newItems = cartItems?.map((item: any) =>
      item?.productId === productId
        ? quantity === 0
          ? null
          : { ...item, quantity }
        : item
    );
    // console.warn('newItems', newItems);
    if (userId) {
      editCartTrigger({
        variables: {
          cart: {
            cartId: cart?.cartId || '',
            items: newItems,
          },
        },
      });
    } else {
      setCart({
        cartId: '',
        items: newItems,
      });
      showToast({
        type: 'success',
        text1: 'Success',
        text2: 'Item added to cart',
      });
    }
  };

  const loading = cartLoading || createCartLoading || editCartLoading;
  return (
    <CartContext.Provider
      value={{ getCart, cart, setCart, clearCart, loading, setItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
