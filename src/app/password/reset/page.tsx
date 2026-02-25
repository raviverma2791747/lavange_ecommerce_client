'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { getApiErrorMessage, isApiSuccess } from '@/lib/api/response';
import { userService } from '@/services';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const token = searchParams.get('token') ?? searchParams.get('resetToken') ?? '';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IResetPasswordForm>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  const onSubmit: SubmitHandler<IResetPasswordForm> = async (data) => {
    if (!token) {
      toast.error('Invalid or missing reset token');
      return;
    }

    setLoading(true);
    try {
      const response = await userService.resetPassword({
        token,
        newPassword: data.newPassword,
      });

      if (isApiSuccess(response)) {
        toast.success('Password reset successful');
        router.replace('/login');
      } else {
        toast.error(getApiErrorMessage(response, 'Failed to reset password'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-md mx-auto px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-center">Reset Password</h1>
          <p className="text-sm text-gray-600 text-center mt-2">
            Set a new password for your account.
          </p>

          {!token ? (
            <div className="mt-6 text-center">
              <p className="text-sm text-red-600 mb-4">
                Reset token is missing or invalid.
              </p>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              <div className="mb-4">
                <Input
                  type="password"
                  placeholder="New Password"
                  {...register('newPassword', {
                    required: 'New password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    maxLength: {
                      value: 16,
                      message: 'Password must be at most 16 characters',
                    },
                  })}
                  disabled={loading}
                  className={errors.newPassword ? 'border-red-500' : ''}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: (value) => value === newPassword || 'Passwords do not match',
                  })}
                  disabled={loading}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? (
                  <CircleNotch weight="bold" size={20} className="animate-spin" />
                ) : (
                  'Reset Password'
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
