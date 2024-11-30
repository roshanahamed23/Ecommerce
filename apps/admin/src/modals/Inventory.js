import mongoose from 'mongoose';

// Define the inventory schema
const inventorySchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to the 'Product' model
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0, // Minimum stock cannot be less than 0
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create or reuse the Inventory model
const Inventory =
  mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);

export default Inventory;
