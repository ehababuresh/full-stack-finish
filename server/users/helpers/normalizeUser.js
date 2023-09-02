const normalizeUser = (rawUser, imageFile) => {
  const name = { ...rawUser.name, middle: rawUser.name.middle || "" };

  let image;
  if (imageFile) {
    // Handle your uploaded image file here.
    // For example, you can upload it to a cloud storage and get the URL.
    const uploadedImageUrl = uploadImageToCloudStorage(imageFile);
    image = {
      url: uploadedImageUrl,
      alt: "Uploaded business card image",
    };
  } else {
    image = {
      url:
        rawUser.image.url ||
        "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
      alt: rawUser.image.alt || "Business card image",
    };
  }

  const address = {
    ...rawUser.address,
    state: rawUser.address.state || "not defined",
  };

  const user = {
    ...rawUser,
    name,
    image,
    address,
  };

  return user;
};

module.exports = normalizeUser;
