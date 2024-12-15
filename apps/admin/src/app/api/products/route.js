import connectDB from '@/lib/db';
import Product from '@/modals/Product';
import { NextResponse } from 'next/server';

// Handle GET requests
export async function GET(req) {
  try {
    await connectDB();
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get('id'); // Retrieve ID from query parameters

    if (id) {
      // Retrieve a single product by ID
      const product = await Product.findOne({ _id: id });
      if (!product) {
        return new Response(
          JSON.stringify({ success: false, message: 'Product not found' }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify({ success: true, data: product }), {
        status: 200,
      });
    } else {
      // Retrieve all products
      const products = await Product.find({}).populate('category_id');
      return new Response(JSON.stringify({ success: true, data: products }), {
        status: 200,
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

// Handle POST requests
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json(); // Parse JSON body
    const { name, description, price, image, category_id } = body;

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category_id,
    });
    return NextResponse.json(
      { success: true, message: 'Product created successfully', data: product },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Handle PUT requests
export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { _id, name, description, price, image, category_id } = body;

    const updatedProduct = await Product.updateOne(
      { _id },
      { name, description, price, image, category_id }
    );

    if (updatedProduct.modifiedCount === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Product not found for update',
          data: updatedProduct,
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Product updated successfully',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

// Handle DELETE requests
export async function DELETE(req) {
  try {
    await connectDB();
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: 'Product ID is required' }),
        { status: 400 }
      );
    }

    const deletedProduct = await Product.deleteOne({ _id: id });

    if (deletedProduct.deletedCount === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Product not found for deletion',
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Product (${id}) deleted successfully`,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
