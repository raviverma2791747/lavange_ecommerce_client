'use client';
import React from 'react'
import useStore from "@/helper/store";
import { Barricade, Lock } from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter } from "next/navigation";

interface IProtectedProps {
    children: React.ReactNode;
}
const Protected: React.FC<IProtectedProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { userInfo, authenticating } = useStore();

    if (userInfo) return <>{children}</>

    if (authenticating) return < div
        className="bg-white max-w-5xl mx-auto px-4 5xl:px-0 py-2 min-h-[calc(100vh-64px)] flex"
    >
        <div className="flex items-center justify-center grow">
            <div className="flex flex-col items-center">
                <Lock size={32} />
                <div>Please wait while we log you in...</div>
            </div>
        </div>
    </div >

    return (
        <div
            className="bg-white max-w-5xl mx-auto px-4 5xl:px-0 pt-4 min-h-[calc(100vh-64px)] flex">
            <div className="flex items-center justify-center grow">
                <div className="flex flex-col items-center">
                    <Barricade size={32} />
                    <div className="mb-4">Please login to view your account details</div>
                    <button
                        className="w-full sm:w-fit hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => {
                            router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
                        }}>Continue to Login</button>
                </div>
            </div>
        </div>
    )
}

export default Protected
