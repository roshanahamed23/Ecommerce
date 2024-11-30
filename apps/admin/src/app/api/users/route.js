import User from '@/modals/User';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const data = await User.find({});
    return NextResponse.json(
      {
        message: 'data fetched successfully',
        data: data,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'User data fetching failed',
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get('id');
    const deleteduser = await User.deleteOne({ _id: id });
    return NextResponse.json(
      {
        message: `deleted successfully ${deleteduser._id}`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `deletion failed`,
        success: false,
      },
      { status: 500 }
    );
  }
}
