import { useEffect, useState } from "react";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import cardSchema from "../models/joi-schemas/cardSchema";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate , Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container } from "@mui/material";
import CardForm from "../components/CardForm";
 import Input from "../../forms/components/Input";
 import { useParams } from "react-router-dom";
 import mapCardToModel from "../helpers/normalization/mapCardToModel";
 import normalizeCard from "../helpers/normalization/normalizeCard";
import CreateCardPage from "./CreateCardPage";
import { textAlign } from "@mui/system";
 

const EditCardPage = () => {
    const [cardInfo, setCardInfo] = useState();
    const {handleUpdateCard , handleGetCard , card} = useCards ();
    const {user} = useUser() ;  
    const {cardId} = useParams ();
    const navigate = useNavigate ();


  useEffect (()  => {
      handleGetCard(cardId).then(data => {
          // if (user._id !== data.user_id) navigate (ROUTES.CARDS); 
          const modeledCard = mapCardToModel(data); 
          setCardInfo(modeledCard);
      });
  }, [cardId, handleGetCard, navigate, user?._id]); 


if (!user) return <Navigate replace to = {ROUTES.ROOT} /> ; 


return (
 

<Container

      sx={{
        
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <h2 sx={{ textAlign:"center",alignItems: "center"}}></h2>

      {cardInfo !== null && <CreateCardPage card={cardInfo}/>} 
      {/* <CardForm
        title="edit card"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        data={value.data}
        to = {ROUTES.CARDS}
        
      /> */}

    </Container>
)
}

export default EditCardPage;





