import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

const ContactPage = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/contact-us`, formData);
      if (response.status === 200) {
        console.log("נשלחו הפרטים:", formData);
        setSubmissionStatus("success");
      } else {
        console.error("Failed to send form data");
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Error sending form data:", error);
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container>
      <Grid container justifyContent="center" my={4}>
        <StyledTypography variant="h4" align="center">
          צור קשר
        </StyledTypography>
      </Grid>
      <StyledTypography variant="body1" align="right">
        כאן תוכל למלא את פרטיך ולשלוח לנו הודעה. נשמח לשמוע ממך!
      </StyledTypography>
      {loading ? (
        <Grid container justifyContent="center" my={4}>
          <CircularProgress />
        </Grid>
      ) : submissionStatus === "success" ? (
        <Typography variant="body1" align="center">
          ההודעה נשלחה בהצלחה!
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label="שם מלא"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="כתובת אימייל"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="הודעה"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            שלח
          </Button>
        </form>
      )}
    </Container>
  );
};

const StyledTypography = styled(Typography)`
  && {
    color: #333;
    text-align: right;
  }
`;

export default ContactPage;
