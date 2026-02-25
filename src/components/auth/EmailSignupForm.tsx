'use client';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"

interface IEmailSignupFormProps {
    onLogin?: () => void,
    onSubmit?: (data: IEmailSignupForm) => Promise<void>
}

export interface IEmailSignupForm {
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string
}

const EmailSignupForm: React.FC<IEmailSignupFormProps> = ({ onLogin, onSubmit }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const { register, handleSubmit, formState: { errors },
        watch, } = useForm({
            defaultValues: {
                email: '',
                phoneNumber: '',
                password: '',
                confirmPassword: ''
            }
        });

    const password = watch('password');

    const onSubmitHandler: SubmitHandler<IEmailSignupForm> = async (data) => {
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

            <div className="mb-4">
                <Input
                    type="tel"
                    placeholder="Phone Number"
                    disabled={loading}
                    {...register('phoneNumber', {
                        required: 'Phone Number is required',
                        pattern: {
                            value: /^[0-9]{10,15}$/,
                            message: 'Phone Number must be 10 to 15 digits'
                        }
                    })}
                    className={errors.phoneNumber ? "border-red-500" : ""}
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
            </div>

            <div className="mb-4">
                <Input
                    type="password"
                    placeholder="Password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                        maxLength: { value: 16, message: 'Password must be at most 16 characters' }
                    })}
                    disabled={loading}
                    className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="mb-4">
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        minLength: { value: 8, message: 'Confirm Password must be at least 8 characters' },
                        maxLength: { value: 16, message: 'ConfirmPassword must be at most 16 characters' },
                        validate: value => value === password || 'Passwords do not match'
                    })}
                    disabled={loading}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <Button
                className="mb-4 w-full"
                disabled={loading}
                type='submit'
            >
                {loading ? <CircleNotch weight='bold' size={24} className="animate-spin" /> : "Sign Up"}
            </Button>

            <div className="mb-4 flex justify-center">
                <Button
                    variant="link"
                    type='button'
                    className="px-0 text-primary-500 h-auto"
                    onClick={() => {
                        if (onLogin) onLogin();
                    }}
                >Already have an account?</Button>
            </div>
        </form>
    )
}

export default EmailSignupForm
