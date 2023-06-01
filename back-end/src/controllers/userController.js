const userService = require("../services/userServices");

const create = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const message = await userService.create(name, email, password);

    return res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
};
