import React, { useState, useEffect } from "react";
import { Typography, Box, Card, CardContent, CardMedia, CircularProgress, Fade, Grid, Container } from "@mui/material";

const AboutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", padding: "2rem", position: "relative" }}>
      {loading && (
        <Fade in={loading}>
          <CircularProgress style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        </Fade>
      )}
      {!loading && (
        <Container maxWidth="lg">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Typography variant="h3" component="h1">
              דף אודות
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image="/assets/images/avatar.png" 
                  alt="avatar"
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    יוסף כהן
                  </Typography>
                  <Typography variant="body1">
                    אני איש עסקים מוצלח, יזם ומרצה. למדתי ופעלתי במגוון תחומים ובניתי
                    קריירה מוצלחת בעסקים. בדף זה אני משתף אתכם בדרכי להצלחה ומשאיר
                    טיפים ותובנות שצברתי במהלך הדרך. גלו את הקריירה שלי ותוכלו ללמוד
                    מההצלחות והשגים שלי.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                בכרטיס האישי של יוסף כהן, תוכלו לראות את הקריירה המרתקת שלו. יוסף
                כהן התמחה בניהול עסקים ופיתוח אישי, והוא משתף את ההישגים וההתמודדויות
                שלו בדרכו להצלחה. יחד עם זאת, יוסף כהן מציע טיפים וכלים שיכולים לעזור
                לכם להגשים את חלומותיכם ולהיות מוצלחים בקריירה ובחיים.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default AboutPage;
