const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        required: true,
        trim: true
      },
      price: {
        type: Number,
        required: true
      },
      category: {
        type: String,
        required: true,
        trim: true
      },
      imageUrl: {
        type: String,
        required: false,
        trim: true
      },
      available: {
        type: Boolean,
        default: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    });

module.exports = mongoose.model("menuDish", menuSchema);