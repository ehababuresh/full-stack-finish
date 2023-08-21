


import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import useUsers from "../hooks/useUsers";
import useForm from "../../forms/hooks/useForm";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/joi-schema/loginSchema";
import Container from "@mui/material/Container";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleLogin from "react-google-login";

import { Link } from "react-router-dom";



const clientid =
"538664988641-htvn0bar2t4hep03es2fkkl0m343md8d.apps.googleusercontent.com"

 

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const handleGoogleLogin = (response) => {
    if (response && !response.error) {
      onSuccess(response);
    } else {
      onError(response?.error || "An unknown error occurred");
    }
  };

  const handleForgotPassword = () => {
    return <Navigate to={ROUTES.FORGET_PASSWORD} replace />;
  };


  return (
    <GoogleLogin
      clientId={clientid}
      onSuccess={handleGoogleLogin}
      onFailure={handleGoogleLogin}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
          התחבר דרך גוגל
        </button>
      )}
    />
  );
};

const LoginPage = () => {
  const { user, setUser, token, setToken } = useUser();
  const { handleLogin } = useUsers();

  const { value, ...rest } = useForm(
    initialLoginForm,
    loginSchema,
    handleLogin
  );

  const handleGoogleSuccess = (response) => {
    console.log("התחברות דרך גוגל הצליחה!", response);
    const { profileObj, tokenId } = response;

    setUser(response.profileObj);
    setToken(response.tokenId);

    return <Navigate to={ROUTES.ROOT} replace />;
  };

  const handleGoogleError = (error) => {
    console.error("Error logging in with Google:", error);
   
  };

 

  if (user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        ברוכים הבאים
      </Typography>
      <Form
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onChange={rest.validateForm}
        title="Login"
        styles={{ maxWidth: "450px", mt: 4 }}
        to={ROUTES.CARDS}
      >
        <Input
          label="אימייל"
          name="email"
          type="email"
          error={value.errors.email}
          onChange={rest.handleChange}
          data={value.data}
        />
        <Input
          label="סיסמה"
          name="password"
          type="password"
          error={value.errors.password}
          onChange={rest.handleChange}
          data={value.data}
        />
      </Form>
      <GoogleLoginButton
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    />
      <Link
      to={ROUTES.FORGET_PASSWORD}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <Typography variant="body2" align="center">
     רוצה לעדכן סיסמה? לחץ כאן
      </Typography>
    </Link>
    </Container>
  );
};

export default LoginPage;

