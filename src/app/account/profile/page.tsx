'use client';
import Breadcrumb from '@/components/ui/Breadcrumb';
import useStore from '@/helper/store';
import { Barricade, Lock } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import React from 'react'

const ProfilePage = () => {
    const router = useRouter();
    const { userInfo } = useStore();
    const authenticating = false;



    return (
        <>
            {userInfo ?
                < div className="bg-white max-w-5xl mx-auto px-4 5xl:px-0 mt-4" >
                    <Breadcrumb
                        routes={[
                            {
                                name: "Account",
                                path: "/account",
                            },
                            {
                                name: "Profile",
                                path: "/account/profile",
                            },
                        ]}
                    />
                    <div className="mb-4">
                        <div className="font-semibold">First Name</div>
                        <div>
                            {userInfo.firstName}
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="font-semibold">Last Name</div>
                        <div>
                            {userInfo.lastName}
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="font-semibold">Email</div>
                        <div>
                            {userInfo.email}
                        </div>
                    </div>
                </div >
                : !userInfo && authenticating ?
                    < div
                        className="bg-white max-w-5xl mx-auto px-4 5xl:px-0 mt-4 min-h-[calc(100vh-64px)] flex"
                    >
                        <div className="flex items-center justify-center grow">
                            <div className="flex flex-col items-center">
                                <Lock size={32} />
                                <div>Please wait while we log you in...</div>
                            </div>
                        </div>
                    </div >
                    :
                    < div
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
                                    }}>Continue to Login</button>
                            </div>
                        </div>
                    </div >
            }
        </>
    )
}

export default ProfilePage