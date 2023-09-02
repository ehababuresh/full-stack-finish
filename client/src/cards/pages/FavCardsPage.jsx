import React, { useEffect, useState, useCallback } from "react";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import PageHeader from "../../components/PageHeader";
import Container from "@mui/material/Container";
import CardsFeedback from "../components/CardsFeedback";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const FavCardsPage = () => {
  const { user } = useUser();
  const { value, ...rest } = useCards();
  const { isLoading, error, cards, filteredCards } = value;
  const { handleDeleteCard, handleGetFavCards } = rest;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetFavCards().finally(() => {
      setTimeout(() => setLoading(false), 500); 
    });
  }, []);

  const onDeleteCard = useCallback(
    async (cardId) => {
      await handleDeleteCard(cardId);
      await handleGetFavCards();
    },
    [handleDeleteCard]
  );

  const changeLikeStatus = useCallback(async () => {
    await handleGetFavCards();
  }, []);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container>
      {loading && (
        <CircularProgress style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      )}
      {!loading && (
        <>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={8}>
              <PageHeader
                title="האנשים המוצלחים שאהבתי"
                subtitle="פה אפשר לראות האנשים שאני אהבתי הסיפור שלהם"
              />
            </Grid>
          </Grid>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <CardsFeedback
              isLoading={isLoading}
              error={error}
              cards={filteredCards}
              onDelete={onDeleteCard}
              onLike={changeLikeStatus}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default FavCardsPage;
