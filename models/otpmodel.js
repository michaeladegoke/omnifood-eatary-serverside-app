const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema({
     email: { type: String },
     code: { type: String },  // Ensure this matches the field in your create query
     type: { type: String },
     created_at: { type: Date },
     otpExpiresAt: { type: Date }
}); 

module.exports = mongoose.model("OTPomnifood", OTPSchema);