const express = require('express');
const router = express.Router();
const OTP = require('../models/Otp');
const { generateOTP, sendOTPEmail } = require('../utils/emailService');

// Route to send OTP
router.post('/send', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Generate a new OTP
    const otp = generateOTP();
    
    // Save the OTP to the database
    // First, delete any existing OTPs for this email
    await OTP.deleteMany({ email });
    
    // Create a new OTP document
    const newOTP = new OTP({
      email,
      otp
    });
    
    await newOTP.save();
    
    // Send the OTP via email
    const emailResult = await sendOTPEmail(email, otp);
    
    if (!emailResult.success) {
      return res.status(500).json({ message: 'Failed to send OTP email', error: emailResult.error });
    }
    
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to verify OTP
router.post('/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }
    
    // Find the OTP document for this email
    const otpDocument = await OTP.findOne({ email });
    
    if (!otpDocument) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }
    
    // Check if the OTP matches
    if (otpDocument.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // OTP is valid, delete it from the database
    await OTP.deleteOne({ _id: otpDocument._id });
    
    res.status(200).json({ message: 'OTP verified successfully', verified: true });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 