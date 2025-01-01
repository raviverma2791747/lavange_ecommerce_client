import { model } from '@/types/model'
import React from 'react'

interface IAddressOptionProps {
    address: model.IAddress,
    loading?: boolean,
    disabled?: boolean,
    selected?: boolean,
    onChange: (addressId: string) => void
}

const AddressOption: React.FC<IAddressOptionProps> = ({ address, loading, disabled, selected, onChange }) => {
    return (
        <label
            htmlFor={`address-${address._id}`}
            className={`border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow flex gap-2 hover:border-primary-500 ${selected ? 'bg-primary-50 border-primary-500' : ''}`}
        >
            <div>
                <input
                    className="focus:border-primary-500 focus:ring-primary-500 focus:checked:bg-primary-500 checked:bg-primary-500 hover:checked:bg-primary-500"
                    disabled={loading || disabled}
                    id={`address-${address._id}`}
                    type="radio"
                    name="address"
                    onChange={() => onChange(address._id)}
                    value={address._id}
                />
            </div>
            <div>
                <div className="font-semibold">{address.fullName}</div>
                <div className="flex gap-1 flex-wrap text-sm">
                    <div>{address.mobile}</div>
                    <div>{address.addressLine1}</div>
                    <div>{address.addressLine2}</div>
                    <div>{address.landmark}</div>
                    <div>{address.city}</div>
                    <div>{address.state}</div>
                    <div>{address.pincode}</div>
                    <div>{address.country}</div>
                </div>
            </div>
        </label>
    )
}

export default AddressOption