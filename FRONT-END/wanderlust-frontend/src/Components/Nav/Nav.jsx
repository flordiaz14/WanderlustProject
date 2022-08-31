import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


export default function Nav({ classMobile, closeMenu}) {
  const [windowLocation, setWindowLocation] = useState("");
  const refRegisterBtn =  useRef();
  const refSessionBtn = useRef();
  let location = useLocation();

useEffect(() => {
  setWindowLocation(location.pathname);
  if (windowLocation === "/session") {
    refSessionBtn.current.style.display = "none";
    refRegisterBtn.current.style.display = "block";
  } else if (windowLocation === "/register") {
    refRegisterBtn.current.style.display = "none";
    refSessionBtn.current.style.display = "block";
  }else{
    refRegisterBtn.current.style.display = "block";
    refSessionBtn.current.style.display = "block";
  }
}, [location, windowLocation])

  return (
    <>
      <div className={`nav ${classMobile}`}>
        <Link to="/register">
          <button
            ref={refRegisterBtn}
            onClick={closeMenu}
            className="button5 btn white"
          >
            Crear cuenta
          </button>
        </Link>
        <Link to="/session">
          <button
            ref={refSessionBtn}
            onClick={closeMenu}
            className="button5 btn white"
          >
            Iniciar sesión
          </button>
        </Link>
      </div>
    </>
  );
}
