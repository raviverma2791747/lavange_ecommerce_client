import React from 'react'

const PaymentMethodOptionShimmer = () => {
    return (
        <label
            className="border border-gray-200 rounded-lg p-4 hover:shadow flex gap-2 cursor-pointer"
        >
            <div>
                <input type="radio" disabled={true} />
            </div>
            <div className="bg-gray-200 animate-pulse w-32 rounded-lg">
                &nbsp;
            </div>
        </label>
    )
}

export default PaymentMethodOptionShimmer