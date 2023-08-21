// VerificationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import useUsers from '../hooks/useUsers'; // Make sure the path to the file is correct

const VerificationPage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState(null);
  const navigate = useNavigate();

  const handleVerificationChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const { handleVerifyCode } = useUsers(); // Make sure this function is defined correctly in useUsers()

  const handleVerificationSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleVerifyCode(verificationCode); 
      navigate('/reset-password'); 
    } catch (error) {
      setVerificationError('An error occurred while verifying the code.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleVerificationSubmit}>
          <Typography variant="h5" gutterBottom>
            Verification Code
          </Typography>
          {verificationError && <Typography color="error">{verificationError}</Typography>}
          <TextField
            id="verificationCode"
            label="Verification Code"
            type="text"
            variant="outlined"
            fullWidth
            value={verificationCode}
            onChange={handleVerificationChange}
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Verify Code
          </Button>
        </form>
        <Button variant="outlined" fullWidth onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Paper>
    </Container>
  );
};

export default VerificationPage;
