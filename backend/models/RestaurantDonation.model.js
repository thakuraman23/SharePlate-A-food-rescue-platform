const mongoose = require("mongoose");

const restaurantDonationSchema = new mongoose.Schema({
  restaurantEmail: {
    type: String,
    required: true,
  },
  restaurantName:{
    type: String,
    required: true,
  },
  assignedVolunteer:{
    type: String,
  },
  status: {
    type: String,
    enum: ["requested", "completed","pending"],
    default: "requested",
  },
  otp:{
    type:String,
    default:""
  },
  donationList: [
    {
      itemName: {
        type: String,
      },
    },
  ],
  weight: {
    type: Number,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"], // Ensures only "Point" is stored
      required: true,
    },
    coordinates: {
      type: [Number], // Array of two numbers [longitude, latitude]
      required: true,
    },
  },
}, { timestamps: true });

// **Ensure a 2dsphere index for geospatial queries**
restaurantDonationSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("RestaurantDonation", restaurantDonationSchema);
