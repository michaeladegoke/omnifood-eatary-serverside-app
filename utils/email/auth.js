const nodemailer = require("nodemailer");
const { PASSMAILER, USER, SERVICE } = require("../../config/config")

// Function to send a sign-up message
exports.sendAuthMsg = async (email, first_name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: SERVICE,
            auth: {
                user: USER,
                pass: PASSMAILER
            }
        });

        await transporter.sendMail({
            from: USER,
            to: email,
            subject: "You are welcome to Omnifood",
            html: `<b>Hi ${first_name},</b>
                <p>Thank you for signing up at Omnifood, a place 
                of super delicious and healthy meal...</p>
                <br>
                <b>
                <p>Best regards,</p>
                <p>Omnifood Team</p>
                </b>`
        });
    } catch (error) {
        console.error("Error in sending sign-up message:", error);
        throw error;
    }
};

exports.signUpOtp = async(email, OTP) => {
    console.log(email,PASSMAILER);
   try {
      const transporter = nodemailer.createTransport({
         service: SERVICE,
         secure:true,
         auth: {
            user: USER,
            pass:  PASSMAILER
         },
      });

      await transporter.sendMail({
        from: USER,
        to: email,
        subject: "OTP Sent",
        html: `<b> Hi </b></b>
         <p>
               here is the otp sent to you to verify yourself ${OTP}.....
         </p>
         
         </br>
         <b>
         
         <p>Best regards,</p>
         <p>omnifood Team</p>
         </b>
         `, 
       })
   }catch (error){
    console.log("error in sending mail", error);
   }
}
