import React from 'react';
import './App.css';
import OTPManager from './components/OTPManager';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>OTP Manager</h1>
        </div>
      </header>
      <main className="container">
        <OTPManager />
      </main>
      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} OTP Manager</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 