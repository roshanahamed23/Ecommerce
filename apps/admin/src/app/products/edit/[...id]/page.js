'use client';
import ProductForm from '@/components/building-blocks/ProductFom';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React from 'react';
import { useQuery } from 'react-query';

const singleproduct = async ({ queryKey }) => {
  const [_key, { id }] = queryKey;
  const result = await axios.get(`/api/inventory?id=${id}`);
  return result.data;
};

const page = () => {
  const { id } = useParams();
  const productid = id?.[0];

  const {
    data: productdetail,
    error,
    isLoading,
  } = useQuery(['products', { id: productid }], singleproduct, {
    enabled: !!id, // Only fetch when `id` is truthy
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });

  return (
    <div className="w-full">
      <ProductForm data={productdetail?.data} />
    </div>
  );
};

export default page;
