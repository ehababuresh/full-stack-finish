const express = require("express");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const normalizeCard = require("../helpers/normalizeCard");
const multer = require('multer');

const { uploadImage } = require('../models/cardsAccessDataService');

const {
  getCards,
  getMyCards,
  getCard,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
} = require("../models/cardsAccessDataService");
const validateCard = require("../validations/cardValidationService");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/my-cards", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const card = await getMyCards(userId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCard(id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const card = req.body;
    const user = req.user;
    const imageFile = req.file;

    if (!user.isBusiness)
      return handleError(res, 403, "Authentication Error: Unauthorized user");

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const normalizedCard = await normalizeCard(card, user._id, imageFile); 

    const createdCard = await createCard(normalizedCard);

    return res.status(201).send(createdCard);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let card = req.body;
    const cardId = req.params.id;
    const userId = req.user._id;

    if (userId !== card.user_id) {
      const message =
        "Authorization Error: Only the user who created the business card can update its details";
      return handleError(res, 403, message);
    }

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    card = await normalizeCard(card);
    card = await updateCard(cardId, card);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.user._id;

    const card = await likeCard(cardId, userId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const user = req.user;

    const card = await deleteCard(cardId, user);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
