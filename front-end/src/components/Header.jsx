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
    <nav className="navbar">
      <div>
        <div>
          <button type="button" onClick={() => setCollapsed(!collapsed)}>
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div>
          <ul>
            <li>
              <NavLink to="/">Início</NavLink>
            </li>
            <li>
              <NavLink to="/character">Personagens</NavLink>
            </li>
            <li>
              <NavLink to="/region">Regiões</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Perfil</NavLink>
            </li>
            <li>
              <Link to="/login" onClick={handleExiting}>
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
