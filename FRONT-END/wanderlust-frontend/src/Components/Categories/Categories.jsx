import React from "react";
import { Link } from "react-router-dom";
import CardCategory from "../Subcomponents/Card_Category/CardCategory";

export default function Categories({ data, error, loading, total}) {
  const reg = /\s/g;
  return (
    <div className="categories">
      <h2 className="categories--title">Buscar por tipo de alojamiento</h2>
      <div className="categories--container">
        {data?.map((e, i) => (
          i < 4 && <Link to={`product/category?title=${e.title.replace(reg, "-")}`} key={e.id}><CardCategory data={e} total={total} /></Link>
        ))}
      </div>
    </div>
  );
}


