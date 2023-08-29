import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "./../hooks/useCards";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import Grid from "@mui/material/Grid";

const CardsPage = () => {
  const { value, handleGetCards , handleDeleteCard } = useCards();
  const {isLoading , error,filteredCards} = value ; 
  const { user } = useUser();
 
  useEffect(() => {
    handleGetCards();
  }, []);

  const onDeleteCard = async cardId => {
    await handleDeleteCard(cardId);
    await handleGetCards();
  };

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;
  return (
    <Container>
    <Grid container justifyContent="right">
      <Grid item xs={12} sm={10} md={9}>
        <div sx={{ textAlign: 'right' }}> 
          <PageHeader
            title="האנשים המוצלחים"
            subtitle="כאן אתה יכול להיכנס ולקרוא על כל בנאדם מה הוא עשה בחיים שהגיע לרמת הצלחה גבוהה"
          />
        </div>
      </Grid>
    </Grid>
      <CardsFeedback
        cards={filteredCards}
        error={error}
        isLoading={isLoading}
        onDelete={onDeleteCard}
      />
    </Container>
  );
};

export default CardsPage;


