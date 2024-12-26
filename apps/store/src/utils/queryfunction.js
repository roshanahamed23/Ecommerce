import axios from 'axios';

export const productfetch = async ({ queryKey }) => {
  const [_key, { category }] = queryKey;
  const result = await axios.post('/api/product', {
    category,
    limit: 6,
  });
  return result.data;
};

export const AddtoCart = async ({
  userId,
  name,
  price,
  quantity,
  product_id,
  image,
}) => {
  try {
    const carts = await axios.post('/api/cart', {
      userId,
      name,
      price,
      quantity,
      product_id,
      image,
    });
    console.log('product added in cart successfully');
    return 'product added successfully';
  } catch (error) {
    return new Error('add to cart failed....');
  }
};

export async function getCartsdetail(id) {
  try {
    const response = await axios.get(`/api/cart?id=${id}`);
    if (!response) {
      return 'No cart';
    }
    return response.data;
  } catch (err) {
    console.error('fetching carts detail failed');
  }
}

export async function updateCartsdetail(id, carts) {
  try {
    console.log(carts, 'rodshan');
    await axios.put('/api/cart', { id, carts });
    console.log('carts update successfully');
    return;
  } catch (err) {
    console.error('error in carts update', err);
  }
}

export async function createOrder(data) {
  try {
    const orderdata = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
      user_id: data.user_id,
      paymentMethod: data.paymentMethod,
    };

    const response = await axios.post('/api/order', orderdata, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.data.order_id);

    const response2 = await axios.post(
      '/api/orderitem',
      { order_id: response.data.data.order_id, cartItems: data.cartItems },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    await axios.put('/api/cart', { id: data.user_id, carts: [] });
    return response.data;
  } catch (err) {
    console.log('error in creating order', err);
  }
}
