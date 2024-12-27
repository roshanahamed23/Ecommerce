import OrderItem from '@/modals/orderItem';
import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    const orderItem = await OrderItem.find({ order_id: orderId });
    return NextResponse.json({ data: orderItem }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
