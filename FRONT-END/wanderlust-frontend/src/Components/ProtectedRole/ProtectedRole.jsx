import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";



const ProtectedRole = () => {
  const [token] = useState(localStorage.getItem("token"))
  return (
    decodeToken(token)?.roles === "ROLE_ADMIN"  ? <Outlet /> : <Navigate to={"/session"}  state = {"Role"}/>
    )
}

export default ProtectedRole;