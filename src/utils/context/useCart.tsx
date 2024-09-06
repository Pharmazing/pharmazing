import { createContext, useContext, useState } from 'react';

export type CartType = {};

export interface ICartContext {
  cart: CartType;
  setCart: (cart: CartType) => void;
  // addToCart: (product: ProductType) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}
