// const volunteer_model = require("../models/Volunteer.model");
// const jwt = require("jsonwebtoken");

// const restaurant_model = require("../models/Restaurant.model");
// const util=require("util")

// /*********** For Volunteer ************************ */

// const verifyVolunteerSignUpBody = async (req, res, next) => {
//   try {
//     const { name, email, phone, password, location } = req.body;

//     if (!name) {
//       return res.status(400).send({ message: "Name is not provided in request body" });
//     }
//     if (!email) {
//       return res.status(400).send({ message: "Email is not provided in request body" });
//     }
//     if (!phone) {
//       return res.status(400).send({ message: "Phone is not provided in request body" });
//     }
//     if (!password) {
//       return res.status(400).send({ message: "Password is not provided in request body" });
//     }


//     // Check if the email is already registered
//     const existingUser = await volunteer_model.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send({ message: "Email Already Exists" });
//     }

//     next(); // Proceed to the next middleware/controller
//   } catch (err) {
//     console.error("Error while validating volunteer signup body", err);
//     return res.status(500).send({ message: "Error while validating volunteer signup body" });
//   }
// };



// const verifySignInBody = async (req, res, next) => {
//   try {
//     if (!req.body.email) {
//       return res.status(400).send({
//         message: "Email not present in req body",
//       });
//     }

//     if (!req.body.password) {
//       return res.status(400).send({
//         message: "Password not present in req body",
//       });
//     }
//     next();
//   } catch (err) {
//     console.log("Error while validating volunteer signin body", err);
//     return res.status(500).send({
//       message: "Error while validating volunteer signin body",
//     });
//   }
// };



// //for restaurant
// const verifyRestaurantSignUpBody = async (req, res, next) => {
//   try {
//     if (!req.body.name) {
//       return res.status(400).send({
//         message: "Name is not provided in request body",
//       });
//     }
//     if (!req.body.email) {
//       return res.status(400).send({
//         message: "Email is not provided in request body",
//       });
//     }
//     if (!req.body.phone) {
//       return res.status(400).send({
//         message: "Phone is not provided in request body",
//       });
//     }
//     if (!req.body.password) {
//       return res.status(400).send({
//         message: "Password is not provided in request body",
//       });
//     }
//     if (!req.body.location) {
//       return res.status(400).send({
//         message: "Location is not provided in request body",
//       });
//     }

//     const get_user = await volunteer_model.findOne({ email: req.body.email });
//     if (get_user) {
//       return res.status(400).send({
//         message: "Email Already Exists",
//       });
//     }

//     next();
//   } catch (err) {
//     console.log("Error while validating Restaurant signup body ", err);
//     return res.status(500).send({
//       message: "Error while validating  Restaurant signup body",
//     });
//   }
// };



// /*************Token Verification for all *******************/
// const verifyToken = async (req, res, next, userType) => {
//   try {
//     const token = req.headers["x-access-token"];

//     if (!token) {
//       return res.status(403).json({ message: "No token found: Unauthorized" });
//     }

//     // Convert jwt.verify into a Promise-based function
//     const verifyAsync = util.promisify(jwt.verify);
//     const decoded = await verifyAsync(token, process.env.SECRET_JWT);

//     let user;
//     if (userType === "volunteer") {
//       user = await volunteer_model.findOne({ email: decoded.email });
//     } else if (userType === "restaurant") {
//       user = await restaurant_model.findOne({ email: decoded.email });
//     }

//     if (!user) {
//       return res.status(400).json({
//         message: "Unauthorized, the user for this token doesn't exist",
//       });
//     }

//     req.email = decoded.email;
//     req.userType = userType;
//     next();
//   } catch (error) {
//     console.error("JWT Verification Error:", error);
//     return res.status(401).json({ message: "Unauthorized!" });
//   }
// };

// // Middleware for volunteers
// const verifyVolunteerToken = (req, res, next) => verifyToken(req, res, next, "volunteer");

// // Middleware for restaurants
// const verifyRestaurantToken = (req, res, next) => verifyToken(req, res, next, "restaurant");

// module.exports = {
//   verifyToken,
//   verifyVolunteerToken,
//   verifyRestaurantToken,
//   verifySignInBody,
//   verifyVolunteerSignUpBody,
//   verifyRestaurantSignUpBody,
// };

const volunteer_model = require("../models/Volunteer.model");
const restaurant_model = require("../models/Restaurant.model");
const jwt = require("jsonwebtoken");
const util = require("util");

/*********** Common User Existence Check ************************ */
const checkUserExists = async (email, model) => {
  return await model.findOne({ email });
};

/*********** Middleware for Volunteer Signup ************************ */
const verifyVolunteerSignUpBody = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    if (await checkUserExists(email, volunteer_model)) {
      return res.status(400).send({ message: "Email Already Exists" });
    }

    next();
  } catch (err) {
    console.error("Error in volunteer signup validation:", err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

/*********** Middleware for Restaurant Signup ************************ */
const verifyRestaurantSignUpBody = async (req, res, next) => {
  try {
    const { name, email, phone, password, location } = req.body;

    if (!name || !email || !phone || !password || !location) {
      return res.status(400).send({ message: "All fields are required" });
    }

    if (await checkUserExists(email, restaurant_model)) {
      return res.status(400).send({ message: "Email Already Exists" });
    }

    next();
  } catch (err) {
    console.error("Error in restaurant signup validation:", err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

/*********** Middleware for Sign In Validation ************************ */
const verifySignInBody = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    next();
  } catch (err) {
    console.error("Error in signin validation:", err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

/************* Token Verification for Both User Types *******************/
const verifyToken = (userType) => {
  return async (req, res, next) => {
    try {
      const token = req.headers["x-access-token"];

      if (!token) {
        return res.status(403).json({ message: "No token found: Unauthorized" });
      }

      const verifyAsync = util.promisify(jwt.verify);
      const decoded = await verifyAsync(token, process.env.SECRET_JWT);

      const model = userType === "volunteer" ? volunteer_model : restaurant_model;
      const user = await model.findOne({ email: decoded.email });

      if (!user) {
        return res.status(400).json({ message: "Unauthorized: User does not exist" });
      }

      req.email = decoded.email;
      req.userType = userType;
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return res.status(401).json({ message: "Unauthorized!" });
    }
  };
};

// Middleware for volunteers
const verifyVolunteerToken = verifyToken("volunteer");

// Middleware for restaurants
const verifyRestaurantToken = verifyToken("restaurant");

module.exports = {
  verifyVolunteerSignUpBody,
  verifyRestaurantSignUpBody,
  verifySignInBody,
  verifyVolunteerToken,
  verifyRestaurantToken,
};
