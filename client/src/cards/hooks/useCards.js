import { useCallback, useState, useMemo , useEffect } from "react";
import { createCard, getCards,getMyCards,ChangeLikeStatus,editCard,getCard, deleteCard} from "./../services/cardApiService";
import useAxios from "../../hooks/useAxios";
import normalizeCard from "./../helpers/normalization/normalizeCard";
import { useNavigate } from "react-router-dom";
import { useSnack } from "../../providers/SnackbarProvider";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import {useSearchParams} from "react-router-dom"
import { getComments, saveComment,updateComment,deleteComment } from "../services/commentsApiService";


const useCards = () => {

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState(null);
  const [card, setCard] = useState(null);
  const [query,setQuery] = useState ("");
  const [filteredCards,setFilter] = useState (null); 
  const [searchParams] = useSearchParams();
  const [comments, setComments] = useState([]);

  useEffect (() => {
    setQuery (searchParams.get("q") ?? "") ; 
  } , [searchParams]) ; 

  useEffect(() => {
    if (cards) {
      setFilter(
        cards.filter(
          card =>
          card.title.includes(query) || String(card.bizNumber).includes(query) 
         )
        ) ;
        }
  }, [cards,query] ) ;


  useAxios();
  const navigate = useNavigate();
  const snack = useSnack();
  const user = useUser();

  const requestStatus = (loading, errorMessage, cards, card = null) => {
    setLoading(loading);
    setError(errorMessage);
    setCards(cards);
    setCard(card);
  };


  const handleGetCards = async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      requestStatus(false, null, cards);
      return cards;
    } catch (error) {
      requestStatus(false, error, null);
    }
  };


  const handleGetMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getMyCards();
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);


  const handleGetCard = useCallback(async (cardId) => {
    try {
     setLoading(true);
      const card = await getCard(cardId);
      requestStatus(false, null,null, card);
      return card;
     } catch (error) {
     requestStatus(false, error, null);
     }
     }, []); 

     

  const handleLikeCard = useCallback(async cardId => {
    try {
      const card = await ChangeLikeStatus(cardId);
      requestStatus(false, null,cards, card);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  
  const handleDeleteCard = useCallback(async cardId => {
    try {
      const card = await deleteCard(cardId);
      requestStatus(false, null,null, card);
      snack ("success" , "The card has been successfully deleted ");
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, [user,snack]);


const handleUpdateCard = useCallback (
  async (cardId, normalizedCard) => {
    try {
      setLoading (true) ;
      const card = await editCard(cardId, normalizedCard) ;
      requestStatus (false , null , null, card) ;
      snack ("success" , "The business card has been successfully updated ");
      navigate (ROUTES.MY_CARDS);
    }catch (error) {
      requestStatus (false , error , null)
    } 
  },
  [snack]
);

  const handleGetFavCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await handleGetCards();
      const favCards = (cards || []).filter(
        card => !!card.likes.find(cardId => cardId === user.user._id)
      );
      requestStatus(false, null, favCards);
    } catch (error) {
      requestStatus(false, error, null)
     } 
    }, [user]);
    

  const handleCreateCard = useCallback(async cardFromClient => {
    try {
      setLoading(true);
      const normalizedCard = normalizeCard(cardFromClient);
      const card = await createCard(normalizedCard);
      requestStatus(false, null, null, card);
      snack("success", "A new business card has been created");
      navigate(ROUTES.MY_CARDS);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  
  const handleAddComment = useCallback(async (cardId, newComment) => {
    try {
      setLoading(true);
  
      if (!newComment) {
        return;
      }
  
      const comments = await getComments(cardId); 
      const savedComment = await saveComment(user._id, cardId, newComment); 
  
      setComments(comments); 
      setLoading(false);
      return savedComment; 
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, [setComments, user._id]);

  
  const value = useMemo(() => {
    return { isLoading, cards, card, error ,filteredCards,comments };
  }, [isLoading, cards, card, error , filteredCards,comments]);


  return {
    value,
    handleLikeCard,
    handleGetCards,
    handleGetMyCards,
    handleCreateCard,
    handleGetCard,
    handleUpdateCard,
    handleGetFavCards,
    handleDeleteCard,
    setCards,
    handleAddComment,
    
  };
};

export default useCards; 

