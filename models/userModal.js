const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const process = require("process");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    // password: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   minlength: 8,
    //   validate(value) {
    //     if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    //       throw new Error(
    //         "Password must contain at least one letter and one number"
    //       );
    //     }
    //   },
    //   private: true, // used by the toJSON plugin
    // },
    token: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

/**
 * Generate auth token
 * @returns {Promise<string>}
 */
userSchema.methods.generateAuthToken = async function (email, password) {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "demoProject", {
    expiresIn: "7d",
  });
  user.token = token;
  await user.save();
  return token;
};

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
// userSchema.methods.isPasswordMatch = async function (password) {
//   const user = this;
//   return bcrypt.compare(password, user.password);
// };

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
