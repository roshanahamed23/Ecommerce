/* eslint-disable */
import React from 'react';

const OverviewCard = ({ title, price }) => {
  return (
    <div className="border border-sky-700 rounded-lg bg-sky-200 sm:px-8 px-4 sm:py-8 py-4">
      <h1 className="text-xl mb-3 md:text-3xl text-sky-700 font-bold">
        {title}
      </h1>
      <p className="text-lg md:text-xl font-medium">{price}</p>
    </div>
  );
};

export default OverviewCard;
