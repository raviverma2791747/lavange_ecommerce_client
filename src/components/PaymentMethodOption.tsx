import { model } from '@/types/model'
import React from 'react'

interface IPaymentMethodOptionProps {
    paymentMethod: model.IPaymentGateway,
    selected?: boolean,
    onChange: (paymentMethodCode: number) => void
}
const PaymentMethodOption: React.FC<IPaymentMethodOptionProps> = ({ paymentMethod, selected, onChange }) => {
    const ASSET_MAP: Record<number, string> = {
        1: "/assets/images/phonepe_logo.svg",
        2: "/assets/images/razorpay_logo.svg",
        3: "/assets/images/paytm_logo.svg",
    }
    return (
        <label
            htmlFor={paymentMethod.name}
            className={`border border-gray-200 rounded-lg p-4 hover:shadow flex gap-2 cursor-pointer hover:border-primary-500 ${selected ? 'bg-primary-50 border-primary-500' : ''}`}
        >
            <div>
                <input
                    name="paymentMethod"
                    type="radio"
                    id={paymentMethod.name}
                    value={paymentMethod.code}
                    onChange={() => onChange(paymentMethod.code)}
                    className="focus:border-primary-500 focus:ring-primary-500  focus:checked:bg-primary-500 checked:bg-primary-500 hover:checked:bg-primary-500"
                />
            </div>
            <div>{
                ASSET_MAP.hasOwnProperty(paymentMethod.code) && <img className='max-w-32' src={ASSET_MAP[paymentMethod.code]} alt="" />
            }
                <div className="lowercase first-letter:capitalize font-semibold">{paymentMethod.name}</div>
            </div>
        </label>
    )
}

export default PaymentMethodOption