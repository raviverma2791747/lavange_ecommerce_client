import BreadcrumbShimmer from '@/components/BreadcrumbShimmer'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/Breadcrumb"
import { AddressBook, BagSimple, CaretRight, Chats, Heart, Package, Power, Shield, UserCircle } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import React from 'react'

const AccountPage = () => {
    const loading = false;
    return (
        <div className="bg-white max-w-5xl mx-auto px-4 5xl:px-0 pt-4">
            {loading ?
                <BreadcrumbShimmer count={1} />
                :
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Account</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                <Link
                    href="/account/profile"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <UserCircle size={40} weight='light' />
                        </div>
                        <div className="font-semibold">Profile</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </Link>
                <Link
                    href="/account/address"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <AddressBook size={40} weight='light' />
                        </div>
                        <div className="font-semibold">Address</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </Link>
                <Link
                    href="/account/security"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <Shield size={40} weight='light' />
                        </div>
                        <div className="font-semibold">Security</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </Link>
                <Link
                    href="/order"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <Package size={40} weight='light' />
                        </div>
                        <div className="font-semibold">Orders</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </Link>
                <Link
                    href="/cart"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <BagSimple size={40} weight='light' />
                        </div>
                        <div className="font-semibold">Cart</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </Link>
                <Link
                    href="/wishlist"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <Heart size={40} weight='light' />
                        </div>
                        <div className="font-semibold">Wishlist</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </Link>
                <Link
                    href="/help"
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <Chats size={40} weight='light' />
                        </div>
                        <div className="font-semibold">Help & Support</div>
                        <div className="md:hidden">
                            <CaretRight size={24} />
                        </div>
                    </div>
                </Link>
                <button
                    // on:click={logout}
                    className="text-gray-800 flex items-center justify-center p-2 md:aspect-[4/3] hover:text-primary-500 hover:bg-primary-50 border border-gray-200 rounded-lg hover:shadow"
                >
                    <div className="w-full flex justify-between md:flex-col md:items-center py-1">
                        <div className="hidden md:block">
                            <Power size={40} weight='light' />
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