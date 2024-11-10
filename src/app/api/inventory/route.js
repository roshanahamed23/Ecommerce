import connectDB from '@/lib/db';
import Inventory from '@/modals/Inventory';

export async function handler(req, res) {
  const { method } = req;
  await connectDB();

  try {
    if (method === 'POST') {
      // Create a new inventory entry
      const { product_id, stock } = req.body;
      const createInventory = await Inventory.create({
        product_id,
        stock,
      });
      if (!createInventory) {
        return res
          .status(500)
          .json({ message: 'Inventory creation failed', success: false });
      }
      return res.status(200).json({
        message: `Inventory created successfully for Product ${id}`,
        data: createInventory,
        success: true,
      });
    }

    if (method === 'GET') {
      if (req.query?.id) {
        // Fetch inventory details for a specific product
        const inventory = await Inventory.findOne({
          product_id: req.query.id,
        }).populate('product_id');
        if (!inventory) {
          return res
            .status(404)
            .json({ message: 'No inventory detail found', success: false });
        }
        return res.status(200).json({
          message: 'Inventory detail fetched successfully',
          success: true,
          data: inventory,
        });
      } else {
        // Fetch all inventory details
        const inventories = await Inventory.find({}).populate('product_id');
        if (inventories.length === 0) {
          return res
            .status(404)
            .json({ message: 'No inventory details found', success: false });
        }
        return res.status(200).json({
          message: 'Inventory details fetched successfully',
          success: true,
          data: inventories,
        });
      }
    }

    if (method === 'DELETE') {
      if (!req.query?.id) {
        return res.status(400).json({
          message: 'Product ID is required for deletion',
          success: false,
        });
      }
      const deleteInventory = await Inventory.deleteOne({
        product_id: req.query.id,
      });
      if (deleteInventory.deletedCount === 0) {
        return res.status(404).json({
          message: 'Inventory not found for deletion',
          success: false,
        });
      }
      return res
        .status(200)
        .json({ message: 'Deleted inventory successfully', success: true });
    }

    if (method === 'PUT') {
      const { stock, product_id } = req.body;
      const updateInventory = await Inventory.updateOne(
        { product_id },
        { stock }
      );
      if (updateInventory.modifiedCount === 0) {
        return res.status(404).json({
          message: 'No product found to update inventory',
          success: false,
        });
      }
      return res.status(200).json({
        message: 'Inventory updated successfully',
        data: updateInventory,
        success: true,
      });
    }

    // If method not supported
    return res
      .status(405)
      .json({ message: 'Method Not Allowed', success: false });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
      success: false,
    });
  }
}
