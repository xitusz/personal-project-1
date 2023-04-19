import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../middleware/validateRegister";
import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "../services/localStorage";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn = getItemFromLocalStorage("isLoggedIn");
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleRegister = () => {
    // Hash Password
    const nameError = validateName(name);
    const passwordError = validatePassword(password);
    const emailError = validateEmail(email);

    const users = getItemFromLocalStorage("userData") || [];

    if (nameError) {
      setError(nameError);
    } else if (passwordError) {
      setError(passwordError);
    } else if (emailError) {
      setError(emailError);
    } else if (users.find((user) => user.email === email)) {
      setError("Email já registrado");
    } else {
      const newUser = { name, email, password };
      users.push(newUser);
      setItemToLocalStorage("userData", users);
      navigate("/login");
    }
  };

  const handlenameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form>
      <h1>Registre-se</h1>
      <label htmlFor="name">
        Nome
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Seu Nome"
          value={name}
          onChange={handlenameChange}
          required
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email@example.com"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          type="password"
          id="password"
          name="password"
          placeholder="*********"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <Button onClick={handleRegister}>Registrar</Button>
      <Link to="/login">
        <Button>Entrar</Button>
      </Link>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Register;
