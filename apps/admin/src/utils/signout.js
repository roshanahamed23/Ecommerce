'use server';

import { signOut } from 'next-auth/react';
export async function handlelogout() {
  await signOut('credentials');
}