// ResetPasswordPage.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import useUsers from '../hooks/useUsers'; 

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [error, setError] = useState('');

  const { handleChangePassword } = useUsers(); 

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    if (!newPassword || !confirmNewPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    setError(null); 

    try {
      
      await handleChangePassword(newPassword);

      
      setIsPasswordChanged(true);
      setError(''); 
    } catch (error) {
      console.error('Error changing password:', error);
      setError('An error occurred while changing the password.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        {isPasswordChanged ? (
          <div>
            <Typography variant="h5" gutterBottom>
              Password Changed
            </Typography>
            <Typography>
              Your password has been changed successfully.
            </Typography>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>
              Change Password
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
              id="new-password"
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              id="confirm-new-password"
              label="Confirm New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              required
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Change Password
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;
