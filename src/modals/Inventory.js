import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Inventory =
  mongoose.model('Inventory', inventorySchema) || mongoose.models.Inventory;

export default Inventory;
