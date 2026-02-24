'use client';

import EmailAuth from '@/components/auth/EmailAuth';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/separator';
import useStore from '@/helper/store';
import { cn } from '@/lib/utils';
import { PUBLIC_API_URL } from '@/secrets';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const DEFAULT_REDIRECT = '/account';

const sanitizeRedirect = (value: string | null) => {
  if (!value || !value.startsWith('/')) return DEFAULT_REDIRECT;
  return value;
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userInfo, authenticating } = useStore();
  const [origin, setOrigin] = useState('');

  const redirectPath = useMemo(
    () => sanitizeRedirect(searchParams.get('redirect')),
    [searchParams],
  );

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (!authenticating && userInfo) {
      router.replace(redirectPath);
    }
  }, [authenticating, redirectPath, router, userInfo]);

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-md mx-auto px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-center">Welcome Back</h1>
          <p className="text-sm text-gray-600 text-center mt-2">
            Login to access your account and orders.
          </p>

          <Separator className="my-5" />

          <EmailAuth onLoginSuccess={() => router.replace(redirectPath)} />

          <div className="text-center mb-4 mt-4 text-sm text-gray-500">or</div>
          <Link
            className={cn(buttonVariants({ variant: 'outline' }), 'w-full gap-x-2 py-6')}
            href={`${PUBLIC_API_URL}/public/user/auth/google?redirect_uri=${origin}${redirectPath}`}
          >
            <img src="/assets/images/google_logo.svg" alt="" className="aspect-square w-6" />
            Continue with Google
          </Link>
        </div>

        <Button
          variant="link"
          className="mt-4 w-full text-gray-600"
          onClick={() => router.push('/')}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
