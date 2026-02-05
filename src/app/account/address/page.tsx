'use client';
import Address from '@/components/Address';
import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import useStore from '@/helper/store';
import { userPrivateService } from '@/services';
import { model } from '@/types/model';
import { Plus } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import React from 'react'

const AddressesPage = () => {
    const loading = false;
    const { userInfo, setUserInfo } = useStore();

    const initUser = async () => {
        const response = await userPrivateService.me();
        if (response && response.status === 200) {
            setUserInfo(response.data.user as model.IUser ?? null);
        }
    }

    if (!userInfo) return <div>Error loading addresses</div>

    return (
        <div className="bg-white max-w-5xl mx-auto px-4 5xl:px-0 py-2" >
            {loading ?
                < BreadcrumbShimmer count={2} />
                :
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/account">Account</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Address</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Link
                    href="/account/address/new"
                    className="text-gray-800 border-2 border-dashed border-gray-200 rounded-lg flex justify-center items-center aspect-[4/2] sm:aspect-square">
                    <div className="flex flex-col justify-center items-center">
                        <Plus size={32} />
                        <div>Add Address</div>
                    </div>
                </Link>
                {
                    userInfo.addresses.map((address) => (<div key={address._id} className="aspect-[4/2] sm:aspect-square">
                        <Address address={address} onDelete={initUser} />
                    </div>))
                }
            </div>
        </div >
    )
}

export default AddressesPage