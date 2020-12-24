const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Game = require("../models/game");


exports.gameById = (req, res, next, id) => {
    Game.findById(id)       
        .populate("ratings", "text")
        .populate("ratings.ratedBy", "_id name")
        .exec((err, game) => {
            if (err || !game) {

                return res.status(400).json({

                    error: 'Error in loading game'

                });
            }

            req.game = game;
            next();
        });   
}

exports.singleGameView = (req, res) => {
  Game.findById(req.game._id, (err, game) => {
    if (err) return res.status(404).json({ error: err });
    return res.json(game);
  });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to upload image",
      });
    }

    let game = new Game(fields);

    if (files.photo) {
      game.photo.data = fs.readFileSync(files.photo.path);
      game.photo.contentType = files.photo.type;
    }

    game.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      return res.json(result);
    });
  });
};

exports.removeGame = (req, res) => {
  if (req.game._id) {
    Game.deleteOne({ _id: req.game._id }, (err) => {
      if (err) return res.status(400).json({ success: false, error: err });
      res.status(200).json({ success: true });
    });
  } else {
    return res.json({ success: false, error: "Game not found" });
  }
};



exports.allGames = (req, res) => {
  let orderPro = req.query.orderPro ? req.query.orderPro : "asc";
  let sortPro = req.query.sortPro ? req.query.sortPro : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Game.find()
    .select("-photo") //Not selecting photo
    .populate("ratings", "text")
    .populate("ratings.ratedBy", "_id name")
    .sort([[sortPro, orderPro]])
    .limit(limit)
    .exec((err, showgames) => {
      if (err) {
        return res.status(400).json({ error: "Error in loading games" });
      }

      res.json(showgames);
    });
};




exports.photo = (req, res, next) => {
  if (req.game.photo.data) {
    res.set("Content-Type", req.game.photo.contentType);
    return res.send(req.game.photo.data);
  }
  next();
};


exports.rating = (req, res) => {
  let rating = req.body.rating;

  rating.ratedBy = req.body.userId;

  Game.findByIdAndUpdate(
    req.body.gameId,
    { $push: { ratings: rating } },
    { new: true }
  )
    .populate("ratings.ratedBy", "_id name")
    .populate("ratedBy", "_id name")
    .exec((err, rev) => {
      if (err) {
        return res.status(400).json({
          error: "Error in adding review",
        });
      } else {
        res.json(rev);
      }
    });
};
