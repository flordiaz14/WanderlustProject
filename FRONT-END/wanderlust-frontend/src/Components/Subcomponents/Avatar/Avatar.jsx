import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../Context/AuthContext";

const Avatar = ({classMobile}) => {
  const [initials, setInitials]= useState("");
  const [userNameRender, setUserNameRender]= useState("")
  const { handleAuth, user, setUser } = useContext(AuthContext);
    
    useEffect(() => {
      if(user){
      const { name, lastname } = user;
      const avatar =
      name?.substring(0, 1).toUpperCase() + lastname?.substring(0, 1).toUpperCase();
      const userName =
      name?.substring(0, name.length ) +
      " " + lastname?.substring(0, lastname?.length );
      setInitials(avatar);
      setUserNameRender(userName)};      
    }, [user])

  const handleClick = () => {
    localStorage.clear();
    handleAuth();
    setUser({});
  };

  return (
    <div className={`avatar ${classMobile}`}>
      <button className="avatar--close__button" onClick={handleClick}>
        X
      </button>
      <div className="avatar--user ">
        <h2 className="avatar--user__initials">{initials}</h2>
        <p className="avatar--user__name"> <span>Hola,</span> <br />{userNameRender}</p>
      </div>
    </div>
  );
};

export default Avatar;
