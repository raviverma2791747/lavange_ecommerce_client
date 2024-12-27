'use client';
import AddressForm from '@/components/AddressForm'
import BreadcrumbShimmer from '@/components/BreadcrumbShimmer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { userPrivateService } from '@/services'
import { useRouter } from 'next/navigation';
import React from 'react'

const AddressNewPage = () => {
  const router = useRouter();

  const updateAddress = async (address: any) => {
    const response: any = await userPrivateService.updateAddress(address);
    if (response && response.status === 200) {
      alert("Address added successfully");
      router.back();
    }
  }
  
  const onSubmit = async (data: any) => {
    await updateAddress(data);
  }

  return (
    <div className="bg-white max-w-xl mx-auto px-4 xl:px-0 mb-24 pt-4">

      <Breadcrumb
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
            {
              name: "New",
              path: `/account/address/new`,
            }
          ]}
      />

      <AddressForm onSubmit={onSubmit} />
    </div>
  )
}

export default AddressNewPage