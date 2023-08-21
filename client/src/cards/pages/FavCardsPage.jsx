import { useCallback } from "react";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import PageHeader from "../../components/PageHeader";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import CardsFeedback from "../components/CardsFeedback";
import Grid from "@mui/material/Grid";

const FavCardsPage = () => {
  const { user } = useUser();
  const { value, ...rest } = useCards();
  const { isLoading, error, cards, filteredCards } = value;
  const { handleDeleteCard, handleGetFavCards } = rest;

  useEffect(() => {
    handleGetFavCards();
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
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <PageHeader
            title="האנשים המוצלחים שאהבתי"
            subtitle="פה אפשר לראות האנשים שאני אהבתי הסיפור שלהם"
          />
        </Grid>
      </Grid>

      <CardsFeedback
        isLoading={isLoading}
        error={error}
        cards={filteredCards}
        onDelete={onDeleteCard}
        onLike={changeLikeStatus}
      />
    </Container>
  );
};
export default FavCardsPage;
