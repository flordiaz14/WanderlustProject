import React, { useContext } from "react";
import { helpImages } from "../../Subcomponents/helpers/helpImages";
import AuthContext from "../../Context/AuthContext";
import {Link, useLocation } from "react-router-dom";

const SuccessAddProductPage = () => {
  const { user } = useContext(AuthContext);
  const { state } = useLocation();

  return (
    <div>
      <div className="SuccessBooking">
        <div className="SuccessBooking--container">
          <img src={helpImages(`./atomocheck.png`)} alt="Ok" />
          <h2>{state?.message}</h2>
          <Link to={`/admin/${user.username}/my_products`}>
          <button className="btn green" >ok</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessAddProductPage;