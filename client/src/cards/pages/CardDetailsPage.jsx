

import React, { useEffect, useState } from "react";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container, Snackbar, Alert, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import mapCardToModel from "../helpers/normalization/mapCardToModel";
import CreateCardPage from "./CreateCardPage";
import { Delete } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { deleteComment, getComments, saveComment } from "../services/commentsApiService";

const CardDetailsPage = () => {
  const [cardInfo, setCardInfo] = useState();
  const { handleGetCard } = useCards();
  const { user } = useUser();
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      const newComment = {
        _id: uuidv4(),
        content: comment,
      };
      
      saveComment(user._id, cardId, newComment.content)
        .then((savedComment) => {
          refreshComments(cardId);
          setSnackbarOpen(true);
          setSnackbarMessage('תגובה נשלחה בהצלחה');
        })
        .catch((error) => {
          console.error("Error saving comment:", error);
        });
    }
  };

  const handleDeleteComment = (_id) => {
    deleteComment(_id)
      .then(res => {
        refreshComments(cardInfo._id);
        setSnackbarOpen(true);
        setSnackbarMessage('תגובה נמחקה בהצלחה');
      })
      .catch(err => {
        console.error(err);
      });
  };

  const refreshComments = (cardId) => {
    getComments(cardId)
      .then((res) => {
        console.log("Comments from server:", res); 
        setComments(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    handleGetCard(cardId).then(data => {
      const modeledCard = mapCardToModel(data);
      setCardInfo(modeledCard);
    });
  }, [cardId, handleGetCard]);

  useEffect(() => {
    if (!cardInfo) {
      return;
    }

    refreshComments(cardInfo._id);
  }, [cardInfo, cardInfo?._id]);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  
  return (
    <Container
      sx={{
        paddingTop: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        {cardInfo !== null && <CreateCardPage card={cardInfo} />}

        <List>
          {comments.map((comment, index) => (
            <Paper key={comment._id} elevation={3} style={{ margin: '10px', padding: '10px' }}>
              <ListItem>
                <ListItemText
                  primary={comment.content}
                  secondary={<Typography variant="body2" color="text.secondary">{comment.date}</Typography>}
                 
                  primaryTypographyProps={{ style: { color: 'black' } }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteComment(comment._id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>

        <TextField
          label="הוסף תגובה"
          value={comment}
          onChange={handleCommentChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddComment}>שלח</Button>
      </div>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CardDetailsPage;