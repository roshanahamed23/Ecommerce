'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react';

import React from 'react'
const client = new QueryClient();

const Provider = ({children}) => {
  return (
    <SessionProvider>
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
    </SessionProvider>
  )
}

export default Provider