import OverviewCard from '@/components/building-blocks/OverviewCard';
import React from 'react';

const Overview = () => {
  const data = [
    {
      title: 'Total Orders',
      price: '240',
    },
    {
      title: 'Total Views',
      price: '240',
    },
    {
      title: 'Out of Stocks',
      price: '240',
    },
    {
      title: 'Stock Listings',
      price: '240',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="subtext">Overview Details</h3>
      <div className="flex gap-2">
        {data.map((item, index) => (
          <OverviewCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Overview;
