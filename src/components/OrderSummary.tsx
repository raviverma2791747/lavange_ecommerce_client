import { STATUS } from '@/helper/constants';
import { formatCurrency } from '@/helper/utils';
import { CartItemModel } from '@/models';
import React from 'react'

interface IOrderSummaryProps {
    orderSummary: {
        cart_total: number;
        discount: number;
        tax: number;
        delivery_charge: number;
        total: number;
        cart: CartItemModel[]
    };
    loading?: boolean;
    enableCheckout?: boolean,
    onPlaceOrder?: () => void
}

const OrderSummary: React.FC<IOrderSummaryProps> = ({ orderSummary, loading, enableCheckout, onPlaceOrder }) => {

    const handlePlaceOrder = () => {
        if (enableCheckout) {
            if(onPlaceOrder) onPlaceOrder();
        }
    }
    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="font-semibold mb-4">Order Summary</div>
            <div className="text-sm flex flex-col gap-4 mb-2">
                <div className="flex">
                    <div className="grow">Bag Total</div>
                    <div
                        className={`${loading ? 'w-16' : ''}`}
                    >
                        {loading ?
                            <div className=" bg-gray-300 rounded-lg">&nbsp;</div> :
                            orderSummary.cart.every((c) => c.product.status === STATUS.ACTIVE) && orderSummary.cart.every((c) => {
                                if (c.variant && !c.product.variants) {
                                    return false;
                                }
                                return true;
                            }) ?
                                formatCurrency(orderSummary.cart_total)
                                :
                                "---"
                        }
                    </div>
                </div>

                <div className="flex">
                    <div className="grow">Bag Discount</div>
                    <div

                        className={`${loading ? 'w-16' : ''}`}
                    >
                        {loading ?
                            <div className=" bg-gray-300 rounded-lg">&nbsp;</div> :
                            orderSummary.cart.every((c) => c.product.status === STATUS.ACTIVE) && orderSummary.cart.every((c) => {
                                if (c.variant && !c.product.variants) {
                                    return false;
                                }
                                return true;
                            }) ? `-${formatCurrency(orderSummary.discount)}` : "---"}
                    </div>
                </div>

                {/* <div className="flex">
                    <div className="grow">Tax</div>
                    <div
                    //className={`${loading ? 'w-16' : ''}`}
                    >
                        {loading ?
                            <div className=" bg-gray-300 rounded-lg">&nbsp;</div>
                            : orderSummary.cart.every((c) => c.product.status === STATUS.ACTIVE) && orderSummary.cart.every((c) => {
                                if (c.variant && !c.product.variants) {
                                    return false;
                                }
                                return true;
                            }) ? formatCurrency(orderSummary.tax) : "---"}
                    </div>
                </div> */}

                <div className="flex">
                    <div className="grow">Delivery Charges</div>
                    <div
                        className={`${loading ? 'w-16' : ''}`}
                    >
                        {loading ?
                            <div className=" bg-gray-300 rounded-lg">&nbsp;</div>
                            : orderSummary.cart.every((c) => c.product.status === STATUS.ACTIVE) && orderSummary.cart.every((c) => {
                                if (c.variant && !c.product.variants) {
                                    return false;
                                }
                                return true;
                            }) ? formatCurrency(
                                orderSummary.delivery_charge
                            ) : "---"}
                    </div>
                </div>
            </div>
            <hr className="mb-2" />
            <div className="flex font-semibold mb-4">
                <div className="grow">Total</div>
                <div
                    className={`${loading ? 'w-16' : ''}`}
                >
                    {loading ?
                        <div className=" bg-gray-300 rounded-lg">&nbsp;</div>
                        : orderSummary.cart.every((c) => c.product.status === STATUS.ACTIVE) && orderSummary.cart.every((c) => {
                            if (c.variant && !c.product.variants) {
                                return false;
                            }
                            return true;
                        }) ?
                            formatCurrency(orderSummary.total)
                            :
                            "---"
                    }
                </div>
            </div>
            <button
                // href="/checkout"
                className="w-full grow hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                onClick={handlePlaceOrder}
                disabled={!enableCheckout}>Place Order</button>
            {!orderSummary.cart.every((c) => !c.isOutOfStock) &&
                <p className="text-red-500 text-sm">
                    Remove all out of stock or unavailable items to checkout
                </p>
            }
        </div>
    )
}

export default OrderSummary