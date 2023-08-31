import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import NavBarLink from "../../../../routes/components/NavBarLink";
import ROUTES from "./../../../../routes/routesModel";

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <NavBarLink to={ROUTES.CARDS}>
      <Typography
        variant="h4"
        sx={{
          display: { xs: "none", md: "inline-flex" },
          marginRight: 2,
          fontFamily: "fantasy",
          fontSize: isHovered ? "2.2rem" : "2rem",
          transition: "font-size 0.2s ease-in-out",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        eab
      </Typography>
    </NavBarLink>
  );
};

export default Logo;
