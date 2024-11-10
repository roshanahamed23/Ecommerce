import connectDB from '@/lib/db';
import Product from '@/modals/Product';

export async function handler(req, res) {
  const { method } = req;
  await connectDB();

  try {
    if (method === 'GET') {
      if (req.query?.id) {
        // Retrieve a single product by ID
        const product = await Product.findOne({ _id: req.query.id });
        if (!product) {
          return res
            .status(404)
            .json({ success: false, message: 'Product not found' });
        }
        return res.status(200).json({ success: true, data: product });
      } else {
        // Retrieve all products
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products });
      }
    }

    if (method === 'POST') {
      // Create a new product
      const { name, description, price, image, category_id } = req.body;
      const product = await Product.create({
        name,
        description,
        price,
        image,
        category_id,
      });
      return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product,
      });
    }

    if (method === 'PUT') {
      // Update an existing product
      const { _id, name, description, price, image, category_id } = req.body;
      const updatedProduct = await Product.updateOne(
        { _id },
        { name, description, price, image, category_id }
      );
      if (updatedProduct.nModified === 0) {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found for update' });
      }
      return res
        .status(200)
        .json({ success: true, message: 'Product updated successfully' });
    }

    if (method === 'DELETE') {
      // Delete a product by ID
      if (!req.query?.id) {
        return res
          .status(400)
          .json({ success: false, message: 'Product ID is required' });
      }
      const deletedProduct = await Product.deleteOne({ _id: req.query.id });
      if (deletedProduct.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found for deletion' });
      }
      return res.status(200).json({
        success: true,
        message: `Product (${req.query.id}) deleted successfully`,
      });
    }

    // If method not supported
    return res
      .status(405)
      .json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    // Handle all unexpected errors
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}
