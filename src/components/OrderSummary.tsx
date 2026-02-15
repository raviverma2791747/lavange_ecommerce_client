import { STATUS } from '@/helper/constants';
import { formatCurrency } from '@/helper/utils';
import { CartItemModel } from '@/models';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/Button"

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
            if (onPlaceOrder) onPlaceOrder();
        }
    }
    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-sm flex flex-col gap-4">
                    <div className="flex justify-between">
                        <div>Bag Total</div>
                        <div className={loading ? 'w-16' : ''}>
                            {loading ?
                                <div className=" bg-gray-300 rounded-lg h-4 w-full animate-pulse">&nbsp;</div> :
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

                    <div className="flex justify-between">
                        <div>Bag Discount</div>
                        <div className={loading ? 'w-16' : ''}>
                            {loading ?
                                <div className=" bg-gray-300 rounded-lg h-4 w-full animate-pulse">&nbsp;</div> :
                                orderSummary.cart.every((c) => c.product.status === STATUS.ACTIVE) && orderSummary.cart.every((c) => {
                                    if (c.variant && !c.product.variants) {
                                        return false;
                                    }
                                    return true;
                                }) ? `-${formatCurrency(orderSummary.discount)}` : "---"}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div>Delivery Charges</div>
                        <div className={loading ? 'w-16' : ''}>
                            {loading ?
                                <div className=" bg-gray-300 rounded-lg h-4 w-full animate-pulse">&nbsp;</div>
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
                <Separator />
                <div className="flex justify-between font-semibold">
                    <div>Total</div>
                    <div className={loading ? 'w-16' : ''}>
                        {loading ?
                            <div className=" bg-gray-300 rounded-lg h-4 w-full animate-pulse">&nbsp;</div>
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
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button
                    className="w-full"
                    onClick={handlePlaceOrder}
                    disabled={!enableCheckout}
                >
                    Place Order
                </Button>
                {!orderSummary.cart.every((c) => !c.isOutOfStock) &&
                    <p className="text-destructive text-sm text-center">
                        Remove all out of stock or unavailable items to checkout
                    </p>
                }
            </CardFooter>
        </Card>
    )
}

export default OrderSummary