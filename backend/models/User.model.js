const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    location: {
        type: {
          type: String, // Type is always "Point" for GeoJSON
          enum: ['Point'], // Must be 'Point'
         
        },
        coordinates: {
          type: [Number], // Array of numbers: [longitude, latitude]
         
        },
      },
    password:{
        type:String,
        required:true
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('User',userSchema)
