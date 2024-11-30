'use client';
import Chart from '@/components/domain/chart/Chart';
import Overview from '@/components/domain/overview/Overview';
import RecentOrder from '@/components/domain/recentorder/RecentOrder';
import React from 'react';

const Home = () => {
  const thead = ['Order_id', 'ordered by', 'product detail', 'quantity'];
  return (
    <div className="m-0 p-0 w-full">
      <Overview />
      <Chart />
      <RecentOrder title="Recent Order" thead={thead} />
    </div>
  );
};

export default Home;
