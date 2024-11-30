'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider } from 'react-query';
import { client } from '@/utils/queryclient';

export const Provider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const QueryProvider = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
