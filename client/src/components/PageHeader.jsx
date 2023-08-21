import React from "react";
import { string } from "prop-types";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

const PageHeader = ({ title, subtitle }) => {
  return (
    <>
      <Typography variant="h2" component="h1">
        {title}
      </Typography>
      <Typography variant="h5" component="h2">
        {subtitle}
      </Typography>
      <Divider sx={{ my: 2 }} />
    </>
  );
};

PageHeader.propTypes = {
  title: string.isRequired,
  subtitle: string.isRequired,
};

export default PageHeader;
