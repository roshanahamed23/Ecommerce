'use client';
import InventoryCard from '@/components/domain/inventory/InventoryCard';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const getInventory = async () => {
  const result = await axios.get('/api/inventory');
  return result.data;
};
const Page = () => {
  const {
    data: inventoryData,
    error,
    isLoading,
  } = useQuery('products', getInventory);

  return (
    <div className="w-full">
      <InventoryCard table={inventoryData?.data} />
    </div>
  );
};

export default Page;
