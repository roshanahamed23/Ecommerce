'use client';
import { getCartsdetail } from '@/utils/queryfunction';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { createOrder } from '@/utils/queryfunction';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('credit-card');
  const [isChecked, setIsChecked] = useState(false);
  const [total, setTotal] = useState(0);
  const { data: session } = useSession();
  const router = useRouter();
  const formRef = useRef(null); // Reference for the form
  const queryClient = useQueryClient();


  const {
    data: Carts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['carts', { id: session?.user.id }],
    queryFn: () => {
      return getCartsdetail(session?.user.id);
    },
    enabled: !!session?.user.id,
  });

  const mutateOrder = useMutation({
    mutationFn: async(data) => {
       return await createOrder(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts', { id: session?.user.id }] });
      console.log('Order created successfully');
    },
    onError: () => {
      console.log('Order creation failed');
    },
  });

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const inputStyles =
    'border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]';
  const labelStyles = 'text-[14px] font-[400] text-gray-700';

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  ];

  useEffect(() => {
    setTotal(() => {
      let tot = 0;
      Carts?.data.map((item) => {
        tot += item.quantity * item.price;
      });
      return tot;
    });
  }, [Carts?.data]);

  const handleSubmit = (e) => {
    try{
    e.preventDefault();
    
    // Collect all form data
    const formData = new FormData(formRef.current);
    const dataObject = {};
    formData.forEach((value, key) => {
      dataObject[key] = value;
    });

    // Add payment method and cart items
    dataObject.paymentMethod = selectedPayment;
    dataObject.cartItems = Carts?.data;
    dataObject.user_id = session?.user.id;

    console.log(dataObject);  // You can replace this with your API call
    mutateOrder.mutate(dataObject);
    router.push('/success')
    }
    catch(err){
      console.log("error in creating order",err)
    }


    // Example of sending the data to an API
    // fetch('/api/checkout', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(dataObject),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  };

  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 w-full px-8 lg:px-16 py-4 lg:py-8">
      {/* Billing and Payment Form */}
      <div className="lg:col-span-2 space-y-8 w-full">
        {/* Billing Information */}
        <div className="w-full">
          <h2 className="text-[1.5rem] font-medium text-gray-700 mb-6">
            Shipping Information
          </h2>

          <form ref={formRef} className="grid grid-cols-1 gap-[16px]">
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <label htmlFor="firstName" className={`${labelStyles}`}>
                  Name
                </label>
                <input
                  name="name"
                  placeholder="First name"
                  type="text"
                  id="firstName"
                  className={`${inputStyles}`}
                />
              </div>

              <div className="w-full">
                <label htmlFor="phone" className={`${labelStyles}`}>
                  Contact No:
                </label>
                <input
                  name="phone"
                  placeholder="Phone No"
                  type="number"
                  id="phone"
                  className={`${inputStyles}`}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className={`${labelStyles}`}>
                Address
              </label>
              <input
                name="address"
                placeholder="Address"
                type="text"
                id="address"
                className={`${inputStyles}`}
              />
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
              <div className="w-full lg:w-[50%]">
                <label htmlFor="country" className={`${labelStyles}`}>
                  Country
                </label>
                <select name="country" className={`${inputStyles}`}>
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                </select>
              </div>
              <div className="w-full lg:w-[50%]">
                <label htmlFor="state" className={`${labelStyles}`}>
                  State
                </label>
                <select name="state" className={`${inputStyles}`}>
                  <option value="">Select State</option>
                  {indianStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
              <div className="w-full lg:w-[50%]">
                <label htmlFor="city" className={`${labelStyles}`}>
                  City
                </label>
                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  className={`${inputStyles}`}
                />
              </div>
              <div className="w-full lg:w-[50%]">
                <label htmlFor="zipCode" className={`${labelStyles}`}>
                  Pin Code
                </label>
                <input
                  name="pincode"
                  type="text"
                  id="pincode"
                  className={`${inputStyles}`}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
              <div className="w-full lg:w-[50%]">
                <label htmlFor="email" className={`${labelStyles}`}>
                  Email
                </label>
                <input
                  name="email"
                  placeholder="Email address"
                  type="email"
                  id="email"
                  className={`${inputStyles}`}
                />
              </div>
              <div className="w-full lg:w-[50%]">
                <label htmlFor="phone" className={`${labelStyles}`}>
                  Phone Number
                </label>
                <input
                  name="phone"
                  placeholder="Phone number"
                  type="tel"
                  id="phone"
                  className={`${inputStyles}`}
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="border border-gray-200 rounded-md">
              <h2 className="text-[1.2rem] font-medium text-gray-700 border-b border-gray-200 px-5 py-3">
                Payment Option
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full p-5">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedPayment('cash')}}
                  className={`flex relative flex-col items-center justify-center p-4 border rounded-lg ${
                    selectedPayment === 'cash'
                      ? 'border-primary-darbar text-primary-darbar'
                      : 'border-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-2 left-2 rounded-full border border-black border-1px h-4 w-4 ${
                      selectedPayment === 'cash' && 'border-primary-darbar bg-gray-300 shadow-primary-darbar border-5px'
                    }`}
                  ></span>
                  <span className="text-2xl">💵</span>
                  <span className="text-[0.9rem] font-[500] mt-2">
                    Cash on Delivery
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-full">
        <div className="bg-white rounded-md border border-gray-200 p-6">
          <h2 className="text-[1.2rem] font-medium text-gray-700 mb-6">
            Order Summary
          </h2>
          <div className="space-y-4">
            {Carts?.data.map((item, index) => {
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image}
                      alt="product/image"
                      width={500}
                      height={500}
                      className="w-[50px] h-[50px] object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-[5px] mt-0.5">
                      <p className="text-sm text-gray-500">
                        {item.quantity} x{' '}
                      </p>
                      <p className="text-sm text-[#0FABCA] font-[600]">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="pt-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sub-total</span>
                <span className="font-medium text-gray-800">₹{total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-500">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-800">
                  ₹{(total * 0.03).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-base font-medium text-gray-800">
                  Total
                </span>
                <span className="text-base font-medium text-gray-800">
                  ₹{total + total * 0.03}
                </span>
              </div>
            </div>
          </div>

        </div>
        <button onClick={handleSubmit} className="w-full bg-primary-darbar text-white py-3 px-4 rounded-lg hover:bg-primary-brown hover:text-primary-darbar transition-colors">
              CONFIRM ORDER
            </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
