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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams } from "react-router-dom";
import mapCardToModel from "../helpers/normalization/mapCardToModel";
import CreateCardPage from "./CreateCardPage";
import { Delete } from "@mui/icons-material";
import {
  deleteComment,
  getComments,
  saveComment,
} from "../services/commentsApiService";
import CardBody from "../components/card/CardBody";

const CardDetailsPage = () => {
  const [cardInfo, setCardInfo] = useState();
  const { handleGetCard } = useCards();
  const { user } = useUser();
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [senderName, setSenderName] = useState("");
  const [comments, setComments] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [commentToReadMore, setCommentToReadMore] = useState(null);

  // State for handling the delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [commentToDeleteId, setCommentToDeleteId] = useState(null);

  // State for comment count
  const [commentCount, setCommentCount] = useState(0);

  // Function to open the delete confirmation dialog
  const openDeleteDialog = (commentId) => {
    setCommentToDeleteId(commentId);
    setDeleteDialogOpen(true);
  };

  // Function to close the delete confirmation dialog
  const closeDeleteDialog = () => {
    setCommentToDeleteId(null);
    setDeleteDialogOpen(false);
  };

  
// Function to handle comment deletion
const handleConfirmDelete = () => {
  if (commentToDeleteId) {
    const commentToDelete = comments.find(
      (comment) => comment._id === commentToDeleteId
    );

    if (!commentToDelete) return; // Exit if no such comment is found

    // Allow the delete operation only if the user is an admin or the owner of the comment
    if (user.isAdmin || commentToDelete.userId === user._id) {
      deleteComment(commentToDeleteId)
        .then((res) => {
          refreshComments(cardId);
          setSnackbarOpen(true);
          setSnackbarMessage("תגובה נמחקה בהצלחה");
          closeDeleteDialog();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // Display an error message or prevent the delete action
      console.error("You are not authorized to delete this comment.");
      // Optionally, show an error message to the user
    }
  }
};


  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      setIsSending(true);
      saveComment(user._id, cardId, comment, senderName)
        .then((savedComment) => {
          refreshComments(cardId);
          setSnackbarOpen(true);
          setSnackbarMessage(`תגובה נשלחה בהצלחה`);
          setIsSending(false);
          setComment("");
          setSenderName("");
        })
        .catch((error) => {
          console.error("Error saving comment:", error);
          setIsSending(false);
        });
    }
  };

  const handleDeleteComment = (_id) => {
    openDeleteDialog(_id);
  };

  const refreshComments = (cardId) => {
    getComments(cardId)
      .then((res) => {
        setComments(res);
        setCommentCount(res.length);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleReadMore = (content) => {
    setCommentToReadMore(content);
  };

  useEffect(() => {
    setIsLoading(true);
    handleGetCard(cardId).then((data) => {
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
      {cardInfo && <CreateCardPage card={cardInfo} commentCount={commentCount} />}
      <br />
      <br />
      <div>
        <TextField
          label="שם השולח"
          variant="outlined"
          value={senderName}
          onChange={(event) => setSenderName(event.target.value)}
          fullWidth
        />
      </div>
      <br />
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
            maxLength: 5000,
          }}
        />
      </div>
      <br />
      <Button variant="contained" onClick={handleAddComment} disabled={isSending}>
        {isSending ? <CircularProgress size={24} /> : "שלח"}
      </Button>

      {/* Comment count */}
      <Typography variant="body2" color="text.secondary">
        <Typography fontWeight={700} component="span">
          כמות תגובות:{" "}
        </Typography>
        {commentCount}
      </Typography>

      <List>
        {comments.map((comment) => (
          <Paper
            key={comment._id}
            elevation={3}
            style={{ margin: "10px", padding: "10px" }}
          >
            <ListItem>
              <ListItemText
                primary={
                  commentToReadMore === comment.content
                    ? comment.content
                    : comment.content.slice(0, 500)
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      שולח: {comment.senderName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleString("he-IL", {
                            hour: "2-digit",
                            minute: "2-digit",
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                        : "תאריך לא זמין"}
                    </Typography>
                  </>
                }
              />
              {comment.content.length > 500 &&
                commentToReadMore !== comment.content && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleReadMore(comment.content)}
                  >
                    קרא עוד
                  </Button>
                )}
              {commentToReadMore === comment.content && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setCommentToReadMore(null)}
                >
                  סגור
                </Button>
              )}
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))}
      </List>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">האם למחוק תגובה זו?</DialogTitle>
        <DialogContent>
          <Typography>האם אתה בטוח שברצונך למחוק את התגובה?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            ביטול
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            מחק
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CardDetailsPage;
