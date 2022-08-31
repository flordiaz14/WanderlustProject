import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { decodeToken } from "react-jwt";


const NavRoles = ({user,className}) => {
  const [decodeJwt, setDecodeJwt] = useState()
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setDecodeJwt(decodeToken(token));
  }, [])


  return (
    <div className={`nav--admin ${className}` }>
        {decodeJwt?.roles === "ROLE_ADMIN" &&
        <NavLink className='btn white' to={`/admin/${user?.username}`}>
          Administración
        </NavLink>}
        <NavLink className='btn white' to={`/favorites/${user?.username}`}>
          Favoritos
        </NavLink>
        <NavLink className='btn white' to={`/my_booking/${user?.username}`}>
          Mis reservas
        </NavLink>
    </div>
  )
}

export default NavRoles;