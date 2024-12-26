import { connectDB } from '@/lib/connectDB';
import { OrderItem } from '@ecommerce/admin/modals';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const { order_id, cartItems } = data;
    const orderItem = await OrderItem.create({ order_id, cartItems });
    return NextResponse.json(
      { message: 'Order item created successfully' },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: 'Order item creation failed' },
      { status: 500 }
    );
  }
}
