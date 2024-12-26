'use client';
import { signOut } from 'next-auth/react';
import CityGoldHero from '@/components/domain/layout/home page/Hero';
import React from 'react';
import Productslist from '@/components/building_block/Productslist';
import Productcard from '@/components/building_block/Productcard';

const page = () => {
  return (
    <>
      <CityGoldHero />
      <Productslist heading="New Arrival" category="will" />
    </>
  );
};

export default page;
