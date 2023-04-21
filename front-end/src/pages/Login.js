import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
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
      setError("Email ou senha inválida");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <Header />
      <form className="container mt-4">
        <h1 className="mb-3 text-center">Login</h1>
        <div className="row align-items-center text-center">
          <div className="col-md-10 mx-auto col-lg-5">
            <div className="p-4 p-md-5 border rounded-3 bg-light mb-1">
              <div className="input-group mb-3">
                <span className="input-group-text">Email</span>
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <label htmlFor="email">email@example.com</label>
                </div>
              </div>
              <div className="input-group">
                <span className="input-group-text">Senha</span>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="*********"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <label htmlFor="password">*********</label>
                </div>
              </div>
            </div>
            <Button
              className="btn btn-primary w-100 mb-2"
              onClick={handleLogin}
            >
              Entrar
            </Button>
            <Link to="/register">
              <Button className="btn btn-secondary w-100">Cadastre-se</Button>
            </Link>
            {error && <div className="mt-3 alert alert-danger">{error}</div>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
