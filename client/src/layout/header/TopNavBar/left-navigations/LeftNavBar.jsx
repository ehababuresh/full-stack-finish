import React from "react";
import Box from "@mui/material/Box";
import Logo from "../Logo/Logo";
import LogoIcon from "../Logo/LogoIcon";
import NavItem from "../../../../routes/components/NavItem";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";

const LeftNavBar = () => {
  const { user } = useUser();

  return (
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <NavItem
          sx={{
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.2)",
            },
          }}
          label="about"
          to={ROUTES.ABOUT}
        />

        {user && (
          <NavItem
            sx={{
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
            label="Fav profile"
            to={ROUTES.FAV_CARDS}
          />
        )}

        {user && user.isBusiness && (
          <NavItem
            sx={{
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
            label="My profiles"
            to={ROUTES.MY_CARDS}
          />
        )}

        {user && (
          <NavItem
            sx={{
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
            label="Contact us"
            to={ROUTES.CONTACT}
          />
        )}
      </Box>
    </Box>
  );
};

export default LeftNavBar;
