import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Typography variant="h3" component="h1">
          דף אודות
        </Typography>
      </div>
      <PageHeader
        title=""
        subtitle="בדף זה תוכלו לקרוא על המשתמש ולראות את ההישגים שלו"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="/assets/images/avatar.png" // ניתן להחליף לנתיב התמונה שלך
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
  );
};

export default AboutPage;
