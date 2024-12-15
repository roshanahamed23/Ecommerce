'use client';
import React, { useRef, useState } from 'react';
import axios from 'axios';

const Page = () => {
  const formref = useRef();
  const [error, setError] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();

    // Form Validation: Check if all fields are filled
    const formdata = new FormData(formref.current);
    const name = formdata.get('name');
    const email = formdata.get('email');
    const password = formdata.get('password');

    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      const result = await axios.post('/api/Customer', {
        name,
        email,
        password,
      });

      if (result.data.success) {
        setError(false); // Clear the error message on successful signup
        // Optionally reset the form
        formref.current.reset();
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
        <div className="flex flex-row gap-3 pb-4">
          <h1 className="text-3xl font-bold text-[#4B5563] my-auto">
            Welcome to city gold covering
          </h1>
        </div>
        <div className="text-sm font-light text-[#6B7280] pb-8">
          Sign up for an account on City Gold Covering.
        </div>
        {error && (
          <div className="text-lg animate-shake text-center mb-2 text-red-500">
            {error}
          </div>
        )}
        <form onSubmit={handleSignUp} ref={formref} className="flex flex-col">
          <div className="pb-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
              placeholder="Your Name"
              autoComplete="off"
            />
          </div>

          <div className="pb-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
              placeholder="name@company.com"
              autoComplete="off"
            />
          </div>

          <div className="pb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••••"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="w-full text-[#FFFFFF] bg-[#af135c] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
          >
            Sign Up
          </button>

          <div className="text-sm font-light text-[#6B7280]">
            Already have an account?{' '}
            <a
              href="/auth/signin"
              className="font-medium text-[#af135c] hover:underline"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
