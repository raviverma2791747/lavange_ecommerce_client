import React from 'react'
import InputShimmer from './InputShimmer'
import { Spinner } from '@phosphor-icons/react/dist/ssr'

const AddressFormShimmer = () => {
    const fields = [
        { name: "country", type: "text" },
        { name: "Full name (First and Last name)", type: "text" },
        { name: "Mobile Number", type: "number" },
        { name: "type", type: "text" },
        { name: "pincode", type: "number" },
        { name: "Flat, House no., Building, Company, Apartment", type: "text" },
        { name: "Area, Street, Sector, Village", type: "text" },
        { name: "landmark", type: "text" },
        { name: "Town/City", type: "text" },
        { name: "state", type: "text" },
    ]
    return (
        <form>
            {/* <!-- <h1 className="font-semibold text-3xl text-center mb-4">Add a new address</h1> --> */}
            {
                fields.map((field, index) => (
                    <div className="mb-4" key={index}>
                        <label htmlFor="country" className="block text-sm font-semibold mb-2 capitalize">{field.name}</label>
                        <InputShimmer />
                    </div>
                ))
            }


            <button
                type='submit'
                disabled={true}
                className="w-full bg-primary-500 text-white py-3 px-4 block border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
            >
                Save
            </button>
        </form>
    )
}

export default AddressFormShimmer