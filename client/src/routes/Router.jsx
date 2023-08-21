import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import CardsPage from "../cards/pages/CardsPage";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import CardDetailsPage from "../cards/pages/CardDetailsPage";
import LoginPage from "../users/pages/LoginPage";
import SignupPage from "../users/pages/SignupPage";
import FavCardsPage from "../cards/pages/FavCardsPage";
import MyCardsPage from "../cards/pages/MyCardsPage";
import CreateCardPage from "../cards/pages/CreateCardPage";
import EditCardPage from "../cards/pages/EditCardpage";
import EditUserpage from "../users/pages/EditUserpage";
import Indexpage from "../cards/pages/Indexpage";

import ContactPage from "../cards/pages/Contactpage";
import ProfilePage from "../users/pages/Profilepage";

import ForgotPasswordPage from "../users/pages/ForgotPasswordPage";
import ResetPasswordPage from "../users/pages/ResetPasswordPage";
import VerificationPage from "../users/pages/VerificationPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Indexpage />} />
      <Route path={ROUTES.CARDS} element={<CardsPage />} />
  
     <Route path={ROUTES.CONTACT} element={<ContactPage />} />
     <Route path={ROUTES.FAV_CARDS} element={<FavCardsPage />} />
    <Route path={ROUTES.MY_CARDS} element={<MyCardsPage />} />
<Route path={ROUTES.CREATE_CARD} element={<CreateCardPage />} />

<Route path={`${ROUTES.CARD_DETAILS}/:cardId`} element={<CardDetailsPage />} />
<Route path={`${ROUTES.EDIT_CARD}/:cardId`} element={<EditCardPage />} />
  
      <Route path={`${ROUTES.USER_PROFILE}/:userId`} element={<ProfilePage />} />
      <Route path={ROUTES.EDIT_USER} element={<EditUserpage/>} />
      
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.FORGET_PASSWORD} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
      <Route path={ROUTES.VERY} element={<VerificationPage/>} />

    
      <Route path="*" element={<ErrorPage />} />
      <Route path={ROUTES.ROOT} element={<Indexpage />} />
    </Routes>
  );
};

export default Router;
