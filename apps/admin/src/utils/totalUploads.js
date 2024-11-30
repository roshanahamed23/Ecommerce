'use server';
import connectDB from '@/lib/db';
import Product from '@/modals/Product';

export async function totalUploads() {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all products
    const total = await Product.find({});

    // Return the count of products
    return total.length;
  } catch (error) {
    console.error('Error fetching total uploads:', error);
    throw new Error('Failed to fetch total uploads.');
  }
}
