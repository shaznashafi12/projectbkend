import express from 'express'
import { add, forgotPassword, getAllUsers, getUserById, login, logoutUser, register, resetPassword, sendOTP, setTracker, verifyOTP } from '../controller/usercontroller.js';

const userrouter = express.Router()

userrouter.post('/add', add)
userrouter.post('/register', register)
userrouter.post('/login', login)

userrouter.put('/set-tracker/:id', setTracker)  // ✅ use controller
userrouter.get('/getAllUsers', getAllUsers)

userrouter.put('/logout', logoutUser)
userrouter.post('/forgot-password', forgotPassword);
userrouter.post('/reset-password/:token', resetPassword);
userrouter.post("/send-otp", sendOTP);
userrouter.post("/verify-otp", verifyOTP);
userrouter.get("/getUser/:id", getUserById);
export default userrouter;
