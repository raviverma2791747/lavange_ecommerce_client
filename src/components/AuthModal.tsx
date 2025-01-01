'use client';
import React, { useEffect } from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import * as Separator from "@radix-ui/react-separator";
import { X } from '@phosphor-icons/react/dist/ssr';
import useStore from '@/helper/store';
import EmailAuth from './auth/EmailAuth';
import Link from 'next/link';
import { PUBLIC_API_URL } from '@/secrets';

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
    },[])

    return (
        <Dialog.Root
            open={authModal}
        // bind:open={$login_signup_modal_open}
        // preventScroll={true}
        // closeOnOutsideClick={false}
        >
            <Dialog.Portal>
                <Dialog.Overlay
                    // transition={fade}
                    // transitionConfig={{ duration: 150 }}
                    className="fixed inset-0 z-50 bg-black/80"
                />
                <Dialog.Content
                    className="bg-white fixed left-[50%] top-[50%] z-[150] w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-background p-5 shadow-popover outline-none sm:max-w-[490px] md:w-full"
                >
                    <Dialog.Title
                        className="flex w-full items-center justify-center text-lg font-semibold tracking-tight">
                        Please Login To Continue</Dialog.Title>
                    <Separator.Root className="-mx-5 mb-4 mt-2 block h-px bg-gray-200" />
                    <Dialog.Description className="">
                        {
                            AUTH_MODE.EMAIL === selectedAuthMode && <EmailAuth />
                        }
                        <div className="text-center mb-4">or</div>
                        <div className="flex flex-col gap-4">
                            <Link
                                className="w-full hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-50 disabled:opacity-50 disabled:pointer-events-none"
                                href={`${PUBLIC_API_URL}/public/user/auth/google?redirect_uri=${href}`}
                            >
                                <img src="/assets/images/google_logo.svg" alt="" className='aspect-square w-6' />
                                Continue with Google
                            </Link>
                        </div>
                    </Dialog.Description>

                    <Dialog.Close
                        className="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
                        onClick={() => setAuthModal(false)}
                    >
                        <X size={24} />
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
