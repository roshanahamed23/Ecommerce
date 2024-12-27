import Order from '@/modals/Order';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
export async function GET() {
  try {
    await connectDB();
    const Orders = await Order.find({});
    return NextResponse.json({ data: Orders }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error fetching orders' },
      { status: 500 }
    );
  }
}

export function POST() {
  return NextResponse.json(
    { message: 'POST method is not supported' },
    { status: 405 }
  );
}
