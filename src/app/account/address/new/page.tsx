'use client';
import AddressForm, { IAddressForm } from '@/components/AddressForm'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
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

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/account">Account</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/account/address">Address</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <AddressForm onSubmit={onSubmit} />
    </div>
  )
}

export default AddressNewPage