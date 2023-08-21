import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const UserProfile = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Name:</Typography>
        <Typography>{`${data.first} ${data.middle || ""} ${data.last}`}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Email:</Typography>
        <Typography>{data.email}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Phone:</Typography>
        <Typography>{data.phone}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Address:</Typography>
        <Typography>
          {`${data.street}, ${data.city}, ${data.state}, ${data.country}, ${data.zip || ""}`}
        </Typography>
      </Grid>
      {data.isBusiness && (
        <Grid item xs={12}>
          <Typography variant="h6">Business Account</Typography>
        </Grid>
      )}
      {data.textarea && (
        <Grid item xs={12}>
          <Typography variant="h6">Additional Text:</Typography>
          <Typography>{data.textarea}</Typography>
        </Grid>
      )}
      {data.url && (
        <Grid item xs={12}>
          <Typography variant="h6">Image URL:</Typography>
          <Typography>{data.url}</Typography>
        </Grid>
      )}
      {/* {data.imageFile && (
        <Grid item xs={12}>
          <Typography variant="h6">Uploaded Image:</Typography>
          <img src={URL.createObjectURL(data.imageFile)} alt={data.alt || "Uploaded Image"} style={{ maxWidth: "100%" }} />
        </Grid>
      )} */}
    </Grid>
  );
};

export default UserProfile;
