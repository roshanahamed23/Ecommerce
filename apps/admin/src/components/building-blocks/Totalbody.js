/* eslint-disable */
'use client';
import { updateStock } from '@/utils/updateStock';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowRightSFill } from 'react-icons/ri';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Image from 'next/image';

const getsinglecategory = async ({ queryKey }) => {
  const [_key, { id }] = queryKey;
  const result = await axios.get(`/api/categories?id=${id}`);
  return result.data;
};

const Tablebody = ({ index, item, page, categoryData }) => {
  const queryClient = useQueryClient();
  const [stock, setStock] = useState(item?.stock ?? 0);
  const [categoryId, setCategoryId] = useState('');

  const input1 = useRef();
  const mutation = useMutation(updateStock, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const {
    data: singlecategorydetail,
    error,
    isLoading,
    isSuccess,
  } = useQuery(['category', { id: categoryId }], getsinglecategory, {
    enabled: !!categoryId,
  });
  useEffect(() => {
    if (isSuccess) {
      categoryData({
        name: singlecategorydetail?.data?.name,
        parent: singlecategorydetail?.data?.parent_category?._id,
        id: singlecategorydetail.data._id,
      });
      setCategoryId('');
    }
  }, [isSuccess, singlecategorydetail]);

  const deleteProduct = async (id) => {
    try {
      const deleted = await axios.delete(`/api/products?id=${id}`);
      const inventorydeleted = await axios.delete(`/api/inventory?id=${id}`);
      queryClient.invalidateQueries([products]);
      window.location.reload();
      console.log(deleted.message);
    } catch (error) {
      return new Error('product deletion failed');
    }
  };

  const deleteCategory = async (id) => {
    try {
      const deleted = await axios.delete(`/api/categories?id=${id}`);
      console.log(deleted.message);
    } catch (error) {
      return new Error('category deletion failed');
    }
  };

  const handleChange = () => {
    // Update the stock state whenever the input changes
    setStock(input1.current.value);
  };

  const handleClick = () => {
    mutation.mutate({ id: item.product_id._id, stock: input1.current.value });
  };

  if (page === 'inventory') {
    return (
      <>
        <td>{item?.product_id?._id}</td>
        <td>{item?.product_id?.category_id}</td>
        <td>{item?.product_id?.name}</td>
        <td>
          <form className="flex" onSubmit={handleClick}>
            <input
              type="number"
              value={stock}
              onChange={handleChange}
              ref={input1}
              className="p-2 border rounded-sm border-blue-700 w-20"
            />
            <button
              type="submit"
              className="relative right-8 text-2xl text-blue-700"
            >
              <RiArrowRightSFill />
            </button>
          </form>
        </td>
      </>
    );
  }

  if (page === 'products') {
    return (
      <>
        <td>{index + 1}</td>
        <td>{item.product_id?.category_id}</td>
        <td>{item?.product_id?.name}</td>
        <td>{item.stock}</td>
        <td>
          <div className="flex flex-row gap-2">
            <Link href="">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this product?'
                    )
                  ) {
                    deleteProduct(item?.product_id?._id);
                  }
                }}
                className="px-3 text-white font-semibold py-2 bg-red-600 rounded-sm"
              >
                delete
              </button>
            </Link>
            <Link href={`/products/edit/${item?.product_id?._id}`}>
              <button className="px-3 text-white font-semibold py-2 bg-blue-600 rounded-sm">
                edit
              </button>
            </Link>
          </div>
        </td>
      </>
    );
  }

  if (page === 'category') {
    return (
      <>
        <td>{item.name}</td>
        <td>{item.parent_category?.name}</td>
        <td>
          <div className="flex flex-row gap-2">
            <Link href="">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this category?'
                    )
                  ) {
                    deleteCategory(item._id);
                  }
                }}
                className="px-3 text-white font-semibold py-2 bg-red-600 rounded-sm"
              >
                delete
              </button>
            </Link>
            <Link href="">
              <button
                onClick={() => {
                  setCategoryId(item._id);
                }}
                className="px-3 text-white font-semibold py-2 bg-blue-600 rounded-sm"
              >
                edit
              </button>
            </Link>
          </div>
        </td>
      </>
    );
  }

  if (page === 'users') {
    return (
      <>
        <td>{index + 1}</td>
        <td>{item.firstname}</td>
        <td>{item?.lastname}</td>
        <td>{item?.email}</td>
        <td>
          <div className="flex flex-row gap-2">
            <Link href="#">
              <button
                onClick={async () => {
                  if (
                    window.confirm(
                      'are your sure what to delete the user admin?'
                    )
                  ) {
                    await axios.delete(`/api/users?id=${item._id}`);
                  }
                }}
                className="px-3 text-white font-semibold py-2 bg-red-600 rounded-sm"
              >
                delete
              </button>
            </Link>
          </div>
        </td>
      </>
    );
  }

  if (page === 'orders') {
    const getOrderItem = async ({ queryKey }) => {
      const [_key, { orderId }] = queryKey;
      const result = await axios.get(`/api/orderitem?orderId=${orderId}`);
      return result.data;
    };
    const { data: orderItem } = useQuery({
      queryKey: ['orderItem', { orderId: item.order_id }],
      queryFn: getOrderItem,
    });
    return (
      <>
        <td className="border border-gray-300">
          <p className="max-w-sm">{item.order_id}</p>
        </td>
        <td className="border border-gray-300">
          {orderItem?.data[0].cartItems.map((item) => {
            return (
              <div
                key={item._id}
                className="flex flex-row items-center max-w-sm my-10 gap-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                />
                <p>{item.name}</p>
              </div>
            );
          })}
        </td>
        <td className="border border-gray-300">
          {orderItem?.data[0].cartItems.map((item) => {
            return (
              <div
                key={item._id}
                className="flex flex-row items-center my-10 gap-4"
              >
                <p>{item.quantity}</p>
              </div>
            );
          })}
        </td>
        <td className="border border-gray-300">
          <div className="flex flex-col items-center gap-4">
            <button className=" text-gray-500 font-semibold py-2 px-4 bg-sky-200 rounded-md">
              Accept
            </button>
            <button className="px-4 text-sky-500 border border-gray-50-500 font-semibold py-2  rounded-md">
              Cancel
            </button>
          </div>
        </td>
      </>
    );
  }

  return <p>no result found</p>;
};

export default Tablebody;
