'use client';
import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import UpdatePasswordForm, { IUpdatePasswordForm } from '@/components/UpdatePasswordForm';
import { userPrivateService } from '@/services';
import React from 'react'

const SecurityPage = () => {
    const loading = false;
    const [updatePassword, setUpdatePassword] = React.useState<boolean>(false);

    const onSubmit = async (data: IUpdatePasswordForm) => {
        const response = await userPrivateService.updatePassword({
            confirmPassword: data.confirm_password,
            password: data.new_password
        });

        if (response && response.status === 200) {
            setUpdatePassword(false);
        }
    }

    return (
        <div className="bg-white max-w-3xl mx-auto px-4 3xl:px-0 mt-4">
            <div className="mb-4 flex">
                {loading ?
                    <BreadcrumbShimmer count={2} />
                    :
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/account">Account</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Security</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                }
            </div>

            <div className="mb-4 flex justify-between">
                <div className="font-semibold">Password</div>
                <button
                    onClick={() => {
                        setUpdatePassword(!updatePassword);
                        if (!updatePassword) {
                            // current_password = "";
                            // new_password = "";
                            // confirm_password = "";
                        }
                    }}
                    className="text-primary-500 underline cursor-pointer"
                >
                    {updatePassword ? "Cancel" : "Update"}
                </button>
            </div>

            {updatePassword && <UpdatePasswordForm onSubmit={onSubmit} />}
        </div>
    )
}

export default SecurityPage