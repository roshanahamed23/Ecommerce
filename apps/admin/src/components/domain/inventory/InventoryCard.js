/* eslint-disable */
'use client';
import React, { useEffect, useState } from 'react';
import RecentOrder from '../recentorder/RecentOrder';

const InventoryCard = ({ table }) => {
  const thead = ['product_id', 'category', 'product title', 'stock'];
  const [active, setActive] = useState('all_stock');
  const activelink = 'border-[2px] bg-green-200 font-semibold text-blue-500';
  const [Listings, setListings] = useState([]);

  useEffect(() => {
    if (active === 'all_stock') {
      setListings(table);
    } else if (active === 'out_of_stock') {
      setListings(() => table?.filter((item) => item.stock === 0));
    } else if (active === 'low_stock') {
      setListings(() =>
        table?.filter((item) => (item.stock < 5) & (item.stock > 0))
      );
    }
  }, [active, table]);

  return (
    <div className="">
      <div className="flex gap-1">
        <div
          className={`px-4 py-2 bg-sky-200 border-blue-400 border-r-2 text-blue-700 ${active === 'all_stock' ? activelink : ''}`}
        >
          <button onClick={() => setActive('all_stock')}>All Stock</button>
        </div>
        <div
          className={`px-4 py-2 bg-sky-200 border-blue-400 border-r-2 text-blue-700 ${active === 'out_of_stock' ? activelink : ''}`}
        >
          <button onClick={() => setActive('out_of_stock')}>
            Out Of Stock
          </button>
        </div>
        <div
          className={`px-4 py-2 bg-sky-200 border-blue-400 text-blue-700 ${active === 'low_stock' ? activelink : ''}`}
        >
          <button onClick={() => setActive('low_stock')}>Low Stock</button>
        </div>
      </div>

      <div>
        <RecentOrder
          title="Stock Listings"
          thead={thead}
          body={Listings}
          page="inventory"
        />
      </div>
    </div>
  );
};

export default InventoryCard;
