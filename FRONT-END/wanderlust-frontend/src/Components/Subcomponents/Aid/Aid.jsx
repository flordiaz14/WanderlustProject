import React from "react";
import { helpImages } from "../helpers/helpImages";

const Aid = () => {
  return (
    <div className="iframe">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/7G2Acw1YqYg"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen ={true}
      ></iframe>
    </div>
    // <div>
    //     <h2>¿Cómo obtener la URL para el Mapa?</h2>
    //     <p>Diríjase a la página de <a href="https://www.google.com/maps" target="_blank" rel="noreferrer">Google Maps</a>, e ingrese su dirección en el buscador y efectúe la búsqueda.</p>
    //     <img
    //         className="feature--img"
    //         src={helpImages(`./Map1.png`)}
    //         alt={"Buscador de Google Maps"}
    //     />
    //     <p>Luego haga clic en el menú “Compartir”.</p>
    //     <img
    //         className="feature--img"
    //         src={helpImages(`./Map2.png`)}
    //         alt={"Buscador de Google Maps"}
    //     />
    //     <p>Se desplegará un modal donde debe elegir la opción “Incorporar un mapa”.</p>
    //     <img
    //         className="feature--img"
    //         src={helpImages(`./Map3.png`)}
    //         alt={"Buscador de Google Maps"}
    //     />
    //     <p>Seleccione  todo el contenido del atributo “src” sin las comillas, como se muestra en la siguiente imagen.</p>
    //     <img
    //         className="feature--img"
    //         src={helpImages(`./Map4.png`)}
    //         alt={"Buscador de Google Maps"}
    //     />
    //     <p>Ingrese este dato en el campo “URL para el mapa”.</p>
    // </div>
  );
};

export default Aid;
