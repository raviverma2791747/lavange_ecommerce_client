'use client';
import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import CartItem, { IOnAddParams, IOnRemoveParams } from '@/components/CartItem';
import CartItemShimmer from '@/components/CartItemShimmer';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { STATUS } from '@/helper/constants';
import useStore from '@/helper/store';
import { formatCurrency, processCart } from '@/helper/utils';
import { userPrivateService } from '@/services';
import { model } from '@/types/model';
import { useRouter } from 'next/navigation';
import React from 'react'


const CartPage = () => {
    const router = useRouter();
    const loading = false;
    const { cart, setCart } = useStore();
    const [disabled, setDisabled] = React.useState(false);

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


    if (loading) return (<div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 py-4">
        <BreadcrumbShimmer count={2} />
        <div className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-4 pt-4 md:pt-0 md:col-span-2">
                {
                    Array(3).fill(0).map((A, index: number) => (
                        <CartItemShimmer key={index} />
                    ))
                }
            </div>

            <div>
                <div className="mb-4">
                    <span className="font-semibold">Total Items:</span>
                    <span className="animate-pulse bg-gray-200 rounded-lg w-8 inline-block">&nbsp;</span>
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Grand Total Price:</span>
                    <span className="animate-pulse bg-gray-200 rounded-lg w-16 inline-block">&nbsp;</span>
                </div>
                <div className="mb-4">
                    <button
                        onClick={() => {
                            router.push("/checkout");
                        }}
                        disabled={loading ||
                            cart.length === 0 ||
                            !cart.every((c) => !c.isOutOfStock)}
                        className="w-full hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        Checkout</button>
                    {!cart.every((c) => !c.isOutOfStock) &&
                        <p className="text-red-500">
                            Remove all out of stock or unavailable items to checkout
                        </p>
                    }
                </div>
            </div>
        </div>
    </div>)

    // useEffect(() => {
    //     initCart();
    //     setLoading(false);
    // }, [cart]);

    return (
        <div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 py-4">

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Bag</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid md:grid-cols-3 gap-4">
                <div className="grid gap-4 pt-4 md:pt-0 md:col-span-2">
                    {
                        cart.map((cartItem, index) => (
                            <CartItem
                                key={index}
                                disabled={disabled || loading}
                                item={cartItem}
                                onAdd={handleAddToCart}
                                onDelete={handleDeleteCart}
                                onRemove={handleRemoveFromCart}
                            />
                        ))
                    }
                </div>

                <div>
                    <div className="mb-4">
                        <span className="font-semibold">Total Items:</span>
                        {cart.reduce((a, b) => a + b.quantity, 0)}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Grand Total Price:</span>
                        {cart.every((c) => c.product.status === STATUS.ACTIVE) ?
                            formatCurrency(
                                cart.reduce((a, b) => {
                                    let price = 0;
                                    if (b.variant && b.product.hasVariants()) {
                                        price = b.product.getPrice(b.variant) ?? NaN;
                                    } else {
                                        price = b.product.price;
                                    }
                                    return a + b.quantity * price;
                                }, 0)
                            ) : " "}
                    </div>
                    <div className="mb-4">
                        <button
                            onClick={() => {
                                router.push("/checkout");
                            }}
                            disabled={
                                disabled ||
                                loading ||
                                cart.length === 0 ||
                                !cart.every((c) => !c.isOutOfStock)}
                            className="w-full hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            Checkout</button>
                        {!cart.every((c) => !c.isOutOfStock) &&
                            <p className="text-red-500">
                                Remove all out of stock or unavailable items to checkout
                            </p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage