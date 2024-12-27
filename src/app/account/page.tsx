import BreadcrumbShimmer from '@/components/BreadcrumbShimmer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { AddressBook, BagSimple, CaretRight, Chats, Heart, Package, Power, Shield, User, UserCircle } from '@phosphor-icons/react/dist/ssr';
import React from 'react'

const AccountPage = () => {
    let loading = false;
    return (
        <div className="bg-white max-w-5xl mx-auto px-4 5xl:px-0 pt-4">
            {loading ?
                <BreadcrumbShimmer count={1} />
                :
                <Breadcrumb
                    routes={[
                        {
                            name: "Account",
                            path: "/account",
                        },
                    ]}
                />
            }
            {/* <!-- <h1 className="hidden md:block  font-semibold text-xl md:text-3xl text-center mb-4">Account</h1> --> */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                <a
                    href="/account/profile"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <UserCircle size={40}  weight='light'/>
                        </div>
                        <div className="font-semibold">Personal Info</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </a>
                <a
                    href="/account/address"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <AddressBook size={40}  weight='light'/>
                        </div>
                        <div className="font-semibold">Address</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </a>
                <a
                    href="/account/security"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <Shield size={40}  weight='light'/>
                        </div>
                        <div className="font-semibold">Security</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </a>
                <a
                    href="/order"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <Package size={40}  weight='light'/>
                        </div>
                        <div className="font-semibold">Orders</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </a>
                <a
                    href="/cart"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <BagSimple size={40}  weight='light'/>
                        </div>
                        <div className="font-semibold">Cart</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </a>
                <a
                    href="/wishlist"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <Heart size={40}  weight='light'/>
                        </div>
                        <div className="font-semibold">Wishlist</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </a>
                <a
                    href="/help"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <Chats  size={40}  weight='light'/>
                        </div>
                        <div className="font-semibold">Help & Support</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </a>
                <button
                    // on:click={logout}
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <Power size={40}  weight='light'/>
                        </div>
                        <div className="font-semibold">Logout</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default AccountPage