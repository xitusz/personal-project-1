import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../services/localStorage";

const Header = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  const handleExiting = () => {
    removeItemFromLocalStorage("user");
    removeItemFromLocalStorage("isLoggedIn");
    navigate("/login");
  };

  return (
    <div>
      <nav
        id="navbar"
        className="navbar navbar-expand-md navbar-dark fixed-top"
      >
        <div className="container py-2">
          <div className="m-auto">
            <button
              className="navbar-toggler"
              type="button"
              data-testid="navlinks-button"
              onClick={() => setCollapsed(!collapsed)}
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
          <div
            className={`collapse navbar-collapse ${collapsed ? "" : "show"}`}
          >
            <ul className="navbar-nav me-auto">
              <li className="d-flex align-items-center nav-item">
                <NavLink
                  className="nav-link p-0 mx-2"
                  activeclassname="active"
                  to="/"
                >
                  Início
                </NavLink>
              </li>
              <li className="d-flex align-items-center nav-item">
                <NavLink
                  className="nav-link p-0 mx-2"
                  activeclassname="active"
                  to="/character"
                >
                  Personagens
                </NavLink>
              </li>
              <li className="d-flex align-items-center nav-item">
                <NavLink
                  className="nav-link p-0 mx-2"
                  activeclassname="active"
                  to="/region"
                >
                  Regiões
                </NavLink>
              </li>
            </ul>
            <hr className="hr-header" />
            {getItemFromLocalStorage("user") ? (
              <ul className="navbar-nav">
                <li className="d-flex align-items-center nav-item">
                  <NavLink
                    className="nav-link p-0 mx-2"
                    activeclassname="active"
                    to="/profile"
                  >
                    Perfil
                  </NavLink>
                </li>
                <li className="d-flex align-items-center nav-item">
                  <Link
                    className="nav-link p-0 mx-2"
                    onClick={handleExiting}
                    to="/login"
                  >
                    Sair
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="d-flex align-items-center nav-item">
                  <NavLink
                    className="nav-link p-0 mx-2"
                    activeclassname="active"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="d-flex align-items-center nav-item">
                  <NavLink
                    className="nav-link p-0 mx-2"
                    activeclassname="active"
                    to="/register"
                  >
                    Cadastro
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
