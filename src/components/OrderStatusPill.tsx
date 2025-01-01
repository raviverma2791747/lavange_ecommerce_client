import { ORDER_STATUS } from '@/helper/constants'
import { getByValue } from '@/helper/utils'
import React from 'react'

interface IOrderStatusPill {
    status: number
}

const OrderStatusPill: React.FC<IOrderStatusPill> = ({ status }) => {

    const ORDER_STATUS_CLASSES: Record<number, string> = {
        [ORDER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-500 border-yellow-500',
        [ORDER_STATUS.PLACED]: 'bg-green-100 text-green-500 border-green-500',
        [ORDER_STATUS.DELIVERED]: 'bg-green-100 text-green-500 border-green-500',
        [ORDER_STATUS.DISPATCHED]: 'bg-green-100 text-green-500 border-green-500',
        [ORDER_STATUS.PREPARED]: 'bg-green-100 text-green-500 border-green-500',
        [ORDER_STATUS.CANCELLED]: 'bg-red-100 text-red-500 border-red-500',
        [ORDER_STATUS.RETURNED]: 'bg-red-100 text-red-500 border-red-500',
    }

    return (
        <div
            className={`capitalize px-2 py-1 text-sm inline-flex border rounded-full ${ORDER_STATUS_CLASSES[status]}`}
        >
            {getByValue(ORDER_STATUS, status)}
        </div>
    )
}

export default OrderStatusPill