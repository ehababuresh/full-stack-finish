import React, { useEffect, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import PageHeader from "../../components/PageHeader";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import useCards from "../hooks/useCards";
import CardsFeedback from "../components/CardsFeedback";
import Grid from "@mui/material/Grid";

const MyCardsPage = () => {
  const { user } = useUser();
  const { value, handleGetMyCards, handleDeleteCard } = useCards();
  const { isLoading, error, cards, filteredCards } = value;
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await handleGetMyCards();
      setLoading(false);
    };
    loadData();
  }, []);

  if (!user || !user.isBusiness) return <Navigate replace to={ROUTES.ROOT} />;

  const onDeleteCard = async (cardId) => {
    setLoading(true);
    await handleDeleteCard(cardId);
    await handleGetMyCards();
    setLoading(false);
  };

  return (
    <Container sx={{ position: "relative", minHeight: "92vh" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <PageHeader
            title="המשתמשים שהוספתי"
            subtitle="פה אפשר לראות האנשים שהוספתי ולספר את סיפוריהם"
          />
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress
          sx={{ position: "absolute", bottom: 75, right: 16 }}
        />
      ) : (
        cards && (
          <Fab
            onClick={() => navigate(ROUTES.CREATE_CARD)}
            color="primary"
            aria-label="add"
            sx={{
              position: "absolute",
              bottom: 75,
              right: 16,
            }}
          >
            <AddIcon />
          </Fab>
        )
      )}
      <CardsFeedback
        isLoading={isLoading}
        error={error}
        cards={filteredCards}
        onDelete={onDeleteCard}
      />
    </Container>
  );
};

export default MyCardsPage;
