const auth_controller=require("../controllers/Auth.controller.js")
const auth_mw=require("../middlewares/auth.mw.js")
const restuarant_controller=require("../controllers/Restaurant.controller.js")


module.exports=(app)=>{
    app.post("/rescuefood/api/v1/restaurant/signin",[auth_mw.verifySignInBody],auth_controller.restaurantsignin)
    app.post("/rescuefood/api/v1/restaurant/signup",[auth_mw.verifyRestaurantSignUpBody],auth_controller.restaurantsignup)
    
    app.post("/rescuefood/api/v1/restaurant/resetpasswordlink",auth_controller.restaurantRequestPasswordReset)
    app.post("/rescuefood/api/v1/restaurant/resetpasswordrequest",auth_controller.restaurantResetPassword)
    app.post("/rescuefood/api/v1/restaurant/resetverifyotp",auth_controller.restaurantVerifyOTP)

   app.post("/rescuefood/api/v1/restaurant/donate",[auth_mw.verifyRestaurantToken],restuarant_controller.createRequest)
    app.post("/rescuefood/api/v1/restaurant/history",[auth_mw.verifyRestaurantToken],restuarant_controller.getDonationHistoryByEmail)
    app.post("/rescuefood/api/v1/restaurant/profile",[auth_mw.verifyRestaurantToken],restuarant_controller.getResProfile)
    app.post("/rescuefood/api/v1/restaurant/verify-otp",[auth_mw.verifyRestaurantToken],restuarant_controller.verifyOtp)
    
}

