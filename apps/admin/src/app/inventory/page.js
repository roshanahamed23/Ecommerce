'use client';
import InventoryCard from '@/components/domain/inventory/InventoryCard';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useQuery } from 'react-query';
import { CircleX } from 'lucide-react';

const getInventory = async () => {
  const result = await axios.get('/api/inventory');
  return result.data;
};
const Page = () => {
  const {
    data: inventoryData,
    isError,
    isLoading,
    isSuccess,
  } = useQuery('products', getInventory);

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
      {isSuccess && <InventoryCard table={inventoryData?.data} />}
    </div>
  );
};

export default Page;
