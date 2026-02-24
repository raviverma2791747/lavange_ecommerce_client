'use client';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"

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
        try {
            if (onSubmit) await onSubmit(data);
        } finally {
            setLoading(false);
        }
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

            <Button
                type="submit"
                className="mb-4 w-full"
                disabled={loading}
            >
                {loading ? <CircleNotch size={24} weight='bold' className="animate-spin" /> : 'Send Password Reset Link'}
            </Button>

            <div className="mb-4 flex justify-center">
                <Button
                    variant="link"
                    type='button'
                    className="px-0 text-primary-500 h-auto"
                    onClick={() => {
                        if (onLogin) onLogin();
                    }}
                >Remember password?</Button>
            </div>
        </form>
    )
}

export default ForgotPasswordForm
