import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; 
import loadingGif from '../assets/loading.gif';

const VerificationSuccess = () => {
  const navigate = useNavigate(); 
  const { verificationToken } = useParams(); 
  const [user, setUser] = useState(null); // State to store user details

  // Function to handle login button click
  const handleLoginClick = () => {
    // Redirect user based on their account type
    if (user && user.accountType === 'seeker') {
      navigate('/user-profile');
    } else {
      navigate('/company-profile');
    }
  };

  // Effect to verify email on component mount
  useEffect(() => {
    fetch(`http://localhost:8800/api-v1/auth/verification-success/${verificationToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Email verified successfully!');
          setUser(data.user); // Store user details in state
        } else {
          console.error('Failed to verify email:', data.message);
        }
      })
      .catch(error => {
        console.error('Error verifying email:', error);
      });
  }, [verificationToken]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#E5E7EB',
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
        <img
          src={loadingGif}
          alt="Loading..."
          style={{
            width: '100px',
            height: '100px',
            marginBottom: '20px',
            display: 'block',
            margin: '0 auto',
          }}
        />

        <div style={{ marginBottom: '20px' }}>
          <h2>Verification Successful!</h2>
          <p>Your email has been successfully verified.</p>
          <p>You can now log in to your account.</p>
        </div>

        <button
          style={{
            backgroundColor: '#34D399',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
          onClick={handleLoginClick}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#34D399';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#047857';
          }}
          disabled={!user} // Disable button until user is set
        >
          Proceed to Login
        </button>
      </div>
    </div>
  );
};

export default VerificationSuccess;
