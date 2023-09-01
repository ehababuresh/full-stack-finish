import React, { useState } from "react";
import { func } from "prop-types";
import MuiCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardBody from "./CardBody";
import CardHead from "./CardHead";
import CardActionBar from "./CardActionBar";
import cardType from "./../../models/types/cardType";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import { useUser } from "../../../users/providers/UserProvider";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors"; 

const Card = ({ card, onDelete, onLike }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <MuiCard
      sx={{
        minWidth: 280,
        transform: `scale(${isHovered ? 1.03 : 1})`, 
        transition: "transform 0.2s ease-in-out", 
        borderRadius: "20%",
        backgroundColor: isHovered ? green[50] : "white", 
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardActionArea
        onClick={() => navigate(`${ROUTES.CARD_DETAILS}/${card._id}`)}
      >
        {/* <CardHead image={card.image} /> */}
        <CardBody card={card} />
      </CardActionArea>

      {user && (
        <CardActionBar
          cardId={card._id}
          onDelete={onDelete}
          onLike={onLike}
          userId={card.user_id}
          cardUserId={card.user_id}
          cardLikes={card.likes}
        />
      )}

      {user && card.user && user._id === card.user._id && (
        <div style={{ textAlign: "center" }}>
          <Avatar
            src={card.user.avatar}
            alt={card.user.name}
            sx={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              width: "48px",
              height: "48px",
              border: "20px solid #fff",
            }}
          />
          <h3 style={{ margin: 0, marginTop: "60px" }}>שלום {card.user.name}</h3>
          <p style={{ fontSize: "14px", color: "#888" }}>
            {card.user.description}
          </p>
        </div>
      )}
    </MuiCard>
  );
};

Card.propTypes = {
  card: cardType.isRequired,
  onDelete: func.isRequired,
  onLike: func.isRequired,
};

export default React.memo(Card);
