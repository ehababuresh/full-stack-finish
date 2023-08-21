import React, { useState } from 'react';
import { Card, CardContent, TextField, Button } from '@mui/material';


const EditUserpage = () => {
  const [card, setCard] = useState({ title: 'Card Title', content: 'Card Content' });
  const [updatedCard, setUpdatedCard] = useState({});

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setCard(updatedCard);
  };

  const handleInputChange = (event) => {
    setUpdatedCard({ ...updatedCard, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Card>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              name="title"
              label="Title"
              value={updatedCard.title || card.title}
              onChange={handleInputChange}
            />
            <TextField
              name="subtitle"
              label="subtitle"
              value={updatedCard.subtitle || card.subtitle}
              onChange={handleInputChange}
            />
             <TextField
              name="subtitle"
              label="subtitle"
              value={updatedCard.content || card.content}
              onChange={handleInputChange}
            />
             {/* <UserForm/> */}
            
            <Button type="submit">Update Card</Button>
          </form>
        </CardContent>
      </Card>
     
      
    </div>
  );
};



export default EditUserpage;
