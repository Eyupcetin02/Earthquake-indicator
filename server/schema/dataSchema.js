const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  lat: {
    type: Number,
    require: true,
  },
  lon: {
    type: Number,
    require: true,
  },
  siddet: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("earthQuakeData", dataSchema);
