'use client';
import React, { use } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProduct } from '@/lib/product';
import Image from 'next/image';
import { CircleCheckBig } from 'lucide-react';
import { AddtoCart } from '@/utils/queryfunction';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const Productpage = ({ params }) => {
  const { id } = React.use(params);
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const Mutation = useMutation({
    mutationFn: AddtoCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', { id: session.user.id }]);
    },
    onError: () => {
      console.error('Add to cart failed');
    },
  });

  function handleAddtoCart({ name, image, price, quantity, product_id }) {
    try {
      if (!session.user.id) {
        router.push('/auth/signin');
      }
      Mutation.mutate({
        userId: session.user.id,
        name,
        price,
        image,
        product_id,
        quantity,
      });
    } catch (error) {
      console.error('add to cart creation failed');
    }
  }
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  });

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="flex flex-col gap-8 lg:gap-8 lg:flex-row justify-center items-start lg:w-full mt-4 p-2">
      <div className="w-full lg:w-[80%] rounded-sm h-[280px] lg:h-[400px] relative flex items-center justify-center">
        <Image
          src={product?.data[0].image[0] || null}
          alt={product?.data[0].name || null}
          width={1000}
          height={1000}
          className="absolute inset-auto overflow-hidden object-cover w-[200px] lg:w-[400px] rounded-lg"
        />
      </div>
      {/* <div>
        <Image
          src={product?.data[0].image[0] || null}
          alt={product?.data[0].name || null}
          width={850}
          height={1000}
          className="object-cover h-96 w-full lg:w-96 "
        />
      </div> */}
      <div className="flex flex-col gap-4 p-3 lg:pr-96">
        <h1 className="text-2xl font-bold text-primary-darbar">
          {product?.data[0].name}
        </h1>
        <span className="h-1 w-10 bg-primary-brown"></span>
        <p className="text-4xl font-bold text-primary-darbar">
          Rs.{product?.data[0].price.toLocaleString()}.00
        </p>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center text-primary-darbar gap-2">
            <CircleCheckBig className="w-4 h-4 text-primary-saf" /> Stock:{' '}
            {product?.data[1].stock} pcs left
          </li>
          <li className="flex items-center text-primary-darbar gap-2">
            <CircleCheckBig className="w-4 h-4 text-primary-saf" /> Category:{' '}
            {product?.data[0].category_id.name}
          </li>
          <li className="flex items-center text-primary-darbar gap-2">
            <CircleCheckBig className="w-4 h-4 text-primary-saf" /> Brand:{' '}
            <span>City Gold</span>
          </li>
          <li className="flex items-center text-primary-darbar gap-2">
            <CircleCheckBig className="w-4 h-4 text-primary-saf" /> Guarantee:{' '}
            <span>1 Year</span>
          </li>
        </ul>
        <div>
          <button
            onClick={() => {
              handleAddtoCart({
                name: product?.data[0].name,
                price: product?.data[0].price,
                quantity: 1,
                image: product.data[0].image[0],
                product_id: product.data[0]._id,
              });
            }}
            className="bg-primary-brown border border-primary-darbar text-primary-darbar px-4 py-2 rounded-md w-full hover:bg-primary-darbar hover:text-white transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productpage;
