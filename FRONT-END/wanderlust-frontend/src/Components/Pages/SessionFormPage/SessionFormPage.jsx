import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useForm } from "../../Subcomponents/Hooks/useForm";
import { BsEyeSlash } from "react-icons/bs";
import MsgAlert from "../../Subcomponents/MsgAlert/MsgAlert";
import SweetAlert from "../../Subcomponents/SweetAlert/SweetAlert";
import { IoAlertCircle } from "react-icons/io5";

const initialForm = {
  email: "",
  password: "",
};
const validationForm = (form) => {
  let errors = {};
  let regexEmail = /[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]{3}/;
  let regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{7,16}$/;

  if (!form.email.trim()) {
    errors.email = "Este campo es obligatorio.";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "Ingrese un email válido.";
  } else if (!form.password.trim()) {
    errors.password = "Este campo es obligatorio.";
  } else if (!regexPassword.test(form.password.trim())) {
    errors.password =
      "La contraseña debe tener entre 7 y 16 caracteres, ser alfanumérica, al menos una minúscula y al menos una mayúscula. Puede contener caracteres especiales.";
  }
  return errors;
};


export default function SessionFormPage () {
  const { form, errors, response, handleChange, handleBlur, handleSubmit } = useForm(
    initialForm,
    validationForm,
    "login"
  );
  const [inputToEdit, setInputToEdit] = useState("password");
  const location= useLocation();

  const handleClick = () => {
    if (inputToEdit === "password") {
      setInputToEdit("text");
    } else {
      setInputToEdit("password");
    }
  };

  
  return (
    <div className="form">
      <form className="form--session" onSubmit={handleSubmit}>
        { location.state === "booking" &&
        <div className="form--alert">
          <p><IoAlertCircle/>Para realizar una reserva necesitas iniciar sesión.</p>
        </div>
        }
        { location.state === "Role" &&
        <div className="form--alert">
          <p><IoAlertCircle/>Necesitas estar logueado con un usuario administrador.</p>
        </div>
        }
      <h1 className="form--title">Iniciar sesión</h1>
        <label htmlFor="session-email">Correo electrónico</label>
        <input
          type="email"
          id="session-email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.email}
          className={errors?.email && "msgError--input"}
        />
        {errors?.email && <MsgAlert msg={errors?.email} />}
        <div className="password">
          <label htmlFor="session-password">Contraseña</label>
          <input
            type={inputToEdit}
            id="session-password"
            name="password"
            autoComplete="on"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.password}
            className={errors?.password && "msgError--input"}
          />
          <BsEyeSlash className="password--eye__icon" onClick={handleClick} />
          {errors?.password && <MsgAlert pass="pass" msg={errors.password} />}
          {errors?.error && <MsgAlert msg={errors?.error} />}
        </div>
        {response?.validate === false && <SweetAlert msg={"Revise su casilla de correos y valide el email con que se registró para continuar. Gracias!!!"} icon={'success'}/>}
        {(response?.validate && location.state === null) &&<Navigate to={"/"} />}
        {(response?.validate && location.state === "booking") &&<Navigate to={-1} />}
        {(response?.validate && location.state === "Role") &&<Navigate to={-1} />}
        <button className="btn green" type="submit" value="Send">
          Ingresar
        </button>
        <p>
          ¿Aún no tenes cuenta? <Link to="/register">Registrate</Link>
        </p>
      </form>
    </div>
  );
};
