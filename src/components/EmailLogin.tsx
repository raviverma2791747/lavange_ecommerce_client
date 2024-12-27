'use client';
import useStore from '@/helper/store';
import { userPrivateService, userService } from '@/services';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

const EmailLogin = () => {
    const { setUserInfo, setAuthModal } = useStore();
    const [loading, setLoading] = React.useState(false);
    const { register, handleSubmit } = useForm();


    const initUser = async () => {
        const response: any = await userPrivateService.me();
        if (response && response.status === 200) {
            setUserInfo(response.data.user ?? null);
        }
    }

    const onSubmit: SubmitHandler<any> = async (data) => {
        setLoading(true);
        const response: any = await userService.login({ username: data.email, password: data.password });
        if (response && response.status === 200) {
            initUser();
            setAuthModal(false);
        }
        setLoading(false);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <input
                    type="email"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Email"
                    {...register('email')}
                    disabled={loading}
                />
            </div>

            <div className="mb-4">
                <input
                    type="password"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Password"
                    {...register('password')}
                    disabled={loading}
                />
            </div>

            <div className="mb-4">
                <button
                    type='button'
                    className="text-sm text-primary-500 underline cursor-pointer"
                    // on:click={() => {
                    //     state = STATE.FORGOT_PASSWORD;
                    // }}
                    disabled={loading}
                >Forgot password?
                </button>
            </div>

            <div
                id="h-captcha"
                className="h-captcha mb-4"
            // data-sitekey={PUBLIC_HCAPTCHA_SITE_KEY}
            ></div>

            <button
                type='submit'
                className="mb-4 w-full hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                disabled={loading}
            >
                {
                    loading ? <CircleNotch className='animate-spin' size={24} weight='bold' /> : "Login"
                }

            </button>

            <div className="mb-4">
                <button
                    type='button'
                    className="text-sm text-primary-500 underline cursor-pointer"
                    // on:click={() => {
                    //     state = STATE.SIGNUP;
                    // }}
                    disabled={loading}
                >Dont' have an account?</button>
            </div>
        </form>
    )
}

export default EmailLogin