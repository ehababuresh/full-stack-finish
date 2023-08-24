import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Fade } from "@mui/material";
import { styled } from "@mui/system";
import CardForm from "../components/CardForm";
import useForm from "./../../forms/hooks/useForm";
import mapCardToForm from "./../helpers/initialForms/mapCardToForm";
import cardSchema from "../models/joi-schemas/cardSchema";
import useCards from "./../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import normalizeCard from "../helpers/normalization/normalizeCard";

const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CreateCardPage = ({ card }) => {
  const { handleCreateCard, handleUpdateCard } = useCards();
  const { user } = useUser();
  const { value, setData, ...rest } = useForm(
    mapCardToForm(card),
    cardSchema,
    handleCreateCard
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); 
    setData(mapCardToForm(card));
  }, [card, setData]);

  const formSubmitHandler = () => {
    if (card) {
      // Update
      handleUpdateCard(card._id, normalizeCard({ ...value.data, user_id: card.user_id }));
    } else {
      // Create
      handleCreateCard(value.data);
    }
  };

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {loading && (
        <Fade in={loading}>
          <StyledCircularProgress />
        </Fade>
      )}
      <CardForm
        title="פרופיל"
        onSubmit={formSubmitHandler}
        onReset={rest.handleReset}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        data={value.data}
        style={{ visibility: loading ? "hidden" : "visible" }}
      />
    </Container>
  );
};

export default CreateCardPage;
