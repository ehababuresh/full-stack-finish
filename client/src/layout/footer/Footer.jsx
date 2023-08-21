

import React, { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import PortraitIcon from "@mui/icons-material/Portrait";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailIcon from "@mui/icons-material/Mail";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { styled } from "@mui/system";

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  && {
    color: black;
  }
`;

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const currentYear = new Date().getFullYear();
  const name = "ehab";

  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [isArrowVisible, setIsArrowVisible] = useState(false);

  const handleScroll = () => {
    setIsFooterVisible(window.scrollY >= 100);
    setIsArrowVisible(window.scrollY < 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/", "_blank");
  };

  return (
    <Paper
      sx={{
        position: "sticky",
        bottom: isFooterVisible ? 0 : -100,
        left: 0,
        right: 0,
        transition: "bottom 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="About"
          icon={<InfoIcon />}
          onClick={() => navigate(ROUTES.ABOUT)}
        />
        {user && (
          <BottomNavigationAction
            label="Liked"
            icon={<FavoriteIcon />}
            onClick={() => navigate(ROUTES.FAV_CARDS)}
          />
        )}
        {user && user.isBusiness && (
          <BottomNavigationAction
            label="My profiles"
            icon={<PortraitIcon />}
            onClick={() => navigate(ROUTES.MY_CARDS)}
          />
        )}
        <BottomNavigationAction
          label="Facebook"
          icon={<FacebookIcon />}
          onClick={() => window.open("https://www.facebook.com/", "_blank")}
        />
        <BottomNavigationAction
          label="Instagram"
          icon={<InstagramIcon />}
          onClick={() => window.open("https://www.instagram.com/", "_blank")}
        />
        <BottomNavigationAction
          label="Twitter"
          icon={<TwitterIcon />}
          onClick={() => window.open("https://www.twitter.com/", "_blank")}
        />
        <BottomNavigationAction
          label="LinkedIn"
          icon={<LinkedInIcon />}
          onClick={handleLinkedInClick}
        />
        <BottomNavigationAction
          label="Contact"
          icon={<MailIcon />}
          onClick={() => navigate(ROUTES.CONTACT)}
        />
      </BottomNavigation>
      <Typography variant="caption" align="center" sx={{ my: 1 }}>
        &copy; {currentYear} {name}
      </Typography>
      {isArrowVisible && (
        <ArrowDownwardIcon
          onClick={() => window.scroll({ top: window.innerHeight, behavior: "smooth" })}
          sx={{
            position: "absolute",
            bottom: 10,
            fontSize: "2rem",
            cursor: "pointer",
            transition: "bottom 0.3s ease",
            "&:hover": {
              bottom: 20,
            },
          }}
        />
      )}
    </Paper>
  );
};

export default Footer;
