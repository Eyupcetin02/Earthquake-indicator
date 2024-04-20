const mongoose = require("mongoose");

const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database connection success");
    })
    .catch((err) => console.log(err));
};

module.exports = connection;
