const express = require("express");
const router = express.Router();
const cardsRestController = require("../cards/routes/cardsRestController");
const { handleError } = require("../utils/handleErrors");
const usersRestController = require("../users/routes/usersRestController");
const commentsRestController = require("../cards/routes/commentsRestController");
const contactRestController = require("../users/routes/contactRestController");
// const usersRestController= require ("../users/routes/apppassowrd")


router.use("/cards", cardsRestController);
router.use("/users", usersRestController);
router.use("/comments", commentsRestController);

router.use("/contact-us", contactRestController);
// router.use("/users",usersRestController)

router.use((req, res) => {
  handleError(res, 404, "Page not found!");
});

module.exports = router;
