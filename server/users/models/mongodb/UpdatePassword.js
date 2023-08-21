const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { generateVerificationCode } = require("../usersAccessDataService");
const sendResetEmail = require("../usersAccessDataService");
const User = require("./User");
const UserSchema = new mongoose.Schema({

  email: {
      type: String,
    required: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  verificationCode: {
    type: String,
    default: null,
  },
});

UserSchema.methods.sendPasswordResetEmail = async function () {
  try {
    const verificationCode = generateVerificationCode();
    this.verificationCode = verificationCode;
    await this.save();

    await sendResetEmail(this.email, verificationCode);

    console.log("Reset password email sent successfully.");
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Failed to send reset password email");
  }
};

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
