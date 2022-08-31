import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

const HeaderProduct = ({ category, name }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productName, productId } = useParams();

  const handleClick = () => {
    if (location.pathname === `/product/${productName}/${productId}/booking`) {
      navigate(`/product/${productName}/${productId}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="headerProduct">
      <header className="header">
        <div className="header--product">
          <div className="header--product__container">
            <h4 className="product--categoria">{category}</h4>
            <h1 className="product--title">{name}</h1>
          </div>
          <FaAngleLeft
            className="header--product__icon"
            onClick={handleClick}
          />
        </div>
      </header>
    </div>
  );
};

export default HeaderProduct;
