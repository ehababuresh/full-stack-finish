import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "./../hooks/useCards";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";




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
     <div sx={{ textAlign: 'center'}}>
    <PageHeader
      title="האנשים המוצלחים"
      subtitle="כאן אתה יכול להיכנס ולקרוא על כל בנאדם מה הוא עשה בחיים שהגיע לרמת הצלחה גבוהה"
    />
  </div>
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


