import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    user_Id: {
        type: String,
        required: true
    },
    cart: {
        type: [{
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            }
        }],
        default: []
    }
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
