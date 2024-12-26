import Cart from "@/models/Carts";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        connectDB();
        const { searchParams } = new URL(req.url);
        const userid = searchParams.get('id')
        const carts = await Cart.findOne({ user_Id: userid });
        if (!carts) {
            return Response.json({
                message: "No user id exist",
                success: false
            }, { status: 400 })
        }

        return Response.json({
            message: "carts detail fetched successfully",
            success: true,
            data: carts.cart
        })
    } catch (err) {
        return new Response.json({
            message: "fetchng add to cart detail failed",
            success: false
        }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        connectDB();
        const body = await req.json();
        const { id, carts } = body;
        console.log(carts)
        const cart = await Cart.findOne({ user_Id: id })
        if (!cart) {
            return Response.json({
                message: "No user id exist...",
                success: false
            }, { status: 400 })
        }
        const updateCarts = await Cart.updateOne({ user_Id: id }, { cart: carts })
        if (updateCarts.modifiedCount === 1) {
            return Response.json({
                message: "Carts updated successfullly...",
                success: true
            }, { status: 200 })
        }
        return Response.json({
            message: "Cart update failed",
            success: false
        }, { status: 400 })

    } catch (err) {
        return Response.json({
            message: "carts update failed - internal server error"
        },{status:500})
    }
}

export async function POST(req) {
    try {
        connectDB();
        const body = await req.json();
        const { name, quantity, price, image, userId, product_id } = body;

        // Input validation
        if (!userId) {
            return Response.json({
                message: "No user ID found",
                success: false
            }, {
                status: 400
            });
        }

        const userExist = await Cart.findOne({ user_Id: userId });
        if (userExist) {
            // Fixed: Avoid mutation, use spread operator
            const updatedCart = [...userExist.cart, { name, price, quantity, image, product_id }];
            const updateResult = await Cart.updateOne(
                { user_Id: userId },
                { cart: updatedCart }
            );

            return Response.json({
                message: "Cart updated successfully",
                data: updateResult,
                success: true
            });
        }
        const createcart = await Cart.create({
            user_Id: userId,
            cart: [{ name, price, quantity, image, product_id }]
        });

        return Response.json({
            message: "Cart created successfully",
            data: createcart,
            success: true
        });
    } catch (error) {
        console.error('Cart operation failed:', error);
        return Response.json({
            message: "Add to cart failed - internal server error",
            success: false
        }, {
            status: 500
        });
    }
}

// export async function DELETE(req){
//     try{
//       await connectDB();
//       const data = await req.json();
//       const {user_id} = data;
//     }catch(err){
//         return NextResponse.json({
//             message: "all carts clearing failed"
//         },{status: 500})
//     }

// }