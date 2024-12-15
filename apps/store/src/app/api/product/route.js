import { connectDB } from '@/lib/connectDB';
import { Product, Category } from '@ecommerce/admin/modals';
// Adjust this path as needed based on your Turbo Repo configuration


export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { category, limit } = body;
        console.log(category, limit);

        const all_product = await Product.find().populate({
            path: 'category_id',
            match: { name: category }
        });
        console.log(all_product)   

        return new Response(JSON.stringify({
            message: `successfully fetched - ${category} data`,
            data: all_product,
            success: true
        }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({
            message: 'internal server error',
            success: false
        }), { status: 500 });
    }
}
