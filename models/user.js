import mongoose from "mongoose";

let userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
        required:true
    },
    usertype:{
        type:String
    },
    trackerType: {
  type: String,
  enum: ["pregnancy", "period", null],
  default: null
},
resetToken: {
  type: String
},
resetTokenExpire: {
  type: Date
},
 resetOTP: { type: String },
  resetOTPExpire: { type: Date },
  featureTimeline: [String],
selectedItems: [String]
})

const User = mongoose.model("User",userschema);

export default User;
