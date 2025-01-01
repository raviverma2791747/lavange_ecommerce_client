'use client';
import AddressForm, { IAddressForm } from '@/components/AddressForm'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { userPrivateService } from '@/services'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

const AddressNewPage = () => {
  const router = useRouter();

  const updateAddress = async (address: IAddressForm) => {
    const response = await userPrivateService.updateAddress(address);
    if (response && response.status === 200) {
      toast.success("Address added successfully");
      router.back();
    }
  }
  
  const onSubmit = async (data: IAddressForm) => {
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