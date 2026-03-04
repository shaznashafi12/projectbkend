import User from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const add = async (req, res) => {
  try {
    const { _id, ...cleanData } = req.body;

    const newUser = new User(cleanData);
    const response = await newUser.save();

    res.json(response);
    console.log(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don't send passwords
    res.status(200).json(users);
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
 
export const register=async(req,res)=>{
  try{
    const existingemail=await User.findOne({email:req.body.email});
    if(existingemail){
      return res.status(400).json('mail already exist')

    }
    const hashedpassword=await bcrypt.hash(req.body.password,10)
    console.log(hashedpassword);
    const userData={...req.body,password:hashedpassword}

    const newUser=await new User(userData)
    const saveduser=await newUser.save()
    return res.json(saveduser)
    
  }
  catch(e){
    console.error(e);
    return res.status(500).json({message:"error occured during register"})
  }
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchedpassword = await bcrypt.compare(password, user.password);
    if (!matchedpassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        usertype: user.usertype,
      },
      "abc",
      { expiresIn: "1h" }
    );

    // ✅ SEND USER OBJECT PROPERLY
    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        usertype: user.usertype,
        trackerType: user.trackerType || null,
      }
    });

  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const setTracker = async (req, res) => {
  try {
    const { id } = req.params;
    const { trackerType } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { trackerType },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: updatedUser
    });

  } catch (error) {
    console.error("SET TRACKER ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};
export const logoutUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { trackerType: null },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Logged out successfully",
      user: updatedUser
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `
        <h3>Password Reset Request</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `
    });

    res.json({ message: "Reset email sent successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Token invalid or expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOTP = otp;
    user.resetOTPExpire = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
      
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Your Password Reset OTP",
      html: `<h2>Your OTP is: ${otp}</h2>`
    });

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
  console.error("SEND OTP ERROR:", error);
  res.status(500).json({ message: error.message });
}
};
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({
      email,
      resetOTP: otp,
      resetOTPExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};