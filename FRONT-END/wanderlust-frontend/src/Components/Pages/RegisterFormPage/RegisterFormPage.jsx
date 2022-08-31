import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "../../Subcomponents/Hooks/useForm";
import { BsEyeSlash } from "react-icons/bs";
import MsgAlert from "../../Subcomponents/MsgAlert/MsgAlert";
import SweetAlert from "../../Subcomponents/SweetAlert/SweetAlert";

const initialForm = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const validationForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]{3}/;
  let regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{7,16}$/;

  if (!form.name.trim()) {
    errors.name = "Este campo es obligatorio.";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "Este campo solo acepta caracteres alfabéticos.";
  } else if (!form.lastName.trim()) {
    errors.lastName = "Este campo es obligatorio.";
  } else if (!regexName.test(form.lastName.trim())) {
    errors.lastName = "Este campo solo acepta caracteres alfabéticos.";
  } else if (!form.email.trim()) {
    errors.email = "Este campo es obligatorio.";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "Ingrese un email válido.";
  } else if (!form.password.trim()) {
    errors.password = "Este campo es obligatorio.";
  } else if (!regexPassword.test(form.password.trim())) {
    errors.password =
      "La contraseña debe tener entre 7 y 16 caracteres, ser alfanumérica, al menos una minúscula y al menos una mayúscula. Puede contener caracteres especiales.";
  } else if (!form.passwordConfirmation.trim()) {
    errors.passwordConfirmation = "Este campo es obligatorio.";
  } else if (!(form.password.trim() === form.passwordConfirmation.trim())) {  
    errors.passwordConfirmation = "La contraseña ingresada no coincide.";
  }  

  return errors;
};

export default function RegisterFormPage () {
  const { form, errors,response, handleChange, handleBlur, handleSubmit } = useForm(
    initialForm,
    validationForm,
    "register"
  );
  const [inputToEdit, setInputToEdit] = useState("password");
  const handleClick = () => {
    if (inputToEdit === "password") {
      setInputToEdit("text");
    } else {
      setInputToEdit("password");
    }
  };

  return (
    <div className="form">
      <form className="form--register" onSubmit={handleSubmit}>
      <h1 className="form--title" >Crear cuenta</h1>
        <div className="form--register__name">
          <div className="name">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.name}
              className={errors?.name && "msgError--input"}
            />
            {errors?.name && <MsgAlert msg={errors?.name} />}
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.lastName}
              className={errors?.lastName && "msgError--input"}
            />
            {errors?.lastName && <MsgAlert msg={errors?.lastName} />}
          </div>
        </div>
        <label htmlFor="register-email">Correo electrónico</label>
        <input
          type="email"
          id="register-email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.email}
          className={errors?.email && "msgError--input"}
        />
        {errors?.email && <MsgAlert msg={errors?.email} />}
        <div className="password">
          <label htmlFor="register-password">Contraseña</label>
          <input
            type={inputToEdit}
            id="register-password"
            name="password"
            autoComplete="on"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.password}
            className={errors?.password && "msgError--input "}
          />
          <BsEyeSlash className="password--eye__icon" onClick={handleClick} />
        </div>
        {errors?.password && <MsgAlert pass="pass" msg={errors?.password} />}
        <label htmlFor="passwordConfirmation">Confirmar contraseña</label>
        <input
          type="password"
          id="passwordConfirmation"
          name="passwordConfirmation"
          autoComplete="on"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.passwordConfirmation}
          className={errors?.passwordConfirmation && "msgError--input"}
        />
        {errors?.passwordConfirmation && (
          <MsgAlert msg={errors?.passwordConfirmation} />
        )}
        {response?.id && <SweetAlert msg={"Su registro fue exitoso!!!"} icon={'success'}/>}
        {response?.id &&<Navigate to={"/session"} />}
        {!response?.id &&<MsgAlert msg={errors?.error} />}
        <button className="btn green" type="submit" value="Send">
          Crear cuenta
        </button>
        <p>
          ¿Ya tienes una cuenta? <Link to="/session">Iniciar sesión</Link>
        </p>
      </form>
    </div>
  );
};
