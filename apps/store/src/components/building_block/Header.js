'use client';
import Image from 'next/image';
import React from 'react';
import { logo, cart } from '../../../public';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getCartsdetail } from '@/utils/queryfunction';
import { useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  const {
    data: carts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['carts', { id: session?.user?.id }],
    queryFn: () => getCartsdetail(session?.user?.id),
    enabled: !!session?.user?.id,
  });
  return (
    <header className="bg-primary-brown dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a
              className="block text-primary-saf dark:text-primary-saf"
              href="#"
            >
              <Image
                src={logo}
                alt="city gold covering"
                width={70}
                height={70}
              />
            </a>
          </div>

          <div className="hidden md:block">
            <form className="flex flex-row border-primary-darbar shadow-sm h-12">
              <input
                type="text"
                placeholder="Search..."
                className="p-4 rounded-lg active:border-white rounded-r-none text-primary-darbar border w-96 border-r-0 shadow-sm"
              />
              <button
                type="submit"
                className="p-3 bg-primary-saf text-primary-brown rounded-lg rounded-l-none"
              >
                search
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="rounded-md bg-primary-saf px-5 py-2.5 text-sm font-medium text-primary-brown shadow dark:hover:bg-teal-500"
                href="/auth/signin"
              >
                Login
              </a>

              <div className="hidden sm:flex">
                <a
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary-saf dark:bg-gray-800 dark:text-primary-saf dark:hover:text-primary-saf/75"
                  href="/auth/signup"
                >
                  Register
                </a>
              </div>
            </div>

            <Link href="/Add_to_Cart">
              <div className="relative md:flex border border-primary-saf bg-primary-saf bg-opacity-30 p-2 rounded-full ">
                <div className="bg-primary-darbar text-white rounded-full flex items-center justify-center text-xs p-auto absolute top-0 right-0 left-10 w-6 h-4">
                  {carts?.data?.length || 0}
                </div>
                <Image
                  src={cart}
                  className=""
                  alt="Cart"
                  width={30}
                  height={30}
                />
              </div>
            </Link>

            <div className="block md:hidden">
              <button className="rounded bg-primary-brown p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-primary-saf dark:hover:text-primary-saf/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center m-2 w-full justify-center">
          <nav className="">
            <ul className="flex flex-row gap-44">
              <a href="/">
                <li className="semi-head">Home</li>
              </a>

              <a href="/">
                <li className="semi-head">store</li>
              </a>

              <a href="/">
                <li className="semi-head">category</li>
              </a>

              <a href="/">
                <li className="semi-head">account</li>
              </a>

              <a href="/">
                <li className="semi-head">wishlist</li>
              </a>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
