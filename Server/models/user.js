const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const userSchema = new Schema(
  {
    store: {
      type: String,
      required: true,
      trim: true,
    },
    accesstoken: {
      type: String,
      required: true,
    },
    templates: [
      {
        templateName: {
          type: String,
          trim: true,
          maxlength: 100,
        },
        templateJson: {},
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
