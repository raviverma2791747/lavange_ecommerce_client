'use client';
import AddressOption from '@/components/AddressOption';
import CartItem, { IOnAddParams, IOnRemoveParams } from '@/components/CartItem';
import CartItemShimmer from '@/components/CartItemShimmer';
import OrderSummary from '@/components/OrderSummary';
import PaymentMethodOption from '@/components/PaymentMethodOption';
import PaymentMethodOptionShimmer from '@/components/PaymentMethodOptionShimmer';
import { PAYMENT_GATEWAY } from '@/helper/constants';
import useStore from '@/helper/store';
import { processCart } from '@/helper/utils';
import { CartItemModel } from '@/models';
import { checkoutPrivateService, userPrivateService } from '@/services';
import { model } from '@/types/model';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const [window, setWindow] = React.useState<Window | null>(null);
  const [enableCheckout, setEnableCheckout] = React.useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = React.useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [paymentGateways, setPaymentGateways] = React.useState<model.IPaymentGateway[]>([]);
  const [order_data, setOrderData] = React.useState<{
    cart: CartItemModel[];
    cart_total: number;
    delivery_charge: number;
    discount: number;
    tax: number;
    total: number;
  }>({
    cart: [],
    cart_total: 0,
    delivery_charge: 0,
    discount: 0,
    tax: 0,
    total: 0,
  });
  const { cart, userInfo, setCart } = useStore();

  const handleAddressChange = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  const handlePaymentMethodChange = (paymentMethodId: number) => {
    setSelectedPaymentMethod(paymentMethodId);
  };

  const handleDeleteCart = async (item_id: string) => {
    setDisabled(true);
    const response = await userPrivateService.deleteFromCart({
      itemId: item_id
    })
    if (response && response.status === 200) {
      initCart();
      setDisabled(false);
      return true
    } else {
      setDisabled(false);
      return false;
    }
  }

  const handleAddToCart = async (payload: IOnAddParams) => {
    setDisabled(true);
    const response = await userPrivateService.addToCart(payload)
    if (response && response.status === 200) {
      initCart();
      setDisabled(false);
      return true
    } else {
      setDisabled(false);
      return false;
    }
  }

  const handleRemoveFromCart = async (payload: IOnRemoveParams) => {
    setDisabled(true);
    const response = await userPrivateService.removeFromCart(payload)
    if (response && response.status === 200) {
      initCart();
      setDisabled(false);
      return true
    } else {
      setDisabled(false);
      return false;
    }
  }

  const initCart = async () => {
    const response = await userPrivateService.getCart();
    if (response && response.status === 200) {
      const temp_cart = response.data.cart as model.ICartItem[] ?? [];
      setCart(processCart(temp_cart));
    }
  }


  const initCheckout = async () => {
    setLoading(true);
    const response = await checkoutPrivateService.initiateCheckout({
      coupon_code: null
    })

    if (response && response.status === 200) {
      const temp_cart = response.data.cart as model.ICartItem[] ?? [];
      setOrderData({
        cart: processCart(temp_cart),
        cart_total: response.data.cartTotal as number ?? 0,
        discount: response.data.discount as number ?? 0,
        delivery_charge: 0,
        tax: response.data.tax as number ?? 0,
        total: response.data.grandTotal as number ?? 0
      })
      setPaymentGateways((response.data.paymentMethod as {
        paymentGateways: model.IPaymentGateway[];
      }).paymentGateways ?? []);
    }
    setLoading(false);
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return;
    if (!selectedPaymentMethod) return;
    setLoading(true);
    const response = await userPrivateService.createOrder({
      coupon_code: null,
      items: cart.map((cartItem) => {
        return {
          product: cartItem.product._id,
          quantity: cartItem.quantity,
          variant: cartItem.variant,
          variantSchema: null,
        };
      }),
      address: selectedAddress,
      redirectUrl: `${window?.location.origin}/checkout`,
      paymentMethod: selectedPaymentMethod,
    })
    if (response && response.status === 200) {
      const paymentGatewayCode = response.data.paymentGateway;
      if (PAYMENT_GATEWAY.PHONEPE === paymentGatewayCode) {
        if (typeof response.data.paymentUrl === 'string' && window) window.location.href = response.data.paymentUrl;
        else toast.error("Something went wrong");
      } else if (PAYMENT_GATEWAY.RAZORPAY === paymentGatewayCode) {
        toast.error("Razorpay not implemented");
      } else {
        toast.error("Something went wrong");
      }
    }
    setLoading(false);
  }

  const validateCheckout = () => {
    if (loading) setEnableCheckout(false);
    else if (!selectedAddress) setEnableCheckout(false);
    else if (!selectedPaymentMethod) setEnableCheckout(false);
    else if (cart.length === 0) setEnableCheckout(false);
    else if (!cart.every((cartItem) => !cartItem.isOutOfStock)) setEnableCheckout(false);
    else setEnableCheckout(true);
  }

  useEffect(() => {
    initCheckout();
  }, [cart])

  useEffect(() => {
    validateCheckout();
  }, [selectedAddress, selectedPaymentMethod, cart])

  useEffect(() => {
    setWindow(window);
  }, [])

  if (userInfo === null) return <div>Something went wrong</div>;

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 pt-4 min-h-[calc(100vh-80px)] flex">
      <div className="grid md:grid-cols-3 gap-4 grow">
        <div className="col-span-3 md:col-span-2">
          <div className="mb-4">
            <h1 className="font-semibold text-lg mb-4">Billing Address</h1>
            {userInfo.addresses.length ?
              <div className="flex flex-col gap-4">
                {
                  userInfo.addresses.map((address, index: number) => (
                    <AddressOption address={address} key={index} selected={selectedAddress === address._id} onChange={handleAddressChange} />))
                }
              </div>
              :
              <>
                <p>No address found!</p>
                <Link
                  href="/account/address/create"
                  className="text-primary-500 hover:underline">Click here to add address</Link></>
            }
          </div>
          <div className="mb-4">
            <h1 className="font-semibold text-lg mb-4">Payment Method</h1>
            <div className="flex flex-col gap-4">
              {loading ?
                Array(3).map((_, index) => (
                  <PaymentMethodOptionShimmer key={index} />
                )) : paymentGateways.filter((g) => g.status).map((paymentGateway, index: number) => (
                  <PaymentMethodOption paymentMethod={paymentGateway} key={index} selected={selectedPaymentMethod === paymentGateway.code} onChange={handlePaymentMethodChange} />
                ))
              }
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-lg mb-4">Order Details</h1>
            <div className="grid gap-4 mb-4">
              {loading ?
                Array(3).map((_, index) => (
                  <CartItemShimmer key={index} />
                )) : order_data.cart.map((cartItem, index: number) => (<CartItem
                  key={index}
                  onAdd={handleAddToCart}
                  onDelete={handleDeleteCart}
                  onRemove={handleRemoveFromCart}
                  disabled={loading || disabled}
                  item={cartItem}
                />))
              }
            </div>
            {/* <!-- <div className="mb-4">
            <span className="font-semibold">Total Price</span>

            {#if cart.every((c) => c.product.status === STATUS.ACTIVE) && cart.every( (c) => {
                  if (c.variant && !c.product.variants) {
                    return false;
                  }
                  return true;
                } )}
              {formatCurrency(
                cart.reduce((a, b) => {
                  let price = 0;
                  let variant;

                  if (b.variant && b.product.variants) {
                    variant = b.product.variants.find(
                      (v) => v._id === b.variant
                    );
                  } else {
                    price = b.product.price;
                  }

                  if (variant) {
                    price = variant.price;
                  }

                  //console.log(price);

                  return a + b.quantity * price;
                }, 0)
              )}
            {:else}
              ---
            {/if}
          </div> --> */}
          </div>
        </div>
        <div className="col-span-3 md:col-span-1">
          <div className="md:sticky md:top-[80px]">
            <OrderSummary orderSummary={order_data} loading={loading} enableCheckout={enableCheckout} onPlaceOrder={handlePlaceOrder} />

            {/* <div className="border border-gray-200 rounded-lg p-4">
              <div className="mb-2">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-200 p-2 pe-8"
                    placeholder="Enter coupon code"
                    // bind:value={coupon_code}
                    disabled={!loading &&
                      cart.every(
                        (c) => c.product.status === STATUS.ACTIVE
                      ) &&
                      cart.every((c) => {
                        if (c.variant && !c.product.variants) {
                          return false;
                        }
                        return true;
                      })
                      ? false
                      : true}
                  />
                  <button
                    // class:hidden={!coupon_code}
                    className="absolute top-1/2 -translate-y-1/2 right-2"
                  // on:click={handleRemoveCoupon}
                  ><X size={24} /></button
                  >
                </div>
              </div>
              {#if coupon_msg && coupon_code}
              {#if coupon_valid}
              <div className="text-sm text-green-500 font-semibold mb-4">
                {coupon_msg}
              </div>
              {:else}
              <div className="text-sm text-red-500 font-semibold mb-4">
                {coupon_msg}
              </div>
              {/if}
              {/if}
              <button
                disabled={!loading &&
                  cart.every((c) => c.product.status === STATUS.ACTIVE) &&
                  cart.every((c) => {
                    if (c.variant && !c.product.variants) {
                      return false;
                    }
                    return true;
                  })
                  ? false
                  : true}
                href="/checkout"
                className="w-full grow hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                on:click={handleApplyCoupon}>Apply Coupon</button
              >
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage