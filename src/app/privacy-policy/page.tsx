import BreadcrumbShimmer from '@/components/BreadcrumbShimmer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { DATE_FORMAT } from '@/helper/constants'
import { formatDate } from '@/helper/utils'
import { policyConfigService } from '@/services'
import { model } from '@/types/model'
import React from 'react'

const PrivacyPolicyPage = async () => {
  let loading = true;
  const initPolicy = async () => {
    const response = await policyConfigService.getAll();
    if (response && response.status === 200) {
      const policies = response.data.policies as model.IPolicy[] ?? [];
      return  policies.find((policy) => policy.name === 'privacy-policy') ?? null;
    }
    return null;
  }

  const privacy_policy: model.IPolicy | null = await initPolicy();
  loading = false;

  if (!privacy_policy) return <div>Privacy Policy not found</div>;

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
                name: "Privacy Policy",
                path: `/privacy-policy`,
              },
            ]}
          />
          <div className="font-semibold mb-4">
            Last Updated {formatDate(
              privacy_policy.updatedAt,
              DATE_FORMAT
            )}
          </div>
          <div className="dynamic-html" dangerouslySetInnerHTML={{ __html: privacy_policy.description }}>
          </div>
        </>
      }
    </div>
  )
}

export default PrivacyPolicyPage