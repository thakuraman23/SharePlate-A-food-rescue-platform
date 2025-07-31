
const volunteer_model=require("../models/Volunteer.model")
const restaurant_model=require("../models/Restaurant.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const config=require("../configs/config")
const nodemailer=require("nodemailer")
const crypto = require("crypto");

/***********For Volunteer  ***********/
//volunteer signup
exports.volunteersignup = async (req, res) => {
  try {
    const { name, email, phone, location, password } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).send({ message: "Name, email, phone, and password are required" });
    }

    // Check if volunteer with the same email already exists
    const existingVolunteer = await volunteer_model.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).send({ message: "Email already in use" });
    }

    let locationData = {
      type: "Point",
      coordinates: [0, 0], // Default location
    };

    // Validate location if provided
    if (location) {
      if (
        !location.type ||
        location.type !== "Point" ||
        !Array.isArray(location.coordinates) ||
        location.coordinates.length !== 2
      ) {
        return res.status(400).send({
          message: "Invalid location format. Must be { type: 'Point', coordinates: [longitude, latitude] }",
        });
      }
      locationData.coordinates = location.coordinates;
    }

    // Create the volunteer object
    const volunteerObject = {
      name,
      email,
      phone,
      location: locationData,
      password: bcrypt.hashSync(password, 8),
    };

    // Save to database
    await volunteer_model.create(volunteerObject);

    return res.status(201).send({ message: "SignUp Successful! Please Sign In" });

  } catch (err) {
    console.error("Error while registering the volunteer:", err);
    return res.status(500).send({ message: "Error while registering the volunteer" });
  }
};

//volunteer signin 
exports.volunteersignin = async (req, res) => {
  const request_body = req.body;
  try {
      const getUser = await volunteer_model.findOne({ email: request_body.email });

      if (!getUser) {
          return res.status(400).send({ message: "Email is not valid" }); // Added return
      }

      const isPasswordValid = bcrypt.compareSync(request_body.password, getUser.password);

      if (!isPasswordValid) {
          return res.status(401).send({ message: "Invalid Password !!" }); // Added return
      }

      const token = jwt.sign({ email: getUser.email }, process.env.SECRET_JWT, {
          expiresIn: 604800,
      });

      return res.status(200).send({
          name: getUser.name,
          email: getUser.email,
          phone:getUser.phone,
          accessToken: token,
      });
  } catch (error) {
      console.error("Error signing in:", error.message);
      return res.status(500).json({ message: "Internal server error" });
  }
};


//volunteer forgot password

const otpStore = new Map(); // Temporary store for OTPs

exports.volunteerRequestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await volunteer_model.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email doesn't exist!" });
        }

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();

        // Store OTP in memory with expiry (10 min)
        otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD,
            },
        });

        const mailOptions = {
            to: email,
            from: process.env.APP_EMAIL,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};


//verify OTP
exports.volunteerVerifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
      if (!otpStore.has(email)) {
          return res.status(400).json({ message: "OTP expired or not requested!" });
      }

      const storedOtp = otpStore.get(email);

      // Check if OTP matches
      if (storedOtp.otp !== otp) {
          return res.status(400).json({ message: "Invalid OTP!" });
      }

      // Check if OTP is expired
      if (Date.now() > storedOtp.expiresAt) {
          otpStore.delete(email); // Remove expired OTP
          return res.status(400).json({ message: "OTP expired!" });
      }

      // OTP is valid, proceed to reset password
      res.status(200).json({ message: "OTP verified, proceed to reset password" });
  } catch (error) {
      res.status(500).json({ message: "Internal server error" });
  }
};


//reset password 


exports.volunteerResetPassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!otpStore.has(email)) {
            return res.status(400).json({ message: "OTP verification required!" });
        }

        // Find user
        const user = await volunteer_model.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Hash new password
        const encryptedPassword = await bcrypt.hash(password, 8);

        // Update password
        await volunteer_model.updateOne({ email }, { $set: { password: encryptedPassword } });

        // Remove OTP from store after successful reset
        otpStore.delete(email);

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};




/*********************************************************************************/

/*******************For Restaurant******************************/
//restaurnt signup
exports.restaurantsignup=async(req,res)=>{
  const request_body=req.body

  const restaurantObject={
      name:request_body.name,
      email:request_body.email,
      phone:request_body.phone,
      location:request_body.location,
      password:bcrypt.hashSync(request_body.password,8),
      address:request_body.address,
      proofid:request_body.proofid,

  }

  try{
      const created_restaurant=await restaurant_model.create(restaurantObject);

      res.status(201).send({message:"SignUp Successfull!! Please SignIn"})
  }catch(err){
      console.log("Error while registering the restaurant",err)
      res.status(500).send({
          message:"Error while registering the restaurant"
      })
  }
}



//restaurant signin
exports.restaurantsignin = async (req, res) => {
  try {
    const request_body = req.body;

    // Validate email and password presence
    if (!request_body.email || !request_body.password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find restaurant by email
    const getRestaurant = await restaurant_model.findOne({ email: request_body.email });

    if (!getRestaurant) {
      return res.status(400).json({ message: "Restaurant with this email does not exist" });
    }

    // Compare passwords
    const isPasswordValid = bcrypt.compareSync(request_body.password, getRestaurant.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password, please try again" });
    }

    // JWT secret key check
    if (!process.env.SECRET_JWT) {
      return res.status(500).json({ message: "JWT secret key is missing" });
    }

    // Generate JWT token
    const token = jwt.sign({ email: getRestaurant.email }, process.env.SECRET_JWT, {
      expiresIn: 604800, // 7 days
    });

    // Send response with restaurant data and token
    res.status(200).json({
      name: getRestaurant.name,
      email: getRestaurant.email,
      accessToken: token,
      location:getRestaurant.location.coordinates
    });

  } catch (err) {
    console.error("Error sign in restaurant:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


//restaurant forgot password
const otpStoreRestaurant = new Map(); 
exports.restaurantRequestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
      const user = await restaurant_model.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "Email doesn't exist!" });
      }

      // Generate a 6-digit OTP
      const otp = crypto.randomInt(100000, 999999).toString();

      // Store OTP in memory with expiry (10 min)
      otpStoreRestaurant.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

      const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          auth: {
              user: process.env.APP_EMAIL,
              pass: process.env.APP_PASSWORD,
          },
      });

      const mailOptions = {
          to: email,
          from: process.env.APP_EMAIL,
          subject: "Password Reset OTP",
          text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
  }
};

exports.restaurantVerifyOTP = async (req, res) => {
const { email, otp } = req.body;

try {
    if (!otpStoreRestaurant.has(email)) {
        return res.status(400).json({ message: "OTP expired or not requested!" });
    }

    const storedOtp = otpStoreRestaurant.get(email);

    if (storedOtp.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP!" });
    }

    if (Date.now() > storedOtp.expiresAt) {
        otpStoreRestaurant.delete(email);
        return res.status(400).json({ message: "OTP expired!" });
    }

    res.status(200).json({ message: "OTP verified, proceed to reset password" });
} catch (error) {
    res.status(500).json({ message: "Internal server error" });
}
};

exports.restaurantResetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
      if (!otpStoreRestaurant.has(email)) {
          return res.status(400).json({ message: "OTP verification required!" });
      }

      const user = await restaurant_model.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User not found!" });
      }

      const encryptedPassword = await bcrypt.hash(password, 8);

      await restaurant_model.updateOne({ email }, { $set: { password: encryptedPassword } });

      otpStoreRestaurant.delete(email);

      res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
      res.status(500).json({ message: "Internal server error" });
  }
};
