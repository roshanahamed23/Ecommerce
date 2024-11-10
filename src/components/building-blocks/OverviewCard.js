import React from 'react';

const OverviewCard = ({ title, price }) => {
  return (
    <div className="border border-sky-700 flex flex-col gap-3 p-4 rounded-lg bg-sky-200 box-content w-auto">
      <h1 className="text-xl md:text-3xl text-sky-700 font-bold">{title}</h1>
      <p className="text-lg md:text-xl font-medium">{price}</p>
    </div>
  );
};

export default OverviewCard;
