import { format } from "date-fns";
import { STATUS } from "./constants";
import { model } from "@/types/model";
import { CartItemModel } from "@/models";

export const formatDate = (date: string | number | Date, format_string: string) => {
  return format(date, format_string);
};

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

export function formatPercentage(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "percent",
  }).format(amount);
}

export const getByValue = (obj: Record<string, unknown>, val: unknown) => {
  return Object.keys(obj).find((key) => obj[key] === val);
};

export const getAvatarName = (obj: { firstName?: string, lastName?: string }) => {
  let avatar_name = "  ";
  if (obj.hasOwnProperty("firstName") && obj.firstName) {
    avatar_name = "" + obj.firstName.charAt(0);
  }

  if (obj.hasOwnProperty("lastName") && obj.lastName) {
    avatar_name += obj.lastName.charAt(0);
  }

  return avatar_name;
};

export const processCart = (cart: model.ICartItem[]) => {
  return cart.map((item) => {
    let isOutOfStock = true;
    if (item.product && typeof item.product !== 'string' && item.product.status === STATUS.ACTIVE) {
      if (item.variant) {
        isOutOfStock = item.product.variants.find((variant) => {
          return variant._id === item.variant;
        })
          ? false
          : true;
      } else {
        isOutOfStock = false;
      }
    }

    return CartItemModel.fromOBJ({
      ...item,
      isOutOfStock: isOutOfStock,
    })
  });
};
