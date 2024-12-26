import { connectDB } from '@/lib/connectDB';
import { Product, Inventory } from '@ecommerce/admin/modals';
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

//get product detail of a single product
export async function GET(req) {
    try{
        connectDB();
       const {searchParams} = new URL(req.url);
       const id = searchParams.get('id');
        const product =await Product.findOne({_id:id}).populate('category_id');
        const inventory = await Inventory.findOne({product_id:id});
        return new Response(JSON.stringify({
            message: 'successfully fetched product',
            data: [product,inventory],
            success: true
        }), {status: 200});

    } catch (error) {
        return new Response(JSON.stringify({
            message: 'internal server error',
            success: false
        }), {status: 500});
    }
}
