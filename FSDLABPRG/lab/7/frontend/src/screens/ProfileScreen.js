import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { UserService } from '../services/api';
import './ProfileScreen.css';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userInfo);
    setUser(parsedUser);
    setName(parsedUser.name);
    setEmail(parsedUser.email);

    // For now, this just gets user data from localStorage
    // In a real app, you'd fetch the latest user profile from the server
    const fetchUserProfile = async () => {
      try {
        // Example of how to call your API in a real app:
        // const userData = await UserService.getUserProfile();
        // setUser(userData);
        // setName(userData.name);
        // setEmail(userData.email);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage({ type: 'danger', text: 'Passwords do not match' });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: '', text: '' });

      // In a real app, this would update the user profile on the server
      // For now, we'll just update the local storage
      const updatedUser = {
        ...user,
        name: name
      };

      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: error.toString() || 'Failed to update profile' 
      });
    } finally {
      setLoading(false);
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="profile-screen">
      <div className="profile-container">
        <h1>User Profile</h1>
        
        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        {user ? (
          <div className="profile-content">
            <div className="profile-info">
              <div className="profile-avatar">
                <div className="avatar-placeholder">
                  {name.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <div className="user-info">
                <h2>{name}</h2>
                <p>{email}</p>
                <p className="member-since">
                  Member since: {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="profile-edit">
              <h3>Edit Profile</h3>
              
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    disabled={true}
                  />
                  <small className="form-text">Email cannot be changed</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">New Password (leave blank to keep current)</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="update-btn"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen; 