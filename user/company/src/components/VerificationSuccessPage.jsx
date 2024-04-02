import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import loadingGif from '../assets/loading.gif';

const VerificationSuccess = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle login button click
  const handleLoginClick = () => {
    // Navigate to the login page
    navigate('/user-auth');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Ensure full viewport height
        backgroundColor: '#E5E7EB', // Background color
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
          textAlign: 'center',
          backgroundColor: '#fff',
        }}
      >
        {/* Loading GIF */}
        <img
          src={loadingGif}
          alt="Loading..."
          style={{
            width: '100px',
            height: '100px',
            marginBottom: '20px',
            display: 'block', // To center the image
            margin: '0 auto', // To center the image
          }}
        />

        {/* Verification Success Message */}
        <div style={{ marginBottom: '20px' }}>
          <h2>Verification Successful!</h2>
          <p>Your email has been successfully verified.</p>
          <p>You can now log in to your account.</p>
        </div>

        {/* Interactive Login Button */}
        <button
          style={{
            backgroundColor: '#34D399', // Green-500
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow
          }}
          // Call handleLoginClick function on button click
          onClick={handleLoginClick}
          // Hover effect
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#34D399'; // Green-400
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#047857'; // Green-500
          }}
        >
          Proceed to Login
        </button>
      </div>
    </div>
  );
};

export default VerificationSuccess;
