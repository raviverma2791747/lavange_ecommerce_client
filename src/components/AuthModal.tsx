'use client';
import React, { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import useStore from '@/helper/store';
import EmailAuth from './auth/EmailAuth';
import Link from 'next/link';
import { PUBLIC_API_URL } from '@/secrets';
import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const AUTH_MODE = {
    // PHONE: "PHONE",
    EMAIL: "EMAIL",
    GOOGLE: "GOOGLE",
    FACEBOOK: "FACEBOOK",
};

export const AuthModal = () => {
    const selectedAuthMode = AUTH_MODE.EMAIL;
    const [href, setHref] = React.useState<string>("");
    const { authModal, setAuthModal } = useStore();

    useEffect(() => {
        setHref(window.location.href);
    }, [])

    return (
        <Dialog open={authModal} onOpenChange={setAuthModal}>
            <DialogContent className="sm:max-w-[490px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Please Login To Continue</DialogTitle>
                </DialogHeader>
                <Separator className="my-4" />
                <div className="">
                    {
                        AUTH_MODE.EMAIL === selectedAuthMode && <EmailAuth />
                    }
                    <div className="text-center mb-4 mt-4 text-sm text-gray-500">or</div>
                    <div className="flex flex-col gap-4">
                        <Link
                            className={cn(buttonVariants({ variant: "outline" }), "w-full gap-x-2 py-6")}
                            href={`${PUBLIC_API_URL}/public/user/auth/google?redirect_uri=${href}`}
                        >
                            <img src="/assets/images/google_logo.svg" alt="" className='aspect-square w-6' />
                            Continue with Google
                        </Link>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
