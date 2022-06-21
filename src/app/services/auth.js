const User = require("../models/User");
const UserToken = require("../models/UserToken");
const jwt = require("jsonwebtoken");

const checkUserExists = async (email) => {
  let user = await User.findOne({ email }).exec();

  if (user) {
    return { id: user._id, email: user.email, username: user.username };
  }

  return false;
};

const createNewUser = async (email, username = null, password = null) => {
  const payload = { email: email, username: username || email };
  user = new User(payload);
  await user.save();

  if (password) {
    await generateNewPassword(user, password);
  }

  return { id: user._id, email: user.email, username: user.username };
};

const generateNewPassword = async (user, password) => {
  user.generateHash(password);
  await user.save();
};

const generateNewAccessToken = async (userId, email, username) => {
  let payload = { userId, email, username };

  let accesstoken = jwt.sign(
    { ...payload, type: "access" },
    process.env.JWT_SECRET
  );
  let refreshtoken = jwt.sign(
    { ...payload, type: "refresh" },
    process.env.JWT_SECRET
  );
  let expiretime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  await UserToken.create({
    userId: payload.userId,
    accesstoken,
    refreshtoken,
    expiretime,
  });
  return { accesstoken, refreshtoken, expiretime };
};

const getAuthorizationToken = (req) => {
  let token = req.headers.authorization.split(" ");
  if (token.length !== 2) {
    throw new Error("corrupted token");
  }
  return token[1];
};

const checkIfTokenExpire = async (token) => {
  let token_existance = await UserToken.findOne({ accesstoken: token });

  if (!token_existance) {
    return true;
  }

  let timedifference = new Date(token_existance.expiretime) - new Date();
  if(timedifference<=0){
    return true
  }

  return false
};

const destroyCurrentToken = async (token) => {
  let db_exists = await UserToken.findOne({
    accesstoken: token,
  });

  return await db_exists.deleteOne();
};

const verifyRefreshToken = async (token) => {
  let payload = jwt.verify(token, process.env.JWT_SECRET)
  
  let usrtoken = await UserToken.findOne({userId:payload.userId, refreshtoken: token})
  if (!usrtoken){
    throw new Error("invalid token")
  }
  return usrtoken
}

module.exports = {
  checkUserExists,
  createNewUser,
  generateNewPassword,
  generateNewAccessToken,
  destroyCurrentToken,
  getAuthorizationToken,
  checkIfTokenExpire,
  verifyRefreshToken,
};
