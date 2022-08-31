import React ,{ useContext } from "react";
import Nav from "../Nav/Nav";
import SocialMedia from "../Subcomponents/SocialMedia/SocialMedia";
import Avatar from "../Subcomponents/Avatar/Avatar";
import AuthContext from "../Context/AuthContext";
import LogAutUser from "../Subcomponents/LogAutUser/LogAutUser";
import NavRoles from "../NavRoles/NavRoles";



export default function MenuDrawer({closeMenu, hidden}) {
    const {auth, user}= useContext(AuthContext);
    return(
        <div className={ `menuDrawer ${hidden}`}>
            <div className="menuDrawer--headboard">
                <button className={hidden} onClick={closeMenu}>X</button>
                <h2>MENÚ</h2>
            </div>
            { auth && <Avatar classMobile="classMobile"/>}
            { auth && <NavRoles classMobile="classMobile" user={user}/>}
            { auth && <LogAutUser/>}
            <div className="menuDrawer--nav__drawer">
            {!auth &&<Nav closeMenu={closeMenu} classMobile="classMobile"/>}
            </div>
            <div className="menuDrawer--nav__drawer--footer">
                <SocialMedia/>
            </div>
        </div>
    );
}
