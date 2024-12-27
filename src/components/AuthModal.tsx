'use client';
import React from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import * as Separator from "@radix-ui/react-separator";
import { X } from '@phosphor-icons/react/dist/ssr';
import EmailLogin from './EmailLogin';
import ForgotPassword from './ForgotPassword';
import SignupSuccess from './SignupSuccess';
import useStore from '@/helper/store';

const AUTH_MODE = {
    // PHONE: "PHONE",
    EMAIL: "EMAIL",
    GOOGLE: "GOOGLE",
    FACEBOOK: "FACEBOOK",
};

export const AuthModal = () => {
    const { authModal, setAuthModal } = useStore();

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
                        <EmailLogin />
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
