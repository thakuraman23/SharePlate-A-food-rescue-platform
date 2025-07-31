const auth_controller=require("../controllers/Auth.controller")
const volunteer_controller=require("../controllers/Volunteer.controller")
const donation_controller=require("../controllers/Restaurant.controller")
const auth_mw=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/rescuefood/api/v1/volunteer/signin",[auth_mw.verifySignInBody],auth_controller.volunteersignin);
    app.post("/rescuefood/api/v1/volunteer/signup",[auth_mw.verifyVolunteerSignUpBody],auth_controller.volunteersignup);

    
    app.post("/rescuefood/api/v1/volunteer/resetpasswordlink",auth_controller.volunteerRequestPasswordReset)
    app.post("/rescuefood/api/v1/volunteer/resetpasswordrequest",auth_controller.volunteerResetPassword)
    app.post("/rescuefood/api/v1/volunteer/resetverifyotp",auth_controller.volunteerVerifyOTP)


    app.post("/rescuefood/api/v1/volunteer/updatelocation",volunteer_controller.volunteerLocationUpdate);
   app.post("/rescuefood/api/v1/volunteer/otpsave",donation_controller.saveOTP)
    app.post("/rescuefood/api/v1/volunteer/history",volunteer_controller.getVolunteerHistory)
}

