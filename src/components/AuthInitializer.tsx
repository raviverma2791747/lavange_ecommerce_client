'use client';

import { useAuth } from '@/hooks/use-auth';
import { useEffect, useRef } from 'react';

const AuthInitializer = () => {
  const { hydrateSession } = useAuth();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    hydrateSession();
  }, [hydrateSession]);

  return null;
};

export default AuthInitializer;
