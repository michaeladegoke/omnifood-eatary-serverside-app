const orderItemModel = require("../models/orderItemModel");
const eateryMenuModel = require("../models/eaterymenumodel");
const StatusCode = require("../utils/StatusCode");


const getorderItem = async(req, res, next) => {

    try {
        const { dishes } = req.body; // Expecting an array of objects with dishId and quantity

    if (!dishes || !Array.isArray(dishes) || dishes.length === 0) {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: false,
        message: 'Invalid order data'
      });
    }

    let totalAmount = 0;
    const orderDetails = [];

    for (const item of dishes) {
      const { dishId, quantity } = item;
      if (!dishId || !quantity || quantity <= 0) {
        return res.status(StatusCode.BAD_REQUEST).json({
          status: false,
          message: 'Invalid dish ID or quantity'
        });
      }

      const dish = await eateryMenuModel.findById(dishId);
      if (!dish) {
        return res.status(StatusCode.BAD_REQUEST).json({
          status: false,
          message: `Dish with ID ${dishId} not found`
        });
      }
      orderDetails.push({
        dishId,
        quantity
      });
      totalAmount += dish.price * quantity;
    }
    const neworderItemModel = new orderItemModel({
        dishes: orderDetails,
        totalAmount
      });
  
      const savedOrder = await neworderItemModel.save();
  
      res.status(StatusCode.OK).json({
        status: true,
        message: 'Order processed successfully',
        data: savedOrder
      });
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: 'Failed to process order',
            error: error.message
          });
    }
}

module.exports = { getorderItem };