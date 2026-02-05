import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { DATE_FORMAT } from '@/helper/constants';
import { formatDate } from '@/helper/utils';
import { policyConfigService } from '@/services';
import { model } from '@/types/model';
import React from 'react'

const DeliveryAndReturnPolicyPage = async () => {
  let loading = true;

  const initPolicy = async () => {
    const response = await policyConfigService.getAll();
    if (response && response.status === 200) {
      const policies = response.data.policies as model.IPolicy[] ?? [];
      loading = false;
      return policies.find((policy) => policy.name === 'shipping-and-return-policy') ?? null;
    }
    loading = false;
    return null;
  }

  const shipping_and_return_policy: model.IPolicy | null = await initPolicy();

  if (!shipping_and_return_policy) return <div>Delivery And Return Policy not found</div>;

  return (
    <div
      className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 py-4 min-h-[calc(100vh-64px)] flex flex-col"
    >
      {loading ?
        <BreadcrumbShimmer count={2} /> :
        <>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Delivery and Return Policy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="font-semibold mb-4">
            Last Updated {formatDate(
              shipping_and_return_policy.updatedAt,
              DATE_FORMAT
            )}
          </div>
          <div className="dynamic-html" dangerouslySetInnerHTML={{ __html: shipping_and_return_policy.description }}>
          </div>
        </>
      }
    </div>
  )
}

export default DeliveryAndReturnPolicyPage