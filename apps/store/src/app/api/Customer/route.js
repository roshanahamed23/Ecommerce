import { connectDB } from '@/lib/connectDB';
import customer from '@/models/Customers.js';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'All fields are required', success: false }),
        { status: 400 }
      );
    }

    const existingCustomer = await customer.findOne({ email });
    if (existingCustomer) {
      return new Response(
        JSON.stringify({ message: 'Email is already in use', success: false }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createCustomer = await customer.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!createCustomer) {
      return new Response(
        JSON.stringify({
          message: 'Customer profile creation failed',
          success: false,
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Customer profile created successfully',
        success: true,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating customer:', error);
    return new Response(
      JSON.stringify({
        message: 'Internal server error in Customer',
        success: false,
      }),
      { status: 500 }
    );
  }
}
