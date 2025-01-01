'use client';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ADDRESS_TYPE } from '@/helper/constants';
import state_list from '@/helper/state_list';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';

interface IAddressFormProps {
    defaultValues?: IAddressForm,
    onSubmit?: (data: IAddressForm) => Promise<void>
}

export interface IAddressForm {
    country: string,
    fullName: string,
    mobile: number,
    type: number,
    addressLine1: string,
    addressLine2: string,
    landmark: string,
    city: string,
    state: string,
    pincode: number
}

const AddressForm: React.FC<IAddressFormProps> = ({ defaultValues, onSubmit }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<IAddressForm>({
        defaultValues: {
            country: defaultValues?.country ?? "India",
            fullName: defaultValues?.fullName ?? "",
            mobile: defaultValues?.mobile ?? undefined,
            type: defaultValues?.type ?? ADDRESS_TYPE.HOME,
            addressLine1: defaultValues?.addressLine1 ?? "",
            addressLine2: defaultValues?.addressLine2 ?? "",
            landmark: defaultValues?.landmark ?? "",
            city: defaultValues?.city ?? "",
            state: defaultValues?.state,
            pincode: defaultValues?.pincode ?? undefined,
        }
    });

    const onSubmitHandler: SubmitHandler<IAddressForm> = async (data) => {
        setLoading(true);
        if (onSubmit) await onSubmit(data);
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-semibold mb-2">Country</label>
                <input
                    type="text"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    value={"India"}
                    {...register("country", { required: true })}
                    placeholder="Country"
                    disabled={true}
                />
                {errors.country && <p className="text-red-500 text-xs mt-1">Country is required</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-semibold mb-2">Full name (First and Last name)</label>
                <input
                    type="text"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    {...register("fullName", { required: true, minLength: 3, maxLength: 100 })}
                    placeholder="Full name (First and Last name)"
                    disabled={loading}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">Full name is required</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-semibold mb-2">Mobile Number</label>
                <div className='flex gap-2'>
                    <select
                        className="w-min py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                        disabled={true}
                    >
                        <option value={91}>+91</option>
                    </select>
                    <input
                        type="number"
                        className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                        {...register("mobile", { required: true, min: 0, max: 9999999999 })}
                        placeholder="Mobile Number"
                        disabled={loading}
                    />
                </div>
                {
                    errors.mobile && <p className="text-red-500 text-xs mt-1">Mobile number is required</p>
                }

            </div>
            <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-semibold mb-2"> Type </label>
                <select
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    {...register("type", { required: true })}
                    disabled={loading}
                >
                    {
                        Object.entries(ADDRESS_TYPE).map(([key, value]) => (
                            <option value={value} key={key}>{key}</option>
                        ))
                    }
                </select>
                {
                    errors.type && <p className="text-red-500 text-xs mt-1">Type is required</p>
                }
            </div>
            <div className="mb-4">
                <label htmlFor="pincode" className="block text-sm font-semibold mb-2">Pincode</label>
                <input
                    type="number"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    {...register("pincode", { required: true, minLength: 6, maxLength: 6 })}
                    placeholder="Pincode"
                    disabled={loading}
                />
                {
                    errors.pincode && <p className="text-red-500 text-xs mt-1">Pincode is required</p>
                }
            </div>
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-semibold mb-2">Flat, House no., Building, Company, Apartment</label>
                <input
                    type="text"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    {...register("addressLine1", { required: true, minLength: 3, maxLength: 100 })}
                    placeholder="Flat, House no., Building, Company, Apartment"
                    disabled={loading}
                />
                {
                    errors.addressLine1 && <p className="text-red-500 text-xs mt-1">Address line 1 is required</p>
                }
            </div>
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-semibold mb-2">Area, Street, Sector, Village</label>
                <input
                    type="text"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    {...register("addressLine2", { required: true, minLength: 3, maxLength: 100 })}
                    placeholder="Area, Street, Sector, Village"
                    disabled={loading}
                />
                {
                    errors.addressLine2 && <p className="text-red-500 text-xs mt-1">Address line 2 is required</p>
                }
            </div>
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-semibold mb-2">Landmark</label>
                <input
                    type="text"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    {...register("landmark", { required: false, minLength: 3, maxLength: 100 })}
                    placeholder="Landmark"
                    disabled={loading}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-semibold mb-2">Town/City</label>
                <input
                    type="text"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    {...register("city", { required: true, minLength: 3, maxLength: 100 })}
                    placeholder="Town/City"
                    disabled={loading}
                />
                {
                    errors.city && <p className="text-red-500 text-xs mt-1">City is required</p>
                }
            </div>
            <div className="mb-4">
                <label htmlFor="state" className="block text-sm font-semibold mb-2">
                    State
                </label>
                <select
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    {...register("state", { required: true })}
                    disabled={loading}
                >
                    {
                        state_list.map((state) => (
                            <option value={state} key={state}>{state}</option>
                        ))
                    }
                </select>
                {
                    errors.state && <p className="text-red-500 text-xs mt-1">State is required</p>
                }
            </div>
            <button
                type='submit'
                disabled={loading}
                className="w-full bg-primary-500 flex justify-center text-white py-3 px-4  border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
            >
                {loading ? <CircleNotch size={24} weight='bold' className='animate-spin' /> :
                    "Save"}
            </button>
        </form>
    )
}

export default AddressForm