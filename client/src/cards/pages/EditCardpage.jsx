import { useEffect, useState } from "react";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate , Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container } from "@mui/material";
 import { useParams } from "react-router-dom";
 import mapCardToModel from "../helpers/normalization/mapCardToModel";
import CreateCardPage from "./CreateCardPage";

 

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





