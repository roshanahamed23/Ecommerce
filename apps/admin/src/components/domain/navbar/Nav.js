'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const activelink = 'text-sky-200 underline';

  return (
    <aside className="bg-blue-700 min-h-screen p-4 flex flex-col gap-4">
      <div>
        <Link href="/">
          <p
            className={`text-white text-2xl flex ${pathname === '/dashboard' ? activelink : ''}`}
          >
            Dashboard
          </p>
        </Link>
      </div>
      <div className="flex flex-col gap-2 p-2 items-end pr-0">
        <Link href="/orders">
          <p
            className={`text-white text-2xl flex ${pathname === '/orders' ? activelink : ''}`}
          >
            Orders
          </p>
        </Link>
        <Link href="/products">
          <p
            className={`text-white text-2xl flex ${pathname === '/products' ? activelink : ''}`}
          >
            Products
          </p>
        </Link>
        <Link href="/inventory">
          <p
            className={`text-white text-2xl flex ${pathname === '/inventory' ? activelink : ''}`}
          >
            Inventory
          </p>
        </Link>
        <Link href="/users">
          <p
            className={`text-white text-2xl flex ${pathname === '/users' ? activelink : ''}`}
          >
            Users
          </p>
        </Link>
        <Link href="/category">
          <p
            className={`text-white text-2xl flex ${pathname === '/catalog' ? activelink : ''}`}
          >
            Category
          </p>
        </Link>
      </div>
    </aside>
  );
}
