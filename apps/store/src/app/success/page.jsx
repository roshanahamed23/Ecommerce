import React from 'react'
import { CircleCheckBig } from 'lucide-react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='bg-green-600 text-white flex flex-col gap-5 h-screen text-center justify-center items-center'>
        <CircleCheckBig className='text-white' size={100} />
        <h3 className='text-white text-2xl font-bold'>Order Placed Successfully...</h3>
        <Link href='/' className='bg-white text-green-600 px-4 py-2 rounded-md'>Continue Shopping</Link>
    </div>
  )
}

export default page