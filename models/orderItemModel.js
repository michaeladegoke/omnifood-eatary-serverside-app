const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = mongoose.Schema({

    dishes: [
        {
          dishId: {
            type: Schema.Types.ObjectId,
            ref: 'MenuDish',
            required: true
          },
          quantity: {
            type: Number,
            required: true
          }
        }
      ],
      totalAmount: {
        type: Number,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model("OrderItem", orderItemSchema);