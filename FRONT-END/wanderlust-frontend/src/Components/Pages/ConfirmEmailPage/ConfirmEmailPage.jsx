import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { helpHttp } from "../../Subcomponents/helpers/helpHttp";
import SweetAlert from "../../Subcomponents/SweetAlert/SweetAlert";
import { helpImages } from "../../Subcomponents/helpers/helpImages";

const token = localStorage.getItem("token");

const ConfirmEmailPage = () => {
  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    if (user?.validate===false) {
      const url = "users";
      let options = {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: {
          username: user.username,
          validate: true,
          city: "",
        },
      };
        helpHttp()
          .put(url, options)
          .then((res) => {
            setLoading(true);
            if (!res.error) {
              setErrors(null);
              setUser(res);
              navigate("/");
            } else {
              setErrors({ error: res?.message });
            }
            setLoading(false);
            setTimeout(() => setErrors({}), 5000);
          });      
    }else{
      setErrors({ error: "su email ya fue validado."});
      setTimeout(() => navigate("/"), 3500);
    }
  };

  return (
    <div className="confirmEmailPage">
        <div className="confirmEmailPage--container">
          <img src={helpImages(`./email-icon.svg`)} alt="Ok" />
          <h1>Confirma tu email haciendo click en el botón.</h1>
          <p>Y estarás listo para disfrutar de todos nuestros servicios!!</p>
          {errors?.error && <SweetAlert msg={errors?.error} icon={"info"}/>}
          <button className="btn green" onClick={handleClick}>Confirmar</button>
        </div>
    </div>
  );
};

export default ConfirmEmailPage;
