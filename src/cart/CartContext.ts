import { create } from "zustand";
import { persist, StorageValue } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Necessário para persistência no Expo

interface Products {
  id: string;
  name: string;
  price: string;
  images: string[];
  category: string;
  quantity?: number;
}

interface CartProducts {
  products: Products[];
  addProduct: (product: Products, qtd: number) => void;
  deleteProduct: (id: string) => void;
  decreaseProductQuantity: (product: Products) => void;
  increaseProductQuantity: (product: Products) => void;
}

const storage = {
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) as StorageValue<CartProducts> : null;
  },
  setItem: async (key: string, value: StorageValue<CartProducts>) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};

export const useCart = create<CartProducts>()(
  
  persist(
    (set) => ({
      products: [],
      addProduct: (product: Products , qtd: number) =>
        set((state) => {
          const existingProduct = state.products.find((p) => p.id === product.id);
          if (existingProduct) {
            return {
              products: state.products.map((p) =>
                p.id === product.id
                  ? { ...p, quantity: (p.quantity || 1) + qtd }
                  : p
              ),
            };
          }
          return { products: [...state.products, { ...product, quantity: qtd }] };
          
        }),
      deleteProduct: (id: string) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),

      decreaseProductQuantity: (product: Products) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === product.id 
              ? { ...p, quantity: (p.quantity || 1) - 1 }
              : p
          ), 
        })),
      increaseProductQuantity: (product: Products) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === product.id
              ? { ...p, quantity: (p.quantity || 1) + 1 }
              : p
          ),
        })),
    }),
    {
      name: 'cart-storage', // Nome para o armazenamento persistente
      storage, // Definindo o AsyncStorage para persistência
    }
  )
);
