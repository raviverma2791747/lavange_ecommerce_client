'use client';
import Breadcrumb from '@/components/ui/Breadcrumb';
import useStore from '@/helper/store';
import React from 'react'

const ProfilePage = () => {
    const { userInfo } = useStore();

    if (!userInfo) return <div>Error loading profile</div>

    return (
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
    )
}

export default ProfilePage