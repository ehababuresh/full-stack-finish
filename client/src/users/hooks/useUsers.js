
// export default useUsers;
import { useState, useCallback, useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import { login, signup, sendResetEmail, resetPassword } from "./../services/userApiService"; 
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();
  useAxios();
  
  const requestStatus = useCallback(
    (loading, errorMessage, users, user = null) => {
      setLoading(loading);
      setError(errorMessage);
      setUser(user);
      setUsers(users);
    },
    [setUser]
  );

  
  const handleSendResetEmail = useCallback(
    async (email) => {
      try {
        setLoading(true);
        await sendResetEmail(email);
        requestStatus(false, null, null);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus]
  );
  
  const handleResetPassword = useCallback(
    async (email, verificationCode, newPassword) => {
      try {
        setLoading(true);
        await resetPassword(email, verificationCode, newPassword);
        requestStatus(false, null, null);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus]
  );

  const handleLogin = useCallback(
    async user => {
      try {
        setLoading(true);
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFromLocalStorage = getUser();
        requestStatus(false, null, null, userFromLocalStorage);
        navigate(ROUTES.CARDS);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [navigate, requestStatus, setToken]
  );

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);

  const handleSignup = useCallback(
    async user => {
      try {
        setLoading(true);
        const normalizedUser = normalizeUser(user);
        await signup(normalizedUser);
        await handleLogin({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [handleLogin, requestStatus]
  );

  return {
    isLoading,
    error,
    user,
    users,
    handleLogin,
    handleLogout,
    handleSignup,
    handleSendResetEmail, 
    handleResetPassword, 
  };
};

export default useUsers;




