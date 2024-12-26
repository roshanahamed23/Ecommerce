import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Array,
    required: true,
  },
});

const OrderItem =
  mongoose.models.OrderItem || mongoose.model('OrderItem', orderItemSchema);

export default OrderItem;
