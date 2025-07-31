const { assign } = require("nodemailer/lib/shared");
const volunteer_model = require("../models/Volunteer.model");
const RestaurantDonation = require("../models/RestaurantDonation.model");


exports.volunteerLocationUpdate = async (req, res) => {
  const { email, coordinates } = req.body; 
  try {
   
    const getUser = await volunteer_model.findOne({ email: email });

    
    if (!getUser) {
      return res.status(404).send({ message: "User not found" });
    }

    
    let parsedCoordinates;
    try {
      parsedCoordinates = Array.isArray(coordinates) ? coordinates : JSON.parse(coordinates);
    } catch (err) {
      return res.status(400).send({ message: "Invalid coordinates format" });
    }

    if (
      !Array.isArray(parsedCoordinates) ||
      parsedCoordinates.length !== 2 ||
      !parsedCoordinates.every((coord) => typeof coord === 'number')
    ) {
      return res.status(400).send({ message: "Invalid coordinates format" });
    }

    // Update the location of the volunteer
    const result = await volunteer_model.findOneAndUpdate(
      { email: email },
      { $set: { "location.coordinates": parsedCoordinates } },
      { new: true }
    );

    // Send success response
    res.status(200).send({ message: "Location updated successfully" });
  } catch (err) {
    console.log("Error in location update", err);
    res.status(500).send({ message: "Error in updating location" });
  }
};

exports.registerVolunteer = (socket) => {
  socket.join("volunteers");
  console.log(`Socket ${socket.id} joined the 'volunteers' room`);
};


//get history for volunteer

exports.getVolunteerHistory = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Volunteer email is required" });
    }

    const history = await RestaurantDonation.find({ assignedVolunteer: email });

    if (!history.length) {
      return res.status(404).json({ message: "No donation history found" });
    }

    res.status(200).json({ history });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

