'use client';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface ForgotPasswordFormProps {
    onLogin?: () => void,
    onSubmit?: (data: IForgotPasswordForm) => Promise<void>
}

export interface IForgotPasswordForm {
    email: string
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onLogin, onSubmit }) => {
    const [loading, setLoading] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
        }
    });


    const onSubmitHandler: SubmitHandler<IForgotPasswordForm> = async (data) => {
        setLoading(true);
        if(onSubmit) await onSubmit(data);
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

            <button
                type="submit"
                className="mb-4 w-full hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                disabled={loading}
            >
                {loading ? <CircleNotch size={24} weight='bold' className="animate-spin" /> : 'Send Password Reset Link'}
            </button>

            <div className="mb-4">
                <button
                    type='button'
                    className="text-sm text-primary-500 underline cursor-pointer"
                    onClick={() => {
                        if(onLogin) onLogin();
                    }}
                >Remember password?</button>
            </div>
        </form>
    )
}

export default ForgotPasswordForm