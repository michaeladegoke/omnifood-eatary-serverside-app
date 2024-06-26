const userModel = require("../models/userAuthmodel.js");
const bcrypt = require("bcrypt");
const StatusCode = require("../utils/StatusCode.js");
const { sendAuthMsg} = require("../utils/email/auth.js");
const { generateToken } = require("../utils/generateToken.js");


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

const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "Email and password are required",
        });
    }

    const userExist = await userModel.findOne({ email: email });

    if (!userExist) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "User account not found, please sign up",
        });
    }

    if (!userExist.password) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            status: false,
            msg: "User account password is missing or invalid",
        });
    }

    const passwordMatch = bcrypt.compareSync(password, userExist.password);

    if (!passwordMatch) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "Incorrect password",
        });
    }

    //JWT
    const token = await generateToken(userExist);

    return res.status(StatusCode.CREATED).json({
        status: true,
        msg: "Welcome to Omnifood, your sure plug for balance and heaithy feeding",
        data: {
            userExist,
            token
        },
    });
};


module.exports = { signUp, signIn };
