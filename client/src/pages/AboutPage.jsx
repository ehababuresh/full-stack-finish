import React, { useState, useEffect } from "react";
import { Typography, Box, Card, CardContent, CardMedia, CircularProgress, Fade, Grid, Container, Divider } from "@mui/material";

const AboutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f1f9f1", padding: "2rem", position: "relative" }}>
      {loading && (
        <Fade in={loading}>
          <CircularProgress style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        </Fade>
      )}
      {!loading && (
        <Container maxWidth="lg">
          <Box textAlign="center" marginBottom="2rem">
            <Typography variant="h3" component="h1" gutterBottom>
              דף אודות
            </Typography>
            <Divider variant="middle" />
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardMedia
                  component="img"
                  height="300"
                  image="/assets/images/avatar.png" 
                  alt="avatar"
                />
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    יוסף כהן
                  </Typography>
                  <Typography variant="body1" paragraph>
                    יזם, מרצה, ואיש עסקים. 
                  </Typography>
                  <Divider />
                  <Typography variant="body2" color="textSecondary" paragraph>
                    משפץ טיפים ותובנות להצלחה בעסקים ובחיים.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph>
                בכרטיס האישי של יוסף כהן, תוכלו לראות את הקריירה המרתקת שלו.
              </Typography>
              <Typography variant="body1" paragraph>
                יוסף כהן התמחה בניהול עסקים ופיתוח אישי, והוא משתף את ההישגים וההתמודדויות שלו בדרכו להצלחה.
              </Typography>
              <Typography variant="body1" paragraph>
                יחד עם זאת, יוסף כהן מציע טיפים וכלים שיכולים לעזור לכם להגשים את חלומותיכם ולהיות מוצלחים בקריירה ובחיים.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default AboutPage;
