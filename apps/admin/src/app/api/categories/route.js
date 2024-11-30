import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/modals/Category';

// Connect to the database before handling requests

// POST: Create a new category
export async function POST(req) {
  try {
    await connectDB();
    const { name, parent } = await req.json(); // Parse request body
    const category = await Category.create({ name, parent_category: parent });

    if (!category) {
      return NextResponse.json(
        { error: 'Category creation failed', success: false },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Category created successfully',
        success: true,
        data: category,
      },
      { status: 201 }
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

// GET: Fetch category/categories
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const category = await Category.findOne({ _id: id }).populate(
        'parent_category'
      );

      if (!category) {
        return NextResponse.json(
          { message: 'Category not found', success: false },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: category });
    } else {
      const categories = await Category.find().populate('parent_category');
      return NextResponse.json({ success: true, data: categories });
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

// PUT: Update a category
export async function PUT(req) {
  try {
    await connectDB();
    const { id, name, parent } = await req.json(); // Parse request body
    const updateCategory = await Category.updateOne(
      { _id: id },
      { name, parent_category: parent }
    );

    if (updateCategory.modifiedCount === 0) {
      return NextResponse.json(
        { message: 'Category not found for update', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Category updated successfully', success: true },
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

// DELETE: Delete a category
export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'Category ID is required', success: false },
        { status: 400 }
      );
    }

    const deleteCategory = await Category.deleteOne({ _id: id });

    if (deleteCategory.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Category not found for deletion', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Category deleted successfully', success: true },
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
