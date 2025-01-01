import { PAYMENT_STATUS } from '@/helper/constants'
import { getByValue } from '@/helper/utils'
import React from 'react'

interface IPaymentStatusPill {
    paymentStatus: number
}
const PaymentStatusPill: React.FC<IPaymentStatusPill> = ({ paymentStatus }) => {
    const PAYMENT_STATUS_CLASSES: Record<number, string> = {
        [PAYMENT_STATUS.PENDING]: 'bg-yellow-100 text-yellow-500 border-yellow-500',
        [PAYMENT_STATUS.SUCCESS]: 'bg-green-100 text-green-500 border-green-500',
        [PAYMENT_STATUS.FAILED]: 'bg-red-100 text-red-500 border-red-500',
        [PAYMENT_STATUS.REFUNDED]: 'bg-red-100 text-red-500 border-red-500',
    }
    return (
        <div
            className={`capitalize px-2 py-1 text-sm inline-flex border rounded-full ${PAYMENT_STATUS_CLASSES[paymentStatus]}`}
        >
            {getByValue(PAYMENT_STATUS, paymentStatus)}
        </div>
    )
}

export default PaymentStatusPill