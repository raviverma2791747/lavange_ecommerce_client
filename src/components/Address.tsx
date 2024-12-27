import { ADDRESS_TYPE, STATUS } from '@/helper/constants';
import { getByValue } from '@/helper/utils';
import { userPrivateService } from '@/services';
import { X } from '@phosphor-icons/react/dist/ssr';
import React from 'react'


interface IAddressProps {
    address: any
    onDelete: () => void
}
const Address: React.FC<IAddressProps> = ({ address, onDelete }) => {
    const [addressDeletionModal, setAddressDeletionModal] = React.useState(false);

    const handleRemoveAddress = async () => {
        address.status = STATUS.ARCHIVE;
        const response = await userPrivateService.updateAddress(address);
        if (response && response.status === 200) {
            setAddressDeletionModal(false);
            onDelete && onDelete();
        }
    };

    return (
        <>
            <div
                className="text-gray-800 border-2 border-gray-200 rounded-lg p-4 h-full w-full text-sm hover:shadow flex flex-col"
            >
                <div className="grow">
                    <div className="font-semibold">{address.fullName}</div>
                    <div>{address.mobile}</div>
                    <div>{getByValue(ADDRESS_TYPE, address.type)}</div>
                    <div>{address.addressLine1}</div>
                    <div>{address.addressLine2}</div>
                    <div>{address.landmark}</div>
                    <div>{address.city}, {address.state}, {address.pincode}</div>
                    <div>{address.country}</div>
                </div>
                <div className="flex gap-4">
                    <a href={`address/edit/${address._id}`} className="block text-primary-500">Edit</a>
                    <button
                        className="text-primary-500"
                        onClick={() => setAddressDeletionModal(true)}>Remove</button>
                </div>
            </div>

            {addressDeletionModal &&
                <div
                    className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center"
                >
                    <div className="bg-white rounded-lg shadow-lg w-[500px]">
                        <div
                            className="relative p-4 font-semibold text-lg text-center border-b border-gray-200"
                        >
                            <button
                                className="absolute top-4 left-4 rounded-full hover:text-primary-600 hover:bg-primary-50"
                                onClick={() => {
                                    setAddressDeletionModal(false);
                                }}
                            >
                                <X size={24} />
                            </button>

                            <div>Confirm Deletion</div>
                        </div>

                        <div className="p-4">
                            <div className="mb-4">
                                <div className="font-semibold">{address.fullName}</div>
                                <div>{address.mobile}</div>
                                <div>{address.type}</div>
                                <div>{address.addressLine1}</div>
                                <div>{address.addressLine2}</div>
                                <div>{address.landmark}</div>
                                <div>{address.city}, {address.state}, {address.pincode}</div>
                                <div>{address.country}</div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    className=" grow hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-primary-600 text-primary-600 disabled:opacity-50 disabled:pointer-events-none"
                                    onClick={() => {
                                        setAddressDeletionModal(false);
                                    }}>No</button>
                                <button
                                    className="grow hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                                    onClick={handleRemoveAddress}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Address