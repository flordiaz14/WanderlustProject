import React, { useContext, useEffect} from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from "../Context/AuthContext";

const ProtectedRoutes = () => {
  const { user } = useContext(AuthContext);
  
useEffect(() => {
  if (user?.validate) {
    localStorage.setItem("validate", JSON.stringify(true));
  }
}, [user?.validate])

  let validado= JSON.parse(localStorage.getItem("validate"));

  return (
    user?.validate || validado  ? <Outlet /> : <Navigate to={"/session"} state = {"booking"}/>
  )
}

export default ProtectedRoutes;