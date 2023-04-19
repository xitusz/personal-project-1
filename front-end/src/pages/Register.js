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
    } else if (emailError) {
      setError(emailError);
    } else if (passwordError) {
      setError(passwordError);
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
    <form className="container mt-4">
      <h1 className="mb-3 text-center">Registre-se</h1>
      <div className="row align-items-center text-center">
        <div className="col-md-10 mx-auto col-lg-5">
          <div className="p-4 p-md-5 border rounded-3 bg-light mb-1">
            <div className="input-group">
              <span className="input-group-text">Nome</span>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Nome"
                  value={name}
                  onChange={handlenameChange}
                  required
                />
                <label htmlFor="name">Nome</label>
              </div>
            </div>
            <div className="form-text mb-3">
              Seu nome deve ter no mínimo 2 caracteres.
            </div>
            <div className="input-group">
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
            <div className="form-text mb-3">
              Seu email deve ser um email válido.
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
            <div className="form-text">
              Sua senha deve ter de 6 a 12 caracteres.
            </div>
          </div>
          <Button
            className="btn btn-primary w-100 mb-2"
            onClick={handleRegister}
          >
            Registrar
          </Button>
          <Link to="/login">
            <Button className="btn btn-secondary w-100">Entrar</Button>
          </Link>
          {error && <div className="mt-3 alert alert-danger">{error}</div>}
        </div>
      </div>
    </form>
  );
};

export default Register;
