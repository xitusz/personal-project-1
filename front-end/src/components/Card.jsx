import React from "react";
import PropTypes from "prop-types";

const Card = ({ name, image }) => {
  return (
    <div>
      <img src={image} alt={name} />
      <div>
        <h5>{name}</h5>
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
