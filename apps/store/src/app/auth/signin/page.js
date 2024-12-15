'use client';
import React, { useRef, useState } from 'react';
import { signIn } from '../../../../auth';
import { useRouter } from 'next/navigation';
import { handlelogin, handleSignIn } from '@/utils/signin';
const Page = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5 items-center justify-center mt-4 bg-white p-10">
        <h1 className="text-3xl font-bold text-[#4B5563] my-auto">Login</h1>
        <button
          onClick={handlelogin}
          className="bg-white text-slate-600 font-medium shadow-xl p-4 border rounded-lg text-xl px-12"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Page;
