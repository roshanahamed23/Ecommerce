'use client';

import { eventSource } from '@/utils/connectsubscribe';
import { publishUserData } from '@/utils/redispublish';
import { register } from '@/utils/register';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function SignUp() {
  const formref = useRef();
  const Router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const udata = [];
  let eventSource;

  useEffect(() => {
    if (!window.EventSource) {
      console.error('EventSource is not supported in your browser.');
      return;
    }

    eventSource = new EventSource('/api/subscribe');

    eventSource.onopen = () => {
      console.log('Connected to SSE');
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        udata.push(data);
      } catch (error) {
        console.error('Error parsing event data:', error);
      }
    };

    eventSource.onerror = () => {
      console.error('Error in EventSource connection');
      setIsConnected(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(formref.current);
    await publishUserData({
      firstname: formdata.get('first_name'),
      lastname: formdata.get('last_name'),
      email: formdata.get('email'),
      password: formdata.get('password'),
    }).then(() => {});
    formref.current.reset();
  }
  return (
    <section className="bg-white m-auto border rounded-2xl shadow-lg">
      <div className="lg:grid min-h-screen">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to city gold covering
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>

            <form
              ref={formref}
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-xl max-sm:text-lg p-2 text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-xl max-sm:text-lg p-2 text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {' '}
                  Email{' '}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-xl max-sm:text-lg p-2 text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {' '}
                  Password{' '}
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-xl max-sm:text-lg p-2 text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline">
                    {' '}
                    terms and conditions{' '}
                  </a>
                  and
                  <a href="#" className="text-gray-700 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a href="/auth/signin" className="text-gray-700 underline">
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
