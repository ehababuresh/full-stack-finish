const DB = process.env.DB || "MONGODB";
const User = require("./mongodb/User");
const lodash = require("lodash");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleBadRequest } = require("../../utils/handleErrors");
const nodemailer = require('nodemailer');


const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizedUser;
      let user = await User.findOne({ email });
      if (user) throw new Error("User already registered");

      user = new User(normalizedUser);
      user = await user.save();

      user = lodash.pick(user, ["name", "email", "_id"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("registerUser new user not in mongodb");
};

const loginUser = async ({ email, password }) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findOne({ email });
      if (!user)
        throw new Error("Authentication Error: Invalid email or password");

      const validPassword = comparePassword(password, user.password);
      if (!validPassword)
        throw new Error("Authentication Error: Invalid email or password");

      const token = generateAuthToken(user);
      return Promise.resolve(token);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("loginUser user not in mongodb");
};

const getUsers = async () => {
  if (DB === "MONGODB") {
    try {
      const users = await User.find({}, { password: 0, __v: 0 });
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};

const getUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId, {
        password: 0,
        __v: 0,
      });
      if (!user) throw new Error("Could not find this user in the database");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const updateUser = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      await User.updateOne({ _id: userId }, normalizedUser);
      return Promise.resolve({ normalizedUser });
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card update not in mongodb");
};

const changeUserBusinessStatus = async (userId) => {
  if (DB === "MONGODB") {
    try {
      return Promise.resolve(`user no. ${userId} change his business status!`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card liked not in mongodb");
};

const deleteUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      return Promise.resolve(`user no. ${userId} deleted!`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};  


const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


const saveVerificationCode = async (email, verificationCode) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'your-email-service', // ספק שירות האימייל (לדוגמה: 'gmail')
      auth: {
        user: 'your-email@example.com', // כתובת האימייל שלך
        pass: 'your-email-password',   // סיסמה לאימייל
      },
    });

    const mailOptions = {
      from: 'your-email@example.com', // כתובת האימייל השולח
      to: email,                      // כתובת האימייל של המקבל
      subject: 'Verification Code',   // נושא האימייל
      text: `Your verification code is: ${verificationCode}`, // תוכן האימייל
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

const sendResetEmail = async (email) => {
  try {
    const verificationCode = generateVerificationCode();
    await saveVerificationCode(email, verificationCode);
    // Implement your logic to send the reset password email
    console.log(`Reset password email sent to ${email} with verification code ${verificationCode}.`);
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Failed to send reset password email");
  }
};


const resetPassword = async (email, verificationCode, newPassword) => {
  try {
    const user = await User.findOne({ email });

    if (!user)
      throw new Error("Authentication Error: Invalid email or verification code");

    const savedVerificationCode = currentPasswords[email].verificationCode;

    if (savedVerificationCode !== verificationCode)
      throw new Error("Authentication Error: Invalid email or verification code");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.verificationCode = null;
    await user.save();

    return Promise.resolve("Password reset successfully.");
  } catch (error) {
    error.status = 400;
    return Promise.reject(error);
  }
};



exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.deleteUser = deleteUser;
exports.resetPassword = resetPassword;
exports.sendResetEmail = sendResetEmail;
exports.generateVerificationCode = generateVerificationCode;


