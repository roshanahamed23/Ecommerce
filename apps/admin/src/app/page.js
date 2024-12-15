'use client';
import Chart from '@/components/domain/chart/Chart';
import Overview from '@/components/domain/overview/Overview';
import RecentOrder from '@/components/domain/recentorder/RecentOrder';
import { handlelogout } from '@/utils/signout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const thead = ['Order_id', 'ordered by', 'product detail', 'quantity'];

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, []);

  return (
    <div className="m-0 p-0 w-full">
      <div>
        <button onClick={handlelogout}>sign out</button>
      </div>
      <Overview />
      <Chart />
      <RecentOrder title="Recent Order" thead={thead} />
    </div>
  );
};

export default Home;
