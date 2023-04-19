import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "../services/localStorage";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn = getItemFromLocalStorage("isLoggedIn");
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = () => {
    const users = getItemFromLocalStorage("userData") || [];

    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setItemToLocalStorage("isLoggedIn", true);
      setItemToLocalStorage("user", user.name);
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form>
      <h1>Login</h1>
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
      <Button onClick={handleLogin}>Entrar</Button>
      <Link to="/register">
        <Button>Registrar-se</Button>
      </Link>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Login;
