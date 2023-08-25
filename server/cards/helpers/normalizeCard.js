
const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (rawCard, userId, imageData, altText) => {
  const { url, alt } = rawCard.image;
  const image = {
    url:
      url ||
      "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
    alt: alt || "Business card image",
  };

  if (imageData) {
    // Upload the image and get the image URL
    const imageUrl = await uploadImage(imageData); // Replace with your image upload logic

    // Update the image object with the uploaded image URL and alt text
    image.url = imageUrl;
    image.alt = altText || "Business card image";
  }

  return {
    ...rawCard,
    image,
    address: {
      ...rawCard.address,
      state: rawCard.address.state || "",
    },
    bizNumber: rawCard.bizNumber || (await generateBizNumber()),
    user_id: rawCard.user_id || userId,
  };
};

module.exports = normalizeCard;

