import { useState, useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import emailjs from "@emailjs/browser";
import { helpHttp } from "../helpers/helpHttp";

export const useForm = (initialForm, validateForm, formName) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { handleAuth, setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value.trim(),
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      switch (formName) {
        case "login":
          const urlLogin = "users/authenticate";
          let optionsLogin = {
            body: {
              username: form.email,
              password: form.password,
            },
          };
          helpHttp()
            .post(urlLogin, optionsLogin)
            .then((res) => {
              if (res?.id) {
                setResponse(res);
                setErrors(null);
                handleAuth();
                setUser(res);
                localStorage.setItem("token", JSON.stringify(res.token));
                if (res?.validate === false) {
                  const templateParams = {
                    name: res.name,
                    email: form.email,
                    html: `<div style="background:#92c8a7;padding:50px 10px">
                    <div style="max-width:600px;margin:auto">
                    <div style="background:white;padding:15px 30px 25px 30px;border-radius:5px">
                    <h1>Hola ${res.name}:</h1>
                    <p>Gracias por registrarte en nuestro sitio web!!</p>
                    <p>Para poder activar tu cuenta en Wanderlust necesitamos que hagas un último paso.</p>
                    <p>Por favor, confirma tu correo electrónico haciendo click en el botón de abajo.</p>
                    <p><a style="background:#E2C4A0;color:white;font-weight:500;display:inline-block;padding:10px 35px;margin:6px 8px;text-decoration:none;border-radius:2px" href="http://wander-lust.com.ar/#/confirm-email/${res.username}" rel="noopener" target="_blank" >Confirmar</a></p>
                    <p style="margin-top:40px">Saludos,<br>Wanderlust</p>
                    </div>
                    </div>
                    </div>`,
                  };
                  //send email function.
                  emailjs
                    .send(
                      "service_7wiru2e",
                      "template_validation_emai",
                      templateParams,
                      "TV_a2Oj5KVD_5vet8"
                    )
                    .then(
                      (response) => {
                        console.log("SUCCESS!", response.status, response.text);
                      },
                      (error) => {
                        console.log("FAILED...", error);
                      }
                    );
                };
              } else {
                setErrors({ error : "Sus credenciales son inválidas." });
                setResponse(null);
              }
              setLoading(false);
              setForm(initialForm);
              setTimeout(() => setResponse(null), 5000);
              setTimeout(() => setErrors({}), 5000);
            });

          break;
        case "register":
          const url = "users/register";
          let options = {
            body: {
              name: form.name,
              lastname: form.lastName,
              password: form.password,
              username: form.email.toLowerCase(),
            },
          };
          helpHttp()
            .post(url, options)
            .then((res) => {
              if (res?.id) {
                setResponse(res);
                setErrors(null);
              } else {
                setErrors({ error: res?.message });
                setResponse(null);
              }
              setLoading(false);
              setForm(initialForm);
              setTimeout(() => setResponse(null), 5000);
              setTimeout(() => setErrors({}), 5000);
            });
          break;

        default:
          break;
      }
    } else {
      return;
    }
  };

  return {
    form,
    errors,
    loading,
    response,
    setForm,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
