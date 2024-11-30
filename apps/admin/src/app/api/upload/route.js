import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

// Handle POST requests
export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON body
    const { data: img } = body;

    if (!img) {
      return new Response(
        JSON.stringify({ message: 'No image data provided', success: false }),
        { status: 400 }
      );
    }

    const filename = Date.now().toString(); // Generate a unique filename
    const result = await cloudinary.uploader.upload(img, {
      public_id: filename,
      folder: 'images',
    });

    return new Response(
      JSON.stringify({
        data: result.secure_url,
        message: 'Image uploaded successfully',
        success: true,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err.message,
        message: 'Image upload failed',
        success: false,
      }),
      { status: 500 }
    );
  }
}

// Handle other HTTP methods (optional)
export function GET() {
  return new Response(
    JSON.stringify({ message: 'GET method is not supported' }),
    { status: 405 }
  );
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb', // Adjust size as needed (e.g., '500kb', '2mb')
    },
  },
};
