'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
const Productcard = ({image,name,category,price,id}) => {
  return (
	<Link href={`/product/${id}`}>
    <div className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
	<Image src={image} alt="" width={300} height={300} className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500 transform transition-transform hover:scale-110 duration-300" />
	<div className="mt-6 mb-2">
		<span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">{category}</span>
		<h2 className="text-xl text-primary-darbar font-semibold whitespace-nowrap overflow-hidden text-ellipsis tracking-wide">{name}</h2>
	</div>
	<p className="dark:text-gray-800 text-primary-saf text-xl font-bold">
		<span className='text-gray-500 text-lg font-normal line-through mr-2'>₹{price+300}</span>
		₹{price}</p>
	</div>
</Link>
  )
}

export default Productcard