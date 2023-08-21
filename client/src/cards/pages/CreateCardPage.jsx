import React, { useCallback, useEffect } from "react";
import useForm from "./../../forms/hooks/useForm";
import mapCardToForm from "./../helpers/initialForms/mapCardToForm";
import cardSchema from "../models/joi-schemas/cardSchema";
import useCards from "./../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container } from "@mui/material";
import CardForm from "../components/CardForm";
import normalizeCard from "../helpers/normalization/normalizeCard";

const CreateCardPage = ({card}) => {
  const { handleCreateCard, handleUpdateCard } = useCards();
  const { user } = useUser();
  const { value, setData, ...rest } = useForm(
    mapCardToForm(card),
    cardSchema,
    handleCreateCard
  );
  
  useEffect(() => {
    setData(mapCardToForm(card));
  }, [card, setData]);

  const formSubmitHandler = useCallback(() => {
    if (card) {
      // Update
      handleUpdateCard(card._id, normalizeCard({...value.data, user_id: card.user_id}));
    } else {
      // Create
      handleCreateCard(value.data);
    }
  }, [card, handleCreateCard, handleUpdateCard, value]);


  if (!user) return <Navigate replace to = {ROUTES.ROOT} /> ; 


  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CardForm
        title= "פרופיל"
        onSubmit={formSubmitHandler}
        onReset={rest.handleReset}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        data={value.data}
      />
    </Container>
  );
};

export default CreateCardPage;
