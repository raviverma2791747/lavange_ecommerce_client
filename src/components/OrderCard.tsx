'use client';
import { DATE_FORMAT } from '@/helper/constants';
import { formatCurrency, formatDate } from '@/helper/utils';
import React from 'react'
import OrderStatusPill from './OrderStatusPill';

interface IOrderCardProps {
    order: any
}

const OrderCard: React.FC<IOrderCardProps> = ({ order }) => {
    return (
        <a
            href={`/order/${order._id}`}
            className="block border border-gray-200 rounded-lg shadow-md"
        >
            <div
                className="border-b border-gray-200 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4"
            >
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
                            order.items.reduce((a:any, b:any) => a + b.quantity * b.price, 0)
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
                        className="uppercase text-primary-500"
                        onClick={(e: any) => {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            navigator.clipboard.writeText(order._id);
                        }}
                    >
                        {order._id}
                    </div>
                </div>
            </div>
            <div className="p-4 flex gap-4">
                <div className="text-primary-500 underline">View</div>
            </div>
        </a>
    )
}

export default OrderCard