/* eslint-disable */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import FileUpload from './Fileupload';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

// Create product mutation
const createProduct = async ({
  name,
  description,
  category_id,
  image,
  stock,
  price,
  id,
}) => {
  try {
    // Create the product
    if (id) {
      const productResponse = await axios.put('/api/products', {
        name,
        description,
        category_id,
        image,
        price,
        _id: id,
      });

      if (productResponse) {
        const inventoryResponse = await axios.put('/api/inventory', {
          product_id: id,
          stock,
        });
      }
    } else {
      const productResponse = await axios.post('/api/products', {
        name,
        description,
        category_id,
        image,
        price,
      });

      if (productResponse) {
        const inventoryResponse = await axios.post('/api/inventory', {
          product_id: productResponse.data.data._id,
          stock,
        });
      }
    }
  } catch (error) {
    console.error('Error during product creation:', error);
    throw new Error('Product creation failed');
  }
};

const getCategories = async () => {
  try {
    const result = await axios.get('/api/categories');
    return result.data;
  } catch (error) {
    return new Error('category fetching failed');
  }
};

const ProductForm = ({ data }) => {
  const queryClient = useQueryClient();
  const formref = useRef();
  const [images, setImages] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (data) {
      const form = formref.current;

      form.querySelector("input[name='title']").value = data.product_id.name;
      form.elements['description'].value = data.product_id.description;
      form.elements['price'].value = data.product_id.price;
      form.elements['stock'].value = data.stock;
      form.querySelector("select[name='category']").value =
        data.product_id.category_id;
    }
  }, [data]);

  const refreshChild = () => {
    setTrigger((prev) => !prev); // Toggle trigger to notify child
  };

  const Mutation = useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      refreshChild(); // Trigger refresh in child
      formref.current.reset(); // Reset form fields
    },
    onError: (error) => {
      console.error('Error submitting form:', error.message);
    },
  });

  const {
    data: categories,
    error,
    isSuccess,
    isLoading,
  } = useQuery(['category'], getCategories);

  function recieveImageData(data) {
    setImages(data);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Collect form data
    const formdata = new FormData(formref.current);

    // Validate form data (example: check if required fields are filled)
    if (
      !formdata.get('title') ||
      !formdata.get('price') ||
      !formdata.get('stock')
    ) {
      alert('Please fill all the required fields');
      return;
    }

    // Submit mutation
    Mutation.mutate({
      name: formdata.get('title'),
      description: formdata.get('description'),
      category_id: formdata.get('category'),
      price: formdata.get('price'),
      stock: formdata.get('stock'),
      image: images,
      id: data?.product_id?._id,
    });
  }

  return (
    <section className="w-full">
      {/* title */}
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-blue-700 leading-[36px]">
          Catalog Upload
        </h1>
        <p className="text-[1rem] text-text">Fill the Product detail</p>
      </div>

      {/* form area */}
      <form onSubmit={handleSubmit} ref={formref} className="w-full mt-[50px]">
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-col w-full">
            <label className="relative">
              <input
                type="text"
                name="title"
                className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
              />
              <span className=" absolute left-5 -top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                Product title
              </span>
            </label>
          </div>

          <div className="flex flex-col items-start p-4">
            <label className="mb-2 text-lg font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              placeholder="Select a Category"
              className="bg-white border border-gray-100 text-gray-800 rounded-md shadow-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 p-3 w-full max-w-xs"
            >
              <option value="" selected>
                Select Category
              </option>
              {categories?.data.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col gap-[5px] w-full mt-[20px]">
            <label className="relative w-full">
              <textarea
                name="description"
                className="peer min-h-[200px] border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
              ></textarea>
              <span className=" absolute left-5 -top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                Write Description
              </span>
            </label>
          </div>

          <div>
            <FileUpload
              ImageData={recieveImageData}
              trigger={trigger}
              dataToEdit={data}
            />
          </div>

          <div className="flex flex-col gap-[5px] w-full">
            <label className="relative">
              <input
                type="number"
                name="price"
                defaultValue={0}
                className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
              />
              <span className=" absolute left-5 -top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                Price
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-[5px] w-full">
            <label className="relative">
              <input
                type="number"
                name="stock"
                defaultValue={0}
                className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
              />
              <span className=" absolute left-5 -top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                Stock
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="py-3 px-4 border border-blue-500 rounded-md outline-none mt-[10px]"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default ProductForm;
