const express = require("express");

const router = express.Router();

const { userById} = require("../controllers/user");
const AuthController = require("../controllers/AuthController");



router.get("/secret/:userId", AuthController.verifyToken, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.param("userId", userById);

module.exports = router;
