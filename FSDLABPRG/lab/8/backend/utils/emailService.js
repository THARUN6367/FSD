const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate a random OTP
const generateOTP = (length = 6) => {
  // Generate a random number between 100000 and 999999 for a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP to user's email
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Verification',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #333; text-align: center;">OTP Verification</h2>
        <p style="font-size: 16px; line-height: 1.5; color: #555;">Thank you for using our service. Your One-Time Password (OTP) for verification is:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
          <h1 style="color: #333; font-size: 24px; margin: 0;">${otp}</h1>
        </div>
        <p style="font-size: 16px; line-height: 1.5; color: #555;">This OTP is valid for 10 minutes.</p>
        <p style="font-size: 16px; line-height: 1.5; color: #555;">If you didn't request this OTP, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 14px; color: #888; text-align: center;">© ${new Date().getFullYear()} OTP Manager. All rights reserved.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail
}; 