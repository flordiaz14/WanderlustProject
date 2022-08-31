import React from "react";
import Button from "../../Subcomponents/Button/Button";
import { helpImages } from "../../Subcomponents/helpers/helpImages";

const SuccessBooking = () => {
  return (
    <div>
      <div className="SuccessBooking">
        <div className="SuccessBooking--container">
          <img src={helpImages(`./atomocheck.png`)} alt="Ok" />
          <h1>¡Muchas Gracias!</h1>
          <h2>Su reserva se ha realizado con éxito</h2>
          <Button btn='btn green' content={"ok"} url={"/"} />
        </div>
      </div>
    </div>
  );
};

export default SuccessBooking;
