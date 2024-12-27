'use client';
import Address from '@/components/Address';
import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import useStore from '@/helper/store';
import { userPrivateService } from '@/services';
import { Barricade, Lock, Plus } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import React from 'react'

const AddressesPage = () => {
    const [loading, setLoading] = React.useState(false);
    const { userInfo, setAuthModal,setUserInfo } = useStore();
    const authenticating = false;
    const router = useRouter();

    const initUser = async () => {
        const response: any = await userPrivateService.me();
        if (response && response.status === 200) {
            setUserInfo(response.data.user ?? null);
        }
    }


    return (
        <>

            {userInfo ?
                < div className="bg-white max-w-5xl mx-auto px-4 5xl:px-0 py-2" >
                    {loading ?
                        < BreadcrumbShimmer count={2} />
                        :
                        < Breadcrumb
                            routes={
                                [
                                    {
                                        name: "Account",
                                        path: "/account",
                                    },
                                    {
                                        name: "Address",
                                        path: "/account/address",
                                    },
                                ]}
                        />
                    }
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                        <a
                            href="/account/address/new"
                            className="text-gray-800 border-2 border-dashed border-gray-200 rounded-lg flex justify-center items-center aspect-[4/2] sm:aspect-square"
                        >
                            <div className="flex flex-col justify-center items-center">
                                <Plus size={32} />
                                <div>Add Address</div>
                            </div>
                        </a>

                        {
                            userInfo.addresses.map((address: any) => (<div className="aspect-[4/2] sm:aspect-square">
                                <Address address={address} onDelete={initUser} />
                            </div>))
                        }

                    </div>
                </div >
                : !userInfo && authenticating ?
                    < div
                        className="bg-white max-w-5xl mx-auto px-4 5xl:px-0 py-2 min-h-[calc(100vh-64px)] flex"
                    >
                        <div className="flex items-center justify-center grow">
                            <div className="flex flex-col items-center">
                                <Lock size={32} />
                                <div>Please wait while we log you in...</div>
                            </div>
                        </div>
                    </div >
                    :
                    < div
                        className="bg-white max-w-5xl mx-auto px-4 5xl:px-0 pt-4 min-h-[calc(100vh-64px)] flex"
                    >
                        <div className="flex items-center justify-center grow">
                            <div className="flex flex-col items-center">
                                <Barricade size={32} />
                                <div className="mb-4">Please login to view your account details</div>
                                <button
                                    className="w-full sm:w-fit hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                                    onClick={() => {
                                        router.push("/");
                                        setAuthModal(true);
                                    }}>Continue to Login</button
                                >
                            </div>
                        </div>
                    </div >
            }
        </>
    )
}

export default AddressesPage