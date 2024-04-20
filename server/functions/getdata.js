const dataSchema = require("../schema/dataSchema");

const getData = async (req, res) => {
  const findData = await dataSchema.find();

  res.status(200).json({ message: "find data", data: findData });
};

module.exports = { getData };
