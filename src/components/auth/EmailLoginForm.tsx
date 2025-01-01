'use client';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

interface IEmailLoginFormProps {
    onSubmit?: (data: IEmailLoginForm) => Promise<void>,
    onForgotPassword?: () => void
    onSignup?: () => void
}

export interface IEmailLoginForm {
    email: string,
    password: string
}

const EmailLoginForm: React.FC<IEmailLoginFormProps> = ({ onSubmit, onForgotPassword, onSignup }) => {
    const [loading, setLoading] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const onSubmitHandler: SubmitHandler<IEmailLoginForm> = async (data) => {
        setLoading(true);
        if (onSubmit) await onSubmit(data);
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mb-4">
                <input
                    type="email"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Email"
                    {...register('email', { required: 'Email is required' })}
                    disabled={loading}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
                <input
                    type="password"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Password"
                    {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' }, maxLength: { value: 16, message: 'Password must be at most 16 characters' } })}
                    disabled={loading}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="mb-4">
                <button
                    type='button'
                    className="text-sm text-primary-500 underline cursor-pointer"
                    onClick={() => {
                        if(onForgotPassword) onForgotPassword();
                    }}
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
                    onClick={() => {
                        if(onSignup) onSignup();
                    }}
                    disabled={loading}
                >Don&apos;t have an account?</button>
            </div>
        </form>
    )
}

export default EmailLoginForm