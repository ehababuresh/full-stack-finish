import React from "react";
import CardMedia from "@mui/material/CardMedia";
import imageType from "./../../models/types/imageType";

const CardHead = ({ image }) => {
  return (
    <CardMedia component="img" image={image.url} height="194" alt={image.alt} />
  );
};

CardHead.propTypes = {
  image: imageType.isRequired,
};

export default CardHead;
