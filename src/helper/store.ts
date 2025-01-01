import { CartItemModel, ProductModel } from "@/models";
import { model } from "@/types/model";
import { create } from "zustand";

interface IStore {
  authModal: boolean;
  setAuthModal: (value: boolean) => void;
  wishlist: ProductModel[];
  setWishlist: (value: ProductModel[]) => void;
  cart: CartItemModel[];
  setCart: (value: CartItemModel[]) => void;
  userInfo: null | model.IUser;
  setUserInfo: (value: model.IUser | null) => void;
  authenticating: boolean;
  setAuthenticating: (value: boolean) => void;
}

const useStore = create<IStore>((set) => ({
  authModal: false,
  setAuthModal: (value) => set({ authModal: value }),
  wishlist: [],
  setWishlist: (value) => set({ wishlist: value }),
  cart: [],
  setCart: (value) => set({ cart: value }),
  userInfo: null,
  setUserInfo: (value) => set({ userInfo: value }),
  authenticating: false,
  setAuthenticating: (value) => set({ authenticating: value }),
}));

export default useStore;