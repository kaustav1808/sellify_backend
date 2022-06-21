const User = require("../models/User");
const {
  checkUserExists,
  createNewUser,
  generateNewAccessToken,
  destroyCurrentToken,
  getAuthorizationToken,
  verifyRefreshToken,
} = require("../services/auth");

const signIn = async (req) => {
  return await generateNewAccessToken(
    req.user._id,
    req.user.email,
    req.user.username
  );
};

const signUp = async (req, done) => {
  let user = await checkUserExists(req.body.email);

  if (user) {
    return done({ status: 400, message: "user already exists" }, false);
  }

  user = await createNewUser(req.body.email, req.body.username || null, req.body.password);

  let newtoken = await generateNewAccessToken(
    user.id,
    user.email,
    user.username
  );
  return { user, newtoken };
};

const signOut = async (req) => {
  let token = getAuthorizationToken(req);
  await destroyCurrentToken(token);
  return "Successfully logout!";
};

const getNewToken = async (req, done) => {
  let token = await verifyRefreshToken(req.body.token)
  let user = await User.findOne({_id:token.userId})
  
  if (!user){
    throw new Error('User not exists')
  }

  return await generateNewAccessToken(user._id, user.email, user.username)
};

module.exports = { signIn, signUp, signOut, getNewToken };
