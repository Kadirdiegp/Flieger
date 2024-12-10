import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const useCart = create<CartStore>((set) => ({
  items: [],
  subtotal: 0,
  shipping: 4.99,
  total: 0,

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.id === item.id && i.size === item.size
      );
      
      if (existingItem) {
        const updatedItems = state.items.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
        const newSubtotal = calculateSubtotal(updatedItems);
        return {
          items: updatedItems,
          subtotal: newSubtotal,
          total: newSubtotal + state.shipping,
        };
      }
      
      const newItems = [...state.items, item];
      const newSubtotal = calculateSubtotal(newItems);
      return {
        items: newItems,
        subtotal: newSubtotal,
        total: newSubtotal + state.shipping,
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id);
      const newSubtotal = calculateSubtotal(newItems);
      return {
        items: newItems,
        subtotal: newSubtotal,
        total: newSubtotal + state.shipping,
      };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      const newSubtotal = calculateSubtotal(newItems);
      return {
        items: newItems,
        subtotal: newSubtotal,
        total: newSubtotal + state.shipping,
      };
    }),

  clearCart: () =>
    set({
      items: [],
      subtotal: 0,
      total: 0,
    }),
}));