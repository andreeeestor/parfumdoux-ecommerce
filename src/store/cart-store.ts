import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

type CartState = {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  getTotal: () => number;
  getItemCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items;
        const existing = items.find((i) => i.productId === item.productId);

        if (existing) {
          const updated = items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
          set({ items: updated });
        } else {
          set({ items: [...items, item] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        const updated = get().items.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        );
        set({ items: updated });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),

      getItemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: "parfum-doux-cart", 
    }
  )
);
