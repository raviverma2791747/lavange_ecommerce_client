import Link from 'next/link'
import React from 'react'

const OrderCardShimmer = () => {
    return (
        <Link href={"/"} className="block border border-gray-200 rounded-lg shadow-md text-gray-400">
            <div
                className="border-b border-gray-200 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4"
            >
                <div>
                    <div className="font-semibold">Order Placed</div>
                    <div>
                        <div className="bg-gray-200 animate-pulse rounded-lg w-6/12">&nbsp;</div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold">Status</div>
                    <div
                        className="capitalize px-2 py-1 text-sm inline-flex border border-gray-300 rounded-full bg-gray-100 text-grey-500"
                    >
                        <div className="bg-gray-200 animate-pulse rounded-lg w-12">&nbsp;</div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold">Total</div>
                    <div>
                        <div className="bg-gray-200 animate-pulse rounded-lg w-6/12">&nbsp;</div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold">Ship To</div>
                    <div>
                        <div className="bg-gray-200 animate-pulse rounded-lg w-6/12">&nbsp;</div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold">Order #</div>
                    <div className="uppercase text-grey-500">
                        <div className="bg-gray-200 animate-pulse rounded-lg w-6/12">&nbsp;</div>
                    </div>
                </div>
            </div>
            <div className="p-4 flex gap-4">
                <div className="text-grey-500 "><div className="bg-gray-200 animate-pulse rounded-lg w-16">&nbsp;</div></div>
            </div>
        </Link>

    )
}

export default OrderCardShimmer