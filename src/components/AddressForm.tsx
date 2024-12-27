'use client';
import React from 'react'
import { useForm } from 'react-hook-form';
import InputShimmer from './InputShimmer';
import { ADDRESS_TYPE } from '@/helper/constants';
import state_list from '@/helper/state_list';
import { CircleNotch, Spinner } from '@phosphor-icons/react/dist/ssr';

interface IAddressFormProps {
    defaultValues?: any,
    onSubmit?: (data: any) => void
    //values: any
}

const AddressForm: React.FC<IAddressFormProps> = ({ defaultValues, onSubmit }) => {
    const [loading, setLoading] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            country: defaultValues?.country ?? "India",
            fullName: defaultValues?.fullName ?? "",
            mobile: defaultValues?.mobile ?? "",
            type: defaultValues?.type ?? ADDRESS_TYPE.HOME,
            addressLine1: defaultValues?.addressLine1 ?? "",
            addressLine2: defaultValues?.addressLine2 ?? "",
            landmark: defaultValues?.landmark ?? "",
            city: defaultValues?.city ?? "",
            state: defaultValues?.state,
            pincode: defaultValues?.pincode ?? "",
        }
    });

    const onSubmitHandler = async (data: any) => {
        setLoading(true);
        onSubmit && await onSubmit(data);
        setLoading(false);
    }


    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* <!-- <h1 className="font-semibold text-3xl text-center mb-4">Add a new address</h1> --> */}
            <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-semibold mb-2">Country</label>
                <input
                    type="text"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    // bind:value={address.country}
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
                    // bind:value={address.fullName}
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
                        {...register("mobile", { required: true, minLength: 10, maxLength: 10, })}
                        // bind:value={address.mobile}
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
                    // bind:value={address.type}
                    disabled={loading}
                >
                    {
                        Object.entries(ADDRESS_TYPE).map(([key, value]) => (
                            <option value={value}>{key}</option>
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
                    // bind:value={address.pincode}
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
                    // bind:value={address.addressLine1}
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
                    // bind:value={address.addressLine2}
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
                    // bind:value={address.landmark}
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
                    // bind:value={address.city}
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
                    // bind:value={address.state}
                    {...register("state", { required: true })}
                    disabled={loading}
                >
                    {
                        state_list.map((state) => (
                            <option value={state}>{state}</option>
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