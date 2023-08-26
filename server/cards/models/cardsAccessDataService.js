const Card = require("./mongodb/Card");
const Comment = require("./mongodb/Comment");
const { handleBadRequest } = require("../../utils/handleErrors");
const Image= require("./mongodb/Image");

const multer = require("multer");

const DB = process.env.DB || "MONGODB";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const upload = multer({ storage: storage });


const getCards = async () => {
  if (DB === "MONGODB") {
    try {
      const cards = await Card.find();
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get cards not in mongodb");
};

const getMyCards = async userId => {
  if (DB === "MONGODB") {
    try {
      const cards = await Card.find({ user_id: userId });
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get card not in mongodb");
};

const getCard = async cardId => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findById(cardId);
      if (!card) throw new Error("Could not find this card in the database");
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get card not in mongodb");
};

const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const imageName = Date.now() + "-" + file.originalname;
    const imagePath = 'uploads/' + imageName;
    
    file.mv(imagePath, (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        reject(new Error("Failed to upload image"));
      }
      
      // יכול להחזיר את הנתיב המלא לתמונה
      resolve(imagePath);
    });
  });
};


const createCard = async (normalizedCard, imageFile = null) => {
  if (DB === "MONGODB") {
    try {
      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        const newImage = {
          url: imageUrl,
          alt: "Image Alt Text",
        };
        const card = new Card({
          ...normalizedCard,
          image: newImage,
        });
        const savedCard = await card.save();
        return Promise.resolve(savedCard);
      } else {
        const card = new Card(normalizedCard);
        const savedCard = await card.save();
        return Promise.resolve(savedCard);
      }
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("createCard not in mongodb");
};


const updateCard = async (cardId, normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findByIdAndUpdate(cardId, normalizedCard, {
        new: true,
      });

      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card updateCard not in mongodb");
};

const likeCard = async (cardId, userId) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findById(cardId);
      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      const cardLikes = card.likes.find(id => id === userId);

      if (!cardLikes) {
        card.likes.push(userId);
        card = await card.save();
        return Promise.resolve(card);
      }

      const cardFiltered = card.likes.filter(id => id !== userId);
      card.likes = cardFiltered;
      card = await card.save();
      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card likeCard not in mongodb");
};

const deleteCard = async (cardId, user) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findById(cardId);

      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      if (!user.isAdmin && user._id !== card.user_id)
        throw new Error(
          "Authorization Error: Only the user who created the business card or admin can delete this card"
        );

      card = await Card.findByIdAndDelete(cardId);

      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};




const getCardComments = async cardId => {
  if (DB === "MONGODB") {
    try {
      const comments = await Comment.find({ cardId: cardId });
      return Promise.resolve(comments);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get comments not in mongodb");
};


const addCardComment = async (cardId, authorId, userId, content) => {
  if (DB === "MONGODB") {
    try {
      const newComment = new Comment({
        cardId: cardId,
        authorId: authorId,
        userId: userId,
        content: content,
      });
      await newComment.save();
      return Promise.resolve(newComment);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("add comment not in mongodb");
};



exports.getCards = getCards;
exports.getMyCards = getMyCards;
exports.getCard = getCard;
exports.createCard = createCard;
exports.updateCard = updateCard;
exports.likeCard = likeCard;
exports.deleteCard = deleteCard;


exports.getCardComments = getCardComments;
exports.addCardComment = addCardComment;
exports.uploadImage = uploadImage;

exports.upload = upload;