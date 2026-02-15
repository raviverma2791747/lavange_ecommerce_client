'use client';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"

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
                <Input
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: 'Email is required' })}
                    disabled={loading}
                    className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
                <Input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' }, maxLength: { value: 16, message: 'Password must be at most 16 characters' } })}
                    disabled={loading}
                    className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="mb-4 flex justify-end">
                <Button
                    variant="link"
                    type='button'
                    className="px-0 text-primary-500 h-auto"
                    onClick={() => {
                        if (onForgotPassword) onForgotPassword();
                    }}
                    disabled={loading}
                >Forgot password?
                </Button>
            </div>

            <div
                id="h-captcha"
                className="h-captcha mb-4"
            // data-sitekey={PUBLIC_HCAPTCHA_SITE_KEY}
            ></div>

            <Button
                type='submit'
                className="mb-4 w-full"
                disabled={loading}
            >
                {
                    loading ? <CircleNotch className='animate-spin' size={24} weight='bold' /> : "Login"
                }

            </Button>

            <div className="mb-4 flex justify-center">
                <Button
                    variant="link"
                    type='button'
                    className="px-0 text-primary-500 h-auto"
                    onClick={() => {
                        if (onSignup) onSignup();
                    }}
                    disabled={loading}
                >Don&apos;t have an account?</Button>
            </div>
        </form>
    )
}

export default EmailLoginForm