export const validateName = (name) => {
  if (name.length < 2) {
    return "O nome deve ter pelo menos 2 caracteres";
  }
};

export const validateEmail = (email) => {
  const regex = /^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/gi;
  if (!regex.test(email)) {
    return "Insira um email válido";
  }
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return "A senha deve ter pelo menos 6 caracteres";
  } else if (password.length > 12) {
    return "A senha não pode ter mais de 12 caracteres";
  }
};
