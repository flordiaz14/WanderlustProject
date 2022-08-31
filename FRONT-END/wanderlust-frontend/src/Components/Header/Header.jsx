import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import Logo from "../Subcomponents/Logo/Logo";
import { IoMenu } from "react-icons/io5";
import MenuDrawer from "../MenuDrawer/MenuDrawer";
import Avatar from "../Subcomponents/Avatar/Avatar";
import AuthContext from "../Context/AuthContext";
import NavRoles from "../NavRoles/NavRoles";

const Header = () => {

  const [hidden, sethidden] = useState("");
  const [isOpen, setIsOpen] = useState(false);  
  const { auth, user } = useContext(AuthContext);
  
  const openMenu = () => {
    sethidden("");
    setTimeout(() => {
      setIsOpen(true);
    }, 0);
  };

  const closeMenu = () => {
    sethidden("hidden");
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  return (
    <div className="main--header">
      <div className="header">
        <div className="header--logo">
          <Link  to="/">
            <Logo />
          </Link>
        </div>
        <IoMenu className="menuDrawer--icon__menu" onClick={openMenu} />
        {isOpen && <MenuDrawer hidden={hidden} closeMenu={closeMenu} />}
        {!auth && <Nav/>}
        {auth && <><NavRoles className="desktop" user={user}/><Avatar /></>}
      </div>
    </div>
  );
};

export default Header;
