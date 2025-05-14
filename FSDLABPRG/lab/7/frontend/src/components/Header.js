import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/login');
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <h1>E-Shop</h1>
            </Link>
          </div>

          <div className="menu-icon" onClick={toggleNav}>
            <i className={isNavOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>

          <nav className={`nav ${isNavOpen ? 'active' : ''}`}>
            <ul>
              <li>
                <Link to="/" onClick={() => setIsNavOpen(false)}>
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/cart" onClick={() => setIsNavOpen(false)}>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to="/profile" onClick={() => setIsNavOpen(false)}>
                      <i className="fas fa-user"></i> {user.name}
                    </Link>
                  </li>
                  <li>
                    <button onClick={logoutHandler} className="logout-btn">
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" onClick={() => setIsNavOpen(false)}>
                    <i className="fas fa-user"></i> Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 