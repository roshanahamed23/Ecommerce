import mongoose from 'mongoose';

// Check if the schema is already defined to avoid duplicate errors
const productSchema =
  mongoose.models.Product?.schema ||
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        maxLength: 100,
      },
      description: {
        type: String,
        required: true,
        maxLength: 400,
        default: '',
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      image: {
        type: [String],
        required: true,
      },
      category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false, // Optional field
        default: null,
      },
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
  );

// Export a singleton model instance
const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
