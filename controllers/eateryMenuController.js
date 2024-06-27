const eateryMenuModel = require("../models/eaterymenumodel")
const StatusCode = require("../utils/StatusCode")

const getMenuDishes = async(req, res, next) => {
       try {
         const menuDishes = await eateryMenuModel.find();
         res.status(StatusCode.OK).json({
            status:true,
            data:menuDishes
         });
               } catch (error) {
                res.status(StatusCode.BAD_REQUEST).json({
                    status: false,
                    message: 'Failed to retrieve menu dishes',
                    error: error.message
                  });
       }
};


// const addMenuDishes = async (req, res) => {
//   try {
//     const { name, description, price, category, imageUrl } = req.body;

//     const savedDish = await eateryMenuModel.create({
//       name: name,
//       description: description,
//       price: price,
//       category: category,
//       imageUrl: imageUrl
//     });

//     res.status(StatusCode.OK).json({
//       status: true,
//       message: 'Menu dish added successfully',
//       data: savedDish
//     });
//   } catch (error) {
//     res.status(StatusCode.BAD_REQUEST).json({
//       status: false,
//       message: 'Failed to add menu dish',
//       error: error.message
//     });
//   }
// };

const addMenuDishes = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;

    // Create a new instance of the eateryMenuModel
    const newDish = new eateryMenuModel({
      name: name,
      description: description,
      price: price,
      category: category,
      imageUrl: imageUrl
    });

    // Save the new dish to the database
    const savedDish = await newDish.save();

    res.status(StatusCode.OK).json({
      status: true,
      message: 'Menu dish added successfully',
      data: savedDish
    });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({
      status: false,
      message: 'Failed to add menu dish',
      error: error.message
    });
  }
};


module.exports = { getMenuDishes, addMenuDishes };