const userModel = require("../models/userAuthmodel.js");
const bcrypt = require("bcrypt");
const StatusCode = require("../utils/StatusCode.js");
const { sendAuthMsg} = require("../utils/email/auth.js");




// const signUp = async (req, res, next) => {
//     const { email, password } = req.body;


//     try {
//         const normalizedEmail = email.trim().toLowerCase();

//         const userExist = await userModel.findOne({ email: normalizedEmail });

//         if (userExist) {
//             return res.status(StatusCode.BAD_REQUEST).json({
//                 status: false,
//                 message: "User already exists"
//             });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const saveUser = await userModel.create({
//             email: normalizedEmail,
//             password: hashedPassword
//         });

//         await sendAuthMsg(normalizedEmail);

//         return res.status(StatusCode.CREATED).json({
//             status: true,
//             message: "Account created successfully",
//             userDetails: saveUser,
//         });
//     } catch (error) {
//         if (error.code === 11000) {
//             return res.status(StatusCode.BAD_REQUEST).json({
//                 status: false,
//                 message: "User already exists"
//             });
//         }

//     }
// };

const signUp = async (req, res, next) => {
    const { email, password, first_name, last_name, country, phone_number } = req.body;

    try {
        const normalizedEmail = email.trim().toLowerCase();

        // Check if the user already exists
        const userExist = await userModel.findOne({ email: normalizedEmail });
        if (userExist) {
            return res.status(StatusCode.BAD_REQUEST).json({
                status: false,
                message: "User already exists"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const saveUser = await userModel.create({
            email: normalizedEmail,
            password: hashedPassword,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            country: country
        });

        // Send authentication message
        await sendAuthMsg(normalizedEmail);

        // Respond with success
        return res.status(StatusCode.CREATED).json({
            status: true,
            message: "Account created successfully",
            userDetails: saveUser,
        });

    } catch (error) {
        // Handle other errors (database, network, etc.)
        next(error);
    }
};


module.exports = { signUp };
