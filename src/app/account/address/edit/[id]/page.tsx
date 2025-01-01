'use client';
import AddressForm, { IAddressForm } from '@/components/AddressForm'
import AddressFormShimmer from '@/components/AddressFormShimmer';
import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { userPrivateService } from '@/services';
import { model } from '@/types/model';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';

interface IAddresEditPageParams  {
  id: string;
  [key: string]: string;
}

const AddressEditPage = () => {
  const params = useParams<IAddresEditPageParams>();
  const addressID: string = params.id;
  const [loading, setLoading] = React.useState<boolean>(true);
  const [address, setAddress] = React.useState<model.IAddress | null>(null);

  const router = useRouter();

  const updateAddress = async (address: IAddressForm) => {
    const response = await userPrivateService.updateAddress({
      _id: addressID,
      ...address
    });
    if (response && response.status === 200) {
      toast.success("Address updated successfully");
      router.back();
    }
  }

  const onSubmit = async (data: IAddressForm) => {
    await updateAddress(data);
  }

  const initAddress = async () => {
    const response = await userPrivateService.getOneAddress(addressID);
    if (response && response.status === 200) {
      setAddress(response.data.address as model.IAddress ?? null);
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