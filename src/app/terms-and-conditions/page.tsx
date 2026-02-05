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


const TermsAndConditionsPage = async () => {
  let loading = true;
  const initPolicy = async () => {
    const response = await policyConfigService.getAll();
    if (response && response.status === 200) {
      const policies = response.data.policies as model.IPolicy[] ?? [];
      return policies.find((policy) => policy.name === 'terms-and-conditions') ?? null;
    }
    return null;
  }

  const terms_and_conditions: model.IPolicy | null = await initPolicy();
  loading = false;

  if (!terms_and_conditions) return <div>Delivery And Return Policy not found</div>;

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
                <BreadcrumbPage>Terms and Conditions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="font-semibold mb-4">
            Last Updated {formatDate(
              terms_and_conditions.updatedAt,
              DATE_FORMAT
            )}
          </div>
          <div className="dynamic-html" dangerouslySetInnerHTML={{ __html: terms_and_conditions.description }}>
          </div>
        </>
      }
    </div>
  )
}

export default TermsAndConditionsPage