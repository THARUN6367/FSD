import React, { useState } from 'react';
import axios from 'axios';
import './OTPManager.css';

const OTPManager = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email input, 2: OTP input, 3: Success
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Validate email format
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle sending OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setMessage({ type: 'danger', text: 'Please enter your email address' });
      return;
    }

    if (!isEmailValid(email)) {
      setMessage({ type: 'danger', text: 'Please enter a valid email address' });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      
      const response = await axios.post('/api/otp/send', { email });
      
      if (response.status === 200) {
        setMessage({ type: 'success', text: 'OTP has been sent to your email' });
        setStep(2);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.message || 'Failed to send OTP. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle verifying OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    // Validate OTP
    if (!otp) {
      setMessage({ type: 'danger', text: 'Please enter the OTP' });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      
      const response = await axios.post('/api/otp/verify', { email, otp });
      
      if (response.data.verified) {
        setMessage({ type: 'success', text: 'OTP verified successfully!' });
        setStep(3);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.message || 'Failed to verify OTP. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle resending OTP
  const handleResendOTP = async () => {
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      
      const response = await axios.post('/api/otp/send', { email });
      
      if (response.status === 200) {
        setMessage({ type: 'success', text: 'A new OTP has been sent to your email' });
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.message || 'Failed to resend OTP. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Start over
  const handleStartOver = () => {
    setEmail('');
    setOtp('');
    setStep(1);
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="otp-manager">
      <div className="card">
        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        {step === 1 && (
          <div className="email-step">
            <h2>Email Verification</h2>
            <p>Enter your email address to receive a verification code</p>
            
            <form onSubmit={handleSendOTP}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="otp-step">
            <h2>Enter OTP</h2>
            <p>Enter the 6-digit code sent to {email}</p>
            
            <form onSubmit={handleVerifyOTP}>
              <div className="form-group">
                <label htmlFor="otp">Verification Code</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the 6-digit code"
                  maxLength="6"
                  disabled={loading}
                />
              </div>
              
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
            
            <div className="action-links">
              <button onClick={handleResendOTP} className="text-btn" disabled={loading}>
                Resend OTP
              </button>
              <button onClick={handleStartOver} className="text-btn" disabled={loading}>
                Change Email
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="success-step">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Verification Successful</h2>
            <p>Your email has been successfully verified.</p>
            <button onClick={handleStartOver} className="submit-btn">
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPManager; 