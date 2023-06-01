const { User } = require("../database/models");
const { hash } = require("../utils/hash");

const create = async (name, email, password) => {
  const hashedPassword = hash(password);

  const existEmail = await User.findOne({ where: { email } });

  if (existEmail) {
    const error = new Error("Email já registrado");
    error.statusCode = 409;
    throw error;
  }

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return "Usuário criado";
};

module.exports = {
  create,
};
