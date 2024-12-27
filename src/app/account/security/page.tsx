'use client';
import BreadcrumbShimmer from '@/components/BreadcrumbShimmer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import UpdatePasswordForm from '@/components/UpdatePasswordForm';
import useStore from '@/helper/store';
import { userPrivateService } from '@/services';
import { Barricade, Lock } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import React from 'react'

const SecurityPage = () => {
    const router = useRouter();
    const { userInfo } = useStore();
    const authenticating = false;
    const [loading, setLoading] = React.useState(false);
    const [updatePassword, setUpdatePassword] = React.useState(false);



    const onSubmit = async (data: any) => {
        const response = await userPrivateService.updatePassword({
            confirmPassword: data.confirm_password,
            password: data.new_password
        });

        if (response && response.status === 200) {
            setUpdatePassword(false);
        }
    }

    return (
        <>
            {userInfo ?
                <div className="bg-white max-w-3xl mx-auto px-4 3xl:px-0 mt-4">
                    <div className="mb-4 flex">
                        {loading ?
                            <BreadcrumbShimmer count={2} />
                            :
                            <Breadcrumb
                                routes={[
                                    {
                                        name: "Account",
                                        path: "/account",
                                    },
                                    {
                                        name: "Security",
                                        path: "/account/security",
                                    },
                                ]}
                            />
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

                    {updatePassword && <>
                        {/* <!-- <div className="mb-4">
                        <label htmlFor="current_password" className="block text-sm font-semibold mb-2"
                        >Current Password</label
                        >
                        <input
                            name="current_password"
                            type="password"
                            className="w-full py-3 px-4 block border-gray-200 rounded-lg text-sm outline-primary-500 border disabled:opacity-50 disabled:pointer-events-none"
                            bind:value={current_password}
                            placeholder="Current Password"
                        />
                    </div> --> */}
                        <UpdatePasswordForm  onSubmit={onSubmit}/>
                    </>
                    }
                </div>
                : !userInfo && authenticating ?
                    <div
                        className="bg-white max-w-3xl mx-auto px-4 3xl:px-0 mt-4 min-h-[calc(100vh-64px)] flex"
                    >
                        <div className="flex items-center justify-center grow">
                            <div className="flex flex-col items-center">
                                <Lock size={32} />
                                <div>Please wait while we log you in...</div>
                            </div>
                        </div>
                    </div>
                    :
                    <div
                        className="bg-white max-w-5xl mx-auto px-4 5xl:px-0 pt-4 min-h-[calc(100vh-64px)] flex"
                    >
                        <div className="flex items-center justify-center grow">
                            <div className="flex flex-col items-center">
                                <Barricade size={32} />
                                <div className="mb-4">Please login to view your account details</div>
                                <button
                                    className="w-full sm:w-fit hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                                    onClick={() => {
                                        router.push("/");
                                        // $login_signup_modal_open = true;
                                    }}>Continue to Login</button
                                >
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default SecurityPage