import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardMedia, CardContent, Avatar, CircularProgress, Fade, Button } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const EnlargableCardMedia = styled(CardMedia)`
  transition: transform 0.1s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
  }
`;


const Indexpage = () => {
  const [images] = useState([
    {
      img: 'https://i.ibb.co/JCPJQbB/AP20158830540005.jpg',
      name: 'מארק זוקרברג',
      description: 'מייסד פייסבוק',
    },
    {
      img: 'https://i.ibb.co/SKY4whN/S-Elon-Musk-Space-.jpg',
      name: 'אילון מאסק',
      description: 'מייסד טסלה וחברת החלל ספייסאקס',
    },
    {
      img: 'https://i.ibb.co/yQbJ30X/2.jpg',
      name: 'גף ביזוס',
      description: 'יו"ר הדירקטוריון ולשעבר נשיא ומנכ"ל של חברת אמזון',
    },
    {
      img: 'https://i.ibb.co/fpqkkjQ/Sundar-Pichai-60.jpg',
      name: 'סונדאר פיצאי',
      description: 'מנכ"ל חברת גוגל',
    },
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    setTimeout(() => {
      setLoading(false);
    }, 700);

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
  const handleRegisterClick = () => {
    navigate('/signup', { replace: true }); 
  };
  return (
    <Box sx={{ backgroundColor: '#f1f9f1', padding: '2rem', position: 'relative' }}>
      {loading && (
        <Fade in={loading}>
          <CircularProgress
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </Fade>
      )}
      <Typography variant="h3" align="center" gutterBottom>
        קדימה לקריירה שלך
      </Typography>
      <Typography variant="body1" align="center">
        אתר המציג לך אנשים מוצלחים מגמות קריירה שונות ומספרים את סיפורם, בוא תלמד מה הדרך הנכונה איך להיות עשיר
      </Typography>
      <Card sx={{ maxWidth: 400, margin: '2rem auto', backgroundColor: '#ffffff', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
        <EnlargableCardMedia
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
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
          <KeyboardArrowLeft sx={{ cursor: 'pointer' }} onClick={handlePrevImage} />
          <KeyboardArrowRight sx={{ cursor: 'pointer' }} onClick={handleNextImage} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
          <Button variant="contained" color="primary" size="large" onClick={handleRegisterClick}>
            הירשם עכשיו
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Indexpage;