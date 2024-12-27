'use client';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import { useForm } from 'react-hook-form';

interface IUpdatePasswordFormProps { 
    onSubmit?: (data: any) => void
}

const UpdatePasswordForm: React.FC<IUpdatePasswordFormProps> = ({ onSubmit }) => {
    const [loading, setLoading] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    // Watch the new password field to compare it with confirm password
    const newPassword = watch('new_password');

    const onSubmitHandler = async (data: any) => {
        setLoading(true);
        onSubmit && await onSubmit(data);
        setLoading(false);
    }


    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mb-4">
                <label htmlFor="new_password" className="block text-sm font-semibold mb-2">New Password</label>
                <input
                    type="password"
                    className={`w-full py-3 px-4 block border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 border ${errors.new_password ? 'border-red-500' : ''}`}
                    {...register('new_password', {
                        required: 'New Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                        maxLength: { value: 16, message: 'Password must be at most 16 characters' }
                    })}
                    disabled={loading}
                    placeholder="New Password"
                />
                {errors.new_password && <p className="text-red-500 text-xs mt-1">{errors.new_password.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="confirm_password" className="block text-sm font-semibold mb-2">Confirm Password</label>
                <input
                    type="password"
                    className={`w-full py-3 px-4 block border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 border ${errors.confirm_password ? 'border-red-500' : ''}`}
                    {...register('confirm_password', {
                        required: 'Confirm Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                        maxLength: { value: 16, message: 'Password must be at most 16 characters' },
                        validate: value => value === newPassword || 'Passwords do not match'
                    })}
                    disabled={loading}
                    placeholder="Confirm Password"
                />
                {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</p>}
            </div>
            <button
                disabled={loading}
                type='submit'
                className="w-full bg-primary-500 text-white py-3 px-4 flex justify-center border-gray-200 rounded-lg text-sm outline-primary-500 border disabled:opacity-50 disabled:pointer-events-none">
                {loading ? <CircleNotch size={24} weight="bold" className="animate-spin" /> : 'Update Password'}
            </button>
        </form>
    );
};

export default UpdatePasswordForm;
