import { connectDB } from '@/lib/connectDB';
import { Order } from '@ecommerce/admin/modals'; // Only if needed
import { OrderItem } from '@ecommerce/admin/modals'; // Only if needed
import { NextResponse } from 'next/server'; // If this is Next.js
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      name,
      phone,
      email,
      address,
      city,
      state,
      country,
      pincode,
      paymentMethod,
      user_id,
    } = body;
    const order = await Order.create({
      user_id: user_id,
      order_id: uuidv4(),
      status: 'pending',
      contact_details: {
        name: name,
        phone: phone,
        email: email,
        address: address,
        city: city,
        state: state,
        country: country,
        pincode: pincode,
      },
      paymentMethod: paymentMethod,
    });
    return NextResponse.json(
      {
        message: 'Order created successfully',
        data: order,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error in creating order:', err);
    return NextResponse.json(
      {
        message: 'Order creation failed',
        success: false,
      },
      { status: 500 }
    );
  }
}
