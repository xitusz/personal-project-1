import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  const handleExiting = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container">
        <div className="m-auto">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setCollapsed(!collapsed)}
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div className={`collapse navbar-collapse ${collapsed ? "" : "show"}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active" to="/">
                Início
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/character"
              >
                Personagens
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/region"
              >
                Regiões
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/profile"
              >
                Perfil
              </NavLink>
            </li>
            <li className="nav-item">
              <Link to="/login" onClick={handleExiting} className="nav-link">
                Sair
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
