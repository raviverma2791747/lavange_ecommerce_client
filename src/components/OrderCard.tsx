'use client';
import { DATE_FORMAT } from '@/helper/constants';
import { formatCurrency, formatDate } from '@/helper/utils';
import React from 'react'
import OrderStatusPill from './OrderStatusPill';
import { model } from '@/types/model';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface IOrderCardProps {
    order: model.IOrder
}

const OrderCard: React.FC<IOrderCardProps> = ({ order }) => {
    return (
        <Link href={`/order/${order._id}`}>
            <Card className="hover:bg-accent/50 transition-colors">
                <CardContent className="p-4 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 border-b">
                    <div>
                        <div className="font-semibold">Order Placed</div>
                        <div>{formatDate(order.createdAt, DATE_FORMAT)}</div>
                    </div>
                    <div>
                        <div className="font-semibold">Status</div>
                        <OrderStatusPill status={order.status} />
                    </div>
                    <div>
                        <div className="font-semibold">Total</div>
                        <div>
                            {formatCurrency(
                                order.items.reduce((a, b) => a + b.quantity * b.price, 0)
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold">Ship To</div>
                        <div>{order.address.fullName}</div>
                    </div>
                    <div>
                        <div className="font-semibold">Order #</div>
                        <div
                            className="uppercase text-primary-500 hover:underline cursor-pointer"
                            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                                e.nativeEvent.stopImmediatePropagation();
                                e.preventDefault();
                                navigator.clipboard.writeText(order._id);
                            }}
                        >
                            {order._id}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-4">
                    <div className="text-primary-500 underline">View</div>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default OrderCard