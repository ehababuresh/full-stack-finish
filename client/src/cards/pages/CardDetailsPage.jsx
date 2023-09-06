import React, { useEffect, useState } from "react";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import {
  Container,
  Snackbar,
  Alert,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import mapCardToModel from "../helpers/normalization/mapCardToModel";
import CreateCardPage from "./CreateCardPage";
import { Delete } from '@mui/icons-material';
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setIsSending(true);
      saveComment(user._id, cardId, comment, user.name) 
        .then((savedComment) => {
          refreshComments(cardId);
          setSnackbarOpen(true);
          setSnackbarMessage(`תגובה נשלחה בהצלחה`); 
          setIsSending(false);
          setComment('');
        })
        .catch((error) => {
          console.error("Error saving comment:", error);
          setIsSending(false);
        });
    }
  };


  const handleDeleteComment = (_id) => {
    deleteComment(_id)
      .then(res => {
        refreshComments(cardId);
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
        setComments(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    handleGetCard(cardId).then(data => {
      const modeledCard = mapCardToModel(data);
      setCardInfo(modeledCard);
      setIsLoading(false);
    });
  }, [cardId, handleGetCard]);

  useEffect(() => {
    if (!cardInfo) {
      return;
    }
    refreshComments(cardId);
  }, [cardInfo, cardId]);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      {cardInfo && <CreateCardPage card={cardInfo} />}
      <br/>
      <br/>
      <div>
      <TextField
  label="הוסף תגובה"
  multiline
  rows={5} 
  variant="outlined" 
  value={comment}
  onChange={handleCommentChange}
  fullWidth
  inputProps={{
    maxLength: 5000 
  }}
/>
      </div>
      <br/>
      <Button variant="contained" onClick={handleAddComment} disabled={isSending}>
        {isSending ? <CircularProgress size={24}/> : 'שלח'}
      </Button>

      <List>
        {comments.map((comment) => (
          <Paper key={comment._id} elevation={3} style={{ margin: '10px', padding: '10px' }}>
            <ListItem>
              <ListItemText
                primary={comment.content}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {comment.senderName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleString('he-IL', {
                        hour: '2-digit',
                        minute: '2-digit',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }) : 'תאריך לא זמין'}
                    </Typography>
                  </>
                }
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

      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CardDetailsPage;
