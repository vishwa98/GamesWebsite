const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const gameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },

    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    gameURL: {
      type: String,
      required: true
    },

    photo: {
      data: Buffer,
      contentType: String,
    },

    ratings: [
      {
        text: String,
        ratedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
