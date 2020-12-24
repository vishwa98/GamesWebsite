const express = require("express");

const router = express.Router();

const {
  create,
  gameById,
  singleGameView,
  allGames,
  filterGamess,
  photo,
  rating,
  removeGame,
} = require("../controllers/game");

const AuthController = require("../controllers/AuthController");
const { userById } = require("../controllers/user");



//Ratings
router.put("/game/rating", AuthController.verifyToken, rating);

router.get("/game/:gameId", singleGameView);
router.post(
  "/game/create",
  AuthController.verifyToken,
  AuthController.verifyIsGameManager,
  create
);
router.delete(
  "/game/delete/:gameId",
  AuthController.verifyToken,
  AuthController.verifyIsGameManager,
  removeGame
);


router.get("/games", allGames);

router.get("/game/photo/:gameId", photo);

router.param("userId", userById);
router.param("gameId", gameById);

module.exports = router;
