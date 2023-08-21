
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import useUsers from '../hooks/useUsers'; 

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const { handleSendResetEmail } = useUsers();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleSendResetEmail(email); 
      setIsEmailSent(true);
      setError(null);
    } catch (error) {
      setError('An error occurred while sending the reset email.');
    }
  };

  const handleVerifyCodeSuccess = () => {
    navigate('/verification'); 
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        {isEmailSent ? (
          <div>
            <Typography variant="h5" gutterBottom>
              Email Sent
            </Typography>
            <Typography gutterBottom>
              An email with instructions to reset your password has been sent to your email address.
            </Typography>
            <Typography>
              Please check your inbox and follow the instructions provided in the email.
            </Typography>
            <Button variant="contained" color="primary" fullWidth onClick={handleVerifyCodeSuccess}>
              Verify Code
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>
              Forgot Password
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              required
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send Reset Email
            </Button>
          </form>
        )}
        <Button variant="outlined" fullWidth onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;
