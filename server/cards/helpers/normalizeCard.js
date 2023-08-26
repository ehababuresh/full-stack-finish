
const generateBizNumber = require("./generateBizNumber");

const { uploadImage } = require('../models/cardsAccessDataService');


const normalizeCard = async (rawCard, userId, imageData = null, altText = null) => {

  let imageUrl = rawCard.image?.url || "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg";
  let imageAlt = rawCard.image?.alt || "Business card image";

  if (imageData) {
    imageUrl = await uploadImage(imageData);
    imageAlt = altText || imageAlt;
  }

  return {
    ...rawCard,
    image: {
      url: imageUrl,
      alt: imageAlt,
    },
    address: {
      ...rawCard.address,
      state: rawCard.address?.state || "",
    },
    bizNumber: rawCard.bizNumber || await generateBizNumber(),
    user_id: userId,
  };
};

module.exports = normalizeCard;
