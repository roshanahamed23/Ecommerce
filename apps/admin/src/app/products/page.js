/* eslint-disable */
'use client';

import Button from '@/components/building-blocks/Button';
import OverviewCard from '@/components/building-blocks/OverviewCard';
import RecentOrder from '@/components/domain/recentorder/RecentOrder';
import { totalUploads } from '@/utils/totalUploads'; // Assuming this function fetches total uploads count
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

// Fetch the inventory data
const getListing = async () => {
  const response = await axios.get('/api/inventory');
  return response.data; // Ensure it returns the data you need
};

const Page = () => {
  const [total, setTotal] = useState(0);
  const thead = ['s.no', 'category', 'product title', 'stock', 'action'];

  // Fetch total uploads count
  useEffect(() => {
    const fetchTotalUploads = async () => {
      try {
        const len = await totalUploads(); // Ensure this is a promise that resolves with the count
        setTotal(len);
      } catch (error) {
        console.error('Error fetching total uploads:', error);
      }
    };

    fetchTotalUploads();
  }, []);

  // Use React Query for inventory listing
  const {
    data: inventoryData,
    error,
    isLoading,
  } = useQuery('products', getListing);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching inventory data</div>;
  }

  return (
    <div className="w-full">
      <Button text="Upload New Product" url="/products/add" />
      <h3 className="subtext mt-5">Overview</h3>
      <div className="mt-5">
        <OverviewCard title="Total Uploads" price={total} />
      </div>
      <div className="mt-5">
        <RecentOrder
          title="All Stock Listing"
          thead={thead}
          body={inventoryData.data}
          page="products"
        />
      </div>
    </div>
  );
};

export default Page;
