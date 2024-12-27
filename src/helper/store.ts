import { Product } from "@/models";
import { create } from "zustand";


const useStore = create((set) => ({
  authModal: false,
  setAuthModal: (value: boolean) => set({ authModal: value }),
  wishlist: [],
  setWishlist: (value: any[]) => set({ wishlist: value }),
  cart: [],
  setCart: (value: { product: Product; variant: string | null; quantity: number, _id: string }[]) => set({ cart: value }),
  userInfo: null,
  setUserInfo: (value: any) => set({ userInfo: value }),
}));

export default useStore;