import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  price: number;
  totalQuantity: number; // The total quantity available in stock
  quantityDemand: number; // The quantity the user wants to buy
};

type State = {
  CartItems: CartItem[];
  totalPrice: number;
};

type Action = {
  addToCart: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  reduceQuantity: (id: string) => void;
  calculateTotalPrice: () => void;
};

// Create the store
const useCartStore = create<State & Action>((set) => ({
  CartItems: [],
  totalPrice: 0,

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.CartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (!existingItem) {
        return {
          CartItems: [...state.CartItems, { ...item, quantityDemand: 0 }],
        };
      }
      return state; // Prevent adding duplicates
    }),

  removeItem: (id) =>
    set((state) => {
      const updatedCartItems = state.CartItems.filter((item) => item.id !== id);
      return { CartItems: updatedCartItems };
    }),

  increaseQuantity: (id) =>
    set((state) => {
      const updatedCartItems = state.CartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.min(
            item.quantityDemand + 1,
            item.totalQuantity
          );
          return { ...item, quantityDemand: newQuantity };
        }
        return item;
      });
      return { CartItems: updatedCartItems };
    }),

  reduceQuantity: (id) =>
    set((state) => {
      const updatedCartItems = state.CartItems.reduce(
        (acc: CartItem[], item) => {
          if (item.id === id) {
            const newQuantity = Math.max(item.quantityDemand - 1, 0);
            if (newQuantity > 0) {
              acc.push({ ...item, quantityDemand: newQuantity });
            }
            // If newQuantity is 0, the item is removed
          } else {
            acc.push(item);
          }
          return acc;
        },
        []
      );
      return { CartItems: updatedCartItems };
    }),

  calculateTotalPrice: () =>
    set((state) => {
      const totalPrice = state.CartItems.reduce(
        (total, item) => total + item.price * item.quantityDemand,
        0
      );
      return { totalPrice };
    }),
}));
