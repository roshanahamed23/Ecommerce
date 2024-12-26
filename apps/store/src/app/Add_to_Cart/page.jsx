'use client';
import { getCartsdetail, updateCartsdetail } from '@/utils/queryfunction';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Cartpage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession();
  const [cartDetail, setcartDetail] = useState([]);
  const [total, setTotal] = useState(0);

  const Mutation = useMutation({
    mutationFn: () => updateCartsdetail(session?.user?.id, cartDetail),
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', { id: session?.user?.id }]);
    },
    onError: () => {
      console.error('cart deletion failed');
    },
  });

  const {
    data: Carts,
    isLoading,
    isError,
    error, // Capture error for logging
  } = useQuery({
    queryKey: ['carts', { id: session?.user?.id }],
    queryFn: () => getCartsdetail(session?.user?.id),
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    setTotal(() => {
      let tot = 0;
      Carts?.data.map((item) => {
        tot += item.quantity * item.price;
      });
      return tot;
    });
  }, [Carts?.data]);

  function deleteCart(index, carts) {
    try {
      setcartDetail(() => {
        const updatedCart = carts?.filter((item, ind) => index !== ind);
        return updatedCart;
      });
      Mutation.mutate();
    } catch (err) {
      console.error('Error in cart deletion:', err);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error('Error fetching cart details:', error); // Log the error
    return <div>Something went wrong. Please try again later.</div>;
  }

  if (!Carts?.data || Carts.data.length === 0) {
    return (
      <div className="container mx-auto py-10 space-y-5">
        <h2 className="text-5xl font-bold text-primary-darbar m-auto text-center py-24 bg-primary-brown rounded-md px-10 ">
          Your Cart
        </h2>
        <p className="text-center text-2xl font-bold text-primary-saf">
          Your cart is empty
        </p>
      </div>
    );
  }

  function Placeorder() {
    if (!session.user.id) {
      router.push('/auth/signin');
    } else {
      router.push('/checkout');
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-5">
      <h2 className="text-5xl font-bold text-primary-darbar m-auto text-center py-24 bg-primary-brown rounded-md px-10 ">
        Your Cart
      </h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <table className="w-full">
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {Carts?.data.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="flex flex-col gap-4">
                    <Link href={`/product/${item.product_id}`}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                      />
                      <h4 className="text-md font-bold text-primary-darbar">
                        {item.name}
                      </h4>
                    </Link>
                  </td>
                  <td>
                    <input type="number" defaultValue={item.quantity} />
                  </td>
                  <td>{item.price}</td>
                  <td>{item.quantity * item.price}</td>
                  <td>
                    <button
                      onClick={() => deleteCart(index, Carts.data)}
                      className="py-2 px-4 rounded-md bg-red-700 text-white"
                    >
                      remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-col gap-5 p-8 bg-primary-brown w-full lg:w-1/2">
          <h3 className="font-bold text-primary-darbar text-md tracking-wider ">
            Sub-Total:{' '}
            <span className="text-sm font-normal text-slate-800">
              Rs.{total}
            </span>
          </h3>
          <h3 className="font-bold text-primary-darbar text-md tracking-wider ">
            GST(3%):{' '}
            <span className="text-sm font-normal text-slate-800">
              Rs.{(total * 0.03).toFixed(2)}
            </span>
          </h3>
          <h3 className="font-bold text-primary-darbar text-md tracking-wider">
            Total:{' '}
            <span className="text-sm font-normal text-slate-800">
              Rs.{total + total * 0.03}
            </span>
          </h3>
          <button
            onClick={Placeorder}
            className="py-2 px-4 rounded-md bg-primary-darbar transition-all duration-300 hover:border text-primary-darbar text-md  hover:border-primary-darbar hover:bg-primary-brown hover:text-primary-darbar text-white"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cartpage;
