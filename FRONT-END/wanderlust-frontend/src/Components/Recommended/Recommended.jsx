import React from "react";
import CardProduct from "../Subcomponents/Card_Product/CardProduct";

export default function Recommended({ data, error, loading}) {

  return (
    <div className="recommended">
      <h1 className="recommended--title">Recomendaciones</h1>
      <div className="recommended--cards">
        {data?.map((e, i) => (
          i < 4 && <CardProduct key={e.id} data={e} />
        ))}
      </div>
    </div>
  );
}
