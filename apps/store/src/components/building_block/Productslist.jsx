'use client';

import React from 'react';
import Productcard from './Productcard';
import { useQuery } from '@tanstack/react-query';
import { productfetch } from '@/utils/queryfunction';
import Link from 'next/link';

const Productslist = ({ heading, category }) => {
    const {
        data: Products,
        isLoading,
        error,
      } = useQuery({
        queryKey: ['product', { category }],
        queryFn: productfetch,
      });
      
  console.log(Products)
  if (isLoading) {
    return <div>Loading...</div>; // Add a better loading state if needed
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display the error message
  }

  return (
    <div className="flex flex-col gap-2 mt-4 bg-orange-50">
      <div className='flex justify-center items-center gap-4'>
        <h2 className="font-bold text-2xl text-center  text-primary-saf p-4">{heading}</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {Products?.data.map((item, index) => {
         if(item.category_id?.name === category){
          return (<Productcard
            key={index}
            id={item._id}
            name={item.name}
            image={item.image[0]}
            price={item.price}
            category={item.category_id?.name} 
          />)
         }
})}
      </div>
    </div>
  );
};

export default Productslist;
