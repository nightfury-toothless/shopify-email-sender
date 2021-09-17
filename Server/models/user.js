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
    // encry_accesstoken: {
    //   type: String,
    //   required: true,
    // },
    accesstoken: {
      type: String,
      required: true,
    },
    // salt: String,

    templates: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// userSchema
//   .virtual("accesstoken")
//   .set(function (accesstoken) {
//     this._accesstoken = accesstoken;
//     this.salt = uuidv1();
//     this.encry_accesstoken = this.securePassword(accesstoken);
//   })
//   .get(function () {
//     return this._accesstoken;
//   });

// userSchema.methods = {
//   authenticate: function (accesstoken) {
//     return this.securePassword(accesstoken) === this.encry_accesstoken;
//   },
//   securePassword: function (accesstoken) {
//     if (!accesstoken) return "";

//     try {
//       return crypto
//         .createHmac("sha256", this.salt)
//         .update(accesstoken)
//         .digest("hex");
//     } catch (error) {
//       return "";
//     }
//   },
// };

module.exports = mongoose.model("User", userSchema);
