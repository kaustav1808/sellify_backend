const mongoose = require("mongoose");
const mongodb_connection =
  process.env.DB_CONNECTION || "mongodb://localhost:27017/";

const getDBName = () => {
  if (process.env.NODE_ENV == "development") return "dev_db";
  else if (process.env.NODE_ENV == "test") return "test_db";
  else if (process.env.NODE_ENV == "production") return "production";
  else return "demo";
};

module.exports = {
  connect: async () => {
    let url = mongodb_connection + getDBName() + "?retryWrites=true&w=majority";
    return await mongoose.connect(url);
  },
};
