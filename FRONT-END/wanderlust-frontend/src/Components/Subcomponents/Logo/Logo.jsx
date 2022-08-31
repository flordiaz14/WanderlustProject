import React, { useState, useEffect } from "react";
import LogoDesktop from "../../../Img/Logo_1.png";
import LogoMobile from "../../../Img/Logo_2.png";

export default function Logo() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div className="logo">
      {width > 768 ? (
        <img className="logo--img__desktop" src={LogoDesktop} alt="Wanderlast" />
      ) : (
        <img className="logo--img__mobile" src={LogoMobile} alt="Wanderlast" />
      )}
    </div>
  );
}
