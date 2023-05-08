import React, { useState } from "react";
import PropTypes from "prop-types";

const Card = ({ name, image }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className="card border-0"
      style={{
        height: "20rem",
        width: "15rem",
        transform: `scale(${hovered ? 1.05 : 1})`,
        transition: "transform 0.3s ease-out",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={image}
        alt={name}
        className="card-img-top img-fluid h-100"
        style={{ objectFit: "cover" }}
      />
      <div
        className="card-body p-0"
        style={{
          backgroundColor: `${hovered ? "rgb(39 111 141)" : "rgb(6, 28, 37)"}`,
          transition: "background-color 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
        }}
      >
        <h5 className="card-title text-center pt-2 text-white">{name}</h5>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
};

Card.defaultProps = {
  image: "",
};

export default Card;
