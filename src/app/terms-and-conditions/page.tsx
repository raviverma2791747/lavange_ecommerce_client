import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { DATE_FORMAT } from '@/helper/constants';
import { formatDate } from '@/helper/utils';
import { policyConfigService } from '@/services';
import React from 'react'

const TermsAndConditionsPage = async () => {
  let loading = true;
  let terms_and_conditions: any = null;
  const initPolicy = async () => {
    const response = await policyConfigService.getAll();
    if (response && response.status === 200) {
      const policies = response.data.policies as [] ?? [];
      terms_and_conditions = policies.find((policy: any) => policy.name === 'terms-and-conditions');
    }
    loading = false;
  }

  await initPolicy();

  if (!terms_and_conditions) return <div>Delivery And Return Policy not found</div>;

  return (
    <div
      className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 py-4 min-h-[calc(100vh-64px)] flex flex-col"
    >
      {loading ?
        <BreadcrumbShimmer count={2} /> :
        <>
          <Breadcrumb
            routes={[
              {
                name: "Home",
                path: "/",
              },
              {
                name: "Terms & Conditions",
                path: `/terms-and-conditions`,
              },
            ]}
          />
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