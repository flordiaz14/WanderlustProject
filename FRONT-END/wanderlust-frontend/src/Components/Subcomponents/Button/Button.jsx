import React from "react";
import { Link } from "react-router-dom";

const Button = ({ content, btn, btnType, url }) => {
  return (
    <Link className={btnType} to={`${url}`}>
      <button className={btn} >{content}</button>
    </Link>
  );
};

export default Button;
