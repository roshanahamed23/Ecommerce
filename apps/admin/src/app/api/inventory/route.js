import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Inventory from '@/modals/Inventory';

// Establish database connection before handling requests

// POST: Create a new inventory entry
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json(); // Parse the request body
    const { product_id, stock } = body;

    const createInventory = await Inventory.create({ product_id, stock });
    console.log('data:', createInventory);

    if (!createInventory) {
      return NextResponse.json(
        { message: 'Inventory creation failed', success: false },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: `Inventory created successfully for Product ${product_id}`,
        data: createInventory,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal server error',
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}

// GET: Fetch inventory details
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url); // Parse query params
    const productId = searchParams.get('id');

    if (productId) {
      // Fetch inventory details for a specific product
      const inventory = await Inventory.findOne({
        product_id: productId,
      }).populate('product_id');

      if (!inventory) {
        return NextResponse.json(
          { message: 'No inventory detail found', success: false },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          message: 'Inventory detail fetched successfully',
          success: true,
          data: inventory,
        },
        { status: 200 }
      );
    } else {
      // Fetch all inventory details
      const inventories = await Inventory.find({}).populate('product_id');

      if (inventories.length === 0) {
        return NextResponse.json(
          { message: 'No inventory details found', success: false },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          message: 'Inventory details fetched successfully',
          success: true,
          data: inventories,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal server error',
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}

// DELETE: Delete inventory
export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('id');

    if (!productId) {
      return NextResponse.json(
        { message: 'Product ID is required for deletion', success: false },
        { status: 400 }
      );
    }

    const deleteInventory = await Inventory.deleteOne({
      product_id: productId,
    });

    if (deleteInventory.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Inventory not found for deletion', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Deleted inventory successfully', success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal server error',
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}

// PUT: Update inventory
export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { stock, product_id } = body;

    const updateInventory = await Inventory.updateOne(
      { product_id },
      { stock }
    );

    if (updateInventory.modifiedCount === 0) {
      return NextResponse.json(
        {
          message: 'No product found to update inventory',
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Inventory updated successfully',
        data: updateInventory,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal server error',
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
