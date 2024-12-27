'use client';
import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import CartItem from '@/components/CartItem';
import CartItemShimmer from '@/components/CartItemShimmer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { STATUS } from '@/helper/constants';
import useStore from '@/helper/store';
import { formatCurrency } from '@/helper/utils';
import { model } from '@/types/model';
import { Lock } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import React from 'react'

const CartPage = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const { cart, userInfo } = useStore();
    const authenticating = false;
    const [disabled, setDisabled] = React.useState(false);
    return (
        <>
            {cart.length > 0 ?

                <div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 py-4">
                    {loading ?
                        <BreadcrumbShimmer count={2} />
                        :
                        <Breadcrumb
                            routes={[
                                { name: "Home", path: "/" },
                                { name: "Bag", path: "/cart" },
                            ]}
                        />
                    }
                    {/* <!-- <h1
                        className="hidden md:block font-semibold text-3xl text-center mb-4 capitalize rou"
                    >
                        Cart
                    </h1> --> */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="grid gap-4 pt-4 md:pt-0 md:col-span-2">
                            {loading ?

                                <>
                                    {
                                        Array(3).fill(0).map((A, index: number) => (
                                            <CartItemShimmer key={index} />
                                        ))
                                    }
                                </>
                                :

                                <>
                                    {
                                        cart.map((cartItem: any, index: number) => (
                                            <CartItem
                                                disabled={disabled || loading}
                                                item={cartItem}
                                            // on:addToCart={async () => {
                                            //     disabled = true;
                                            // }}
                                            // on:deleteCartItem={async () => {
                                            //     disabled = true;
                                            // }}
                                            // on:removeFromCart={async () => {
                                            //     disabled = true;
                                            // }}
                                            // on:updateCart={async () => {
                                            //     disabled = false;
                                            //     await initCart();
                                            // }}
                                            />
                                        ))
                                    }
                                </>
                            }
                        </div>

                        <div>
                            <div className="mb-4">
                                <span className="font-semibold">Total Items:</span>
                                {loading ?
                                    <span className="animate-pulse bg-gray-200 rounded-lg w-8 inline-block">&nbsp;</span>
                                    :
                                    <>{cart.reduce((a: any, b: any) => a + b.quantity, 0)}</>
                                }
                            </div>
                            <div className="mb-4">
                                <span className="font-semibold">Grand Total Price:</span>
                                {loading ?
                                    <span className="animate-pulse bg-gray-200 rounded-lg w-16 inline-block">&nbsp;</span>
                                    : cart.every((c: any) => c.product.status === STATUS.ACTIVE) ?
                                        <> {formatCurrency(
                                            cart.reduce((a: any, b: model.ICartItem) => {
                                                let price = 0;
                                                if (b.variant && b.product.hasVariants()) {
                                                    price = b.product.getPrice(b.variant) ?? NaN;
                                                } else {
                                                    price = b.product.price;
                                                }
                                                return a + b.quantity * price;
                                            }, 0)
                                        )} </> : " "}

                            </div>
                            <div className="mb-4">
                                <button
                                    onClick={() => {
                                        router.push("/checkout");
                                    }}
                                    disabled={loading ||
                                        cart.length === 0 ||
                                        !cart.every((c: any) => !c.isOutOfStock)}
                                    className="w-full hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Checkout</button>
                                {!cart.every((c: any) => !c.isOutOfStock) &&
                                    <p className="text-red-500">
                                        Remove all out of stock or unavailable items to checkout
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                : !userInfo && authenticating ?
                    <div
                        className="bg-white max-w-5xl mx-auto px-4 5xl:px-0 mt-4 min-h-[calc(100vh-64px)] flex"
                    >
                        <div className="flex items-center justify-center grow">
                            <div className="flex flex-col items-center">
                                <Lock size={48} />
                                <div>Please wait while we log you in...</div>
                            </div>
                        </div>
                    </div>

                    :
                    <div
                        className="flex justify-center items-center flex-col gap-4 p-4 h-[calc(100vh-64px)]"
                    >
                        <div>Your cart is empty</div>
                        <a
                            href="/search"
                            className="w-full sm:w-fit hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                        >Continue shopping</a>
                    </div>
            }

        </>
    )
}

export default CartPage