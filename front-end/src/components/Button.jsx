import React from "react";
import PropTypes from "prop-types";

const Button = ({ className, type, onClick, disabled, children }) => (
  <button
    className={className}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: "",
  type: "button",
  onClick: () => {},
  disabled: false,
};

export default Button;
