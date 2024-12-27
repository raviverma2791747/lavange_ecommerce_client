'use client';
import AddressForm from '@/components/AddressForm'
import AddressFormShimmer from '@/components/AddressFormShimmer';
import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { userPrivateService } from '@/services';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'



const AddressEditPage = () => {
  const params: any = useParams();
  const addressID: any = params.id;
  const [loading, setLoading] = React.useState(true);
  const [address, setAddress] = React.useState(null);

  const router = useRouter();

  const updateAddress = async (address: any) => {
    const response: any = await userPrivateService.updateAddress({
      _id: addressID,
      ...address
    });
    if (response && response.status === 200) {
      alert("Address Updated successfully");
      router.back();
    }
  }

  const onSubmit = async (data: any) => {
    await updateAddress(data);
  }

  const initAddress = async () => {

    const response: any = await userPrivateService.getOneAddress(addressID);
    if (response && response.status === 200) {
      setAddress(response.data.address ?? null);
    }
    setLoading(false);
  }


  useEffect(() => {
    initAddress();
  }, [])

  return (
    <div className="bg-white max-w-xl mx-auto px-4 xl:px-0 mb-24 pt-4">
      {loading ?
        < BreadcrumbShimmer count={3} />
        :
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
                name: "Edit",
                path: `/account/address/edit/${addressID}`,
              }
            ]}
        />
      }
      {
        loading ? <AddressFormShimmer /> : address ? <AddressForm defaultValues={address} onSubmit={onSubmit} /> : <p>Address not found</p>
      }
    </div>
  )
}

export default AddressEditPage