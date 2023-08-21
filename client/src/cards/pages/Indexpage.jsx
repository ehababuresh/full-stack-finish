
import React, { useEffect, useState } from "react";
import { Typography, Box, Card, CardMedia, CardContent, Avatar } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const Indexpage = () => {
  const [images] = useState([
    {
      
      img:  "https://i.ibb.co/JCPJQbB/AP20158830540005.jpg",
      name: 'מארק זוקרברג',
      description: 'מייסד פייסבוק',
    },
    {
      img:  "https://i.ibb.co/SKY4whN/S-Elon-Musk-Space-.jpg",
      name: 'אילון מאסק',
      description: 'מייסד טסלה וחברת החלל ספייסאקס',
    },
    {
      img:  "https://i.ibb.co/yQbJ30X/2.jpg",
      name: 'גף ביזוס',
      description: 'יו"ר הדירקטוריון ולשעבר נשיא ומנכ"ל של חברת אמזון',
    },
    {
      img:  "https://i.ibb.co/fpqkkjQ/Sundar-Pichai-60.jpg",
      name: ' סונדאר פיצאי',
      description: 'מנכ"ל חברת גוגל',
    },
  
    // Add more images with their respective names and descriptions...
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", padding: "2rem" }}>
      <Typography variant="h3" align="center" gutterBottom>
        קדימה לקריירה שלך
      </Typography>
      <Typography variant="body1" align="center">
         אתר המציג לך אנשים מוצלחים מגמות קריירה שונות ומספרים את סיפורם,בוא תלמד מה הדרך הנכונה איך להיות עשיר
      </Typography>
      <Card sx={{ maxWidth: 400, margin: "2rem auto" }}>
        <CardMedia
          component="img"
          height="300"
          image={images[currentImageIndex].img}
          alt={images[currentImageIndex].name}
          onClick={() => handleImageClick(currentImageIndex)}
        />
        <CardContent>
          <Typography variant="h5">{images[currentImageIndex].name}</Typography>
          <Typography variant="body2">
            {images[currentImageIndex].description}
          </Typography>
          <Avatar
            sx={{ width: 48, height: 48 }}
            alt={images[currentImageIndex].name}
            src={images[currentImageIndex].img}
          />
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <KeyboardArrowLeft onClick={handlePrevImage} />
          <KeyboardArrowRight onClick={handleNextImage} />
        </Box>
      </Card>
    </Box>
  );
};

export default Indexpage;
