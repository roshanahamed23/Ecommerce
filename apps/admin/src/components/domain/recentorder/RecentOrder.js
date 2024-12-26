import Tablebody from '@/components/building-blocks/Totalbody';
import Image from 'next/image';
import React from 'react';

const RecentOrder = ({ title, thead, body, page, receive }) => {
  return (
    <div className="w-full mt-5 relative overflow-x-auto">
      <h3 className="subtext">{title}</h3>
      <table className="w-full mt-5 text-left text-slate-600 text-sm rtl:text-right">
        <thead className="text-xs text-blue-700 bg-sky-200 uppercase">
          <tr>
            {thead?.map((item, index) => {
              return <th key={index}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {body?.map((item, index) => {
            return (
              <tr key={index} className='border border-gray-300'>
                <Tablebody
                  page={page}
                  item={item}
                  index={index}
                  categoryData={receive}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrder;
