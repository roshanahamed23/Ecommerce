'use client';
import { signIn } from 'next-auth/react';
export const handlelogin = async () => {
  await signIn('google', { callbackUrl: '/' });
};
