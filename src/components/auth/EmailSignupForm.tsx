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
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    dob: string
}

const EmailSignupForm: React.FC<IEmailSignupFormProps> = ({ onLogin, onSubmit }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const { register, handleSubmit, formState: { errors },
        watch, } = useForm({
            defaultValues: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                dob: ''
            }
        });

    const confirmPassword = watch('confirmPassword');

    const onSubmitHandler: SubmitHandler<IEmailSignupForm> = async (data) => {
        setLoading(true);
        if (onSubmit) await onSubmit(data);
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="First name"
                    {...register('firstName', { required: 'First name is required' })}
                    disabled={loading}
                    className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>

            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Last name"
                    {...register('lastName', { required: 'Last name is required' })}
                    disabled={loading}
                    className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>

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
                    type="date"
                    placeholder="Date of birth"
                    disabled={loading}
                    {...register('dob', { required: 'Date of birth is required' })}
                    className={errors.dob ? "border-red-500" : ""}
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
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
                        validate: value => value === confirmPassword || 'Passwords do not match'
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