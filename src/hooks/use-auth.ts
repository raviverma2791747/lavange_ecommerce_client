'use client';

import { ProductModel } from '@/models';
import { processCart } from '@/helper/utils';
import useStore from '@/helper/store';
import { userPrivateService, userService } from '@/services';
import { model } from '@/types/model';
import { useCallback } from 'react';

export const useAuth = () => {
  const {
    setAuthenticating,
    setUserInfo,
    setCart,
    setWishlist,
  } = useStore();

  const hydrateSession = useCallback(async () => {
    setAuthenticating(true);

    try {
      let meResponse = await userService.me();

      if (meResponse?.status === 401) {
        const refreshResponse = await userService.refresh();
        if (refreshResponse?.status === 200) {
          meResponse = await userService.me();
        }
      }

      if (!meResponse || meResponse.status !== 200) {
        setUserInfo(null);
        setCart([]);
        setWishlist([]);
        return false;
      }

      setUserInfo((meResponse.data.user as model.IUser) ?? null);

      const [cartResponse, wishlistResponse] = await Promise.all([
        userPrivateService.getCart(),
        userPrivateService.getWishlist(),
      ]);

      if (cartResponse && cartResponse.status === 200) {
        const rawCart = (cartResponse.data.cart as model.ICartItem[]) ?? [];
        setCart(
          processCart(rawCart).map((item) => ({
            ...item,
            product: ProductModel.fromOBJ(item.product),
          })),
        );
      } else {
        setCart([]);
      }

      if (wishlistResponse && wishlistResponse.status === 200) {
        setWishlist((wishlistResponse.data.wishList as ProductModel[]) ?? []);
      } else {
        setWishlist([]);
      }

      return true;
    } finally {
      setAuthenticating(false);
    }
  }, [setAuthenticating, setCart, setUserInfo, setWishlist]);

  const logout = useCallback(async () => {
    const response = await userService.logout();

    if (response && response.status === 200) {
      setUserInfo(null);
      setCart([]);
      setWishlist([]);
      return true;
    }

    return false;
  }, [setCart, setUserInfo, setWishlist]);

  return {
    hydrateSession,
    logout,
  };
};
