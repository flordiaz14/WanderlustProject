import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import HeaderProduct from "../../HeaderProduct/HeaderProduct";

const AdminPage = () => {
  const { username } = useParams();
  let activeStyle = {
    textDecoration: "underline",
    margin: "1rem ",
  };
  let inActiveStyle = {
    margin: "1rem ",
  };
  return (
    <div className="admin--page">
      <HeaderProduct name={"Panel de Administrador"} />
      <div className="admin--page__container">
        <NavLink
          className="btn green"
          to={`/admin/${username}/add_product`}
          style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
        >
          Cargar Producto
        </NavLink>
        <NavLink
          className="btn green"
          to={`/admin/${username}/my_products`}
          style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
        >
          Mis Productos
        </NavLink>
      </div>
        <Outlet />
    </div>
  );
};

export default AdminPage;
