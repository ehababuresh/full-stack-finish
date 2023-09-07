import React from "react";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Divider, Box, Typography } from "@mui/material";
import cardType from "../../models/types/cardType";
import PropTypes from "prop-types";

const CardBody = ({ card, commentCount }) => { 
  const { street, houseNumber, state, city, country } = card.address;
  return (
    <CardContent>
      <CardHeader
        title={card.title}
        subheader={card.subtitle}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '10vh',
        }}
      />
      <Divider />
      <Box mt={1}>
        <Typography variant="body2" color="text.secondary">
          <Typography fontWeight={700} component="span">
            salary:{" "}
          </Typography>
          {state}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Typography fontWeight={700} component="span">
            address:{" "}
          </Typography>
          {/* {street} {houseNumber} */}
          {country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Typography fontWeight={700} component="span">
            {/* email:{" "} */}
          </Typography>
          {/* {card.email} */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Typography fontWeight={700} component="span">
            {/* כמות תגובות:{" "}  */}
          </Typography>
          {commentCount}
        </Typography>
      </Box>
    </CardContent>
  );
};

CardBody.propTypes = {
  card: cardType.isRequired,
  commentCount: PropTypes.number.isRequired, 
};

export default CardBody;
