
import React, { useState, useEffect, useMemo, useContext,useCallback } from "react";
import { node } from "prop-types";
import { getToken, getUser } from "../services/localStorageService";
import { GoogleLogin } from "react-google-login";

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getToken);

  useEffect(() => {
    if (!user) {
      const userFromLocalStorage = getUser();
      setUser(userFromLocalStorage);
    }
  }, [user]);

  const isSessionExpired = () => {
    const lastLoginTime = localStorage.getItem("lastLoginTime");
    if (!lastLoginTime) return true;

    const currentTime = new Date().getTime();
    const sessionDuration = 4 * 60 * 60 * 1000; 

    return currentTime - lastLoginTime > sessionDuration;
};

  useEffect(() => {
    const checkSession = () => {
      
      if (localStorage.getItem("user") && isSessionExpired()) {
        localStorage.removeItem("user");
        localStorage.removeItem("lastLoginTime");
        setUser(null); 
        setToken(null); 
      }
    };

    checkSession();

    
    const interval = setInterval(checkSession, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const value = useMemo(() => {
    return { user, setUser, token, setToken };
  }, [user, token]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: node.isRequired,
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};



const useGoogleLogin = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleGoogleLogin = useCallback(async (response) => {
    try {
      
      const googleUser = response.profileObj; 
      setUser(googleUser);
      setError(null);
    } catch (err) {
      
      setError("Google login failed. Please try again.");
    }
  }, []);

  const GoogleLoginButton = () => (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      onSuccess={handleGoogleLogin}
      onFailure={handleGoogleLogin} 
      buttonText="Login with Google"
    />
  );

  return { user, error, GoogleLoginButton };
};

export default useGoogleLogin;


