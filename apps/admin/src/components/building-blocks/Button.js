import Link from 'next/link';
import React from 'react';

const Button = ({ text, url }) => {
  return (
    <Link href={url}>
      <button className="px-6 py-3 bg-blue-700 font-semibold text-white border-none outline-none text-secondary text-[1rem] rounded-md active:scale-[0.9] transition-all duration-300">
        {text}
      </button>
    </Link>
  );
};

export default Button;
