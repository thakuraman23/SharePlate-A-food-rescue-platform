// const mongoose=require("mongoose")

// const volunteerSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     phone:{
//         type:String,
//         required:true
//     },
//     location: {
//         type: {
//           type: String, // Type is always "Point" for GeoJSON
//           enum: ['Point'], // Must be 'Point'
          
//         },
//         coordinates: {
//           type: [Number], // Array of numbers: [longitude, latitude]
         
//         },
//       },
//     password:{
//         type:String,
//         required:true
//     }
// },{timestamps:true,versionKey:false})

// module.exports=mongoose.model('Volunteer',volunteerSchema)

const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0], // Ensure default coordinates to avoid empty arrays
    },
  },
}, { timestamps: true });

volunteerSchema.index({ location: "2dsphere" }); // Geospatial index

module.exports = mongoose.model("Volunteer", volunteerSchema);