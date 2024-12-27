/* eslint-disable */
'use client';
import RecentOrder from '@/components/domain/recentorder/RecentOrder';
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { CircleX, Loader2 } from 'lucide-react';

const getOrders = async () => {
  try {
    const response = await axios.get('/api/orders');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const page = () => {
  const thead = ['Order id', 'Product detail', 'Quantity', 'Action'];
  const {
    data: Orders,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <Loader2 size={50} />
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center h-screen">
          <CircleX size={50} />
        </div>
      )}
      {isSuccess && (
        <RecentOrder
          title="Orders"
          thead={thead}
          body={Orders?.data}
          page="orders"
        />
      )}
    </div>
  );
};

export default page;
