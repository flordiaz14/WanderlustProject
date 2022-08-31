import React from "react";
import { helpImages } from "../helpers/helpImages";

const Feature = ({ data }) => {
  const features = data;
  return (
    <div className="feature">
      {features?.map((e) => (
        <div className="feature--container" key={e.id}>
          <img
            className="feature--img"
            src={helpImages(`./${e.icon}.png`)}
            alt={e.name}
          />{" "}
          <p className="feature--name">{e.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Feature;
