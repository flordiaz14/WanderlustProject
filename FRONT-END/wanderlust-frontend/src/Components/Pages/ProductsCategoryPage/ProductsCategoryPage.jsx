import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Search from "../../Search/Search";
import CardProduct from "../../Subcomponents/Card_Product/CardProduct";
import { helpHttp } from "../../Subcomponents/helpers/helpHttp";

const ProductsCategoryPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const [searchParam]=useSearchParams();
  const location = useLocation();
  const reg = /-/g;
  const search = location.search.replace(reg, "+");
  let url = "product/category" + search;

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setListProducts(res);
          setError(null);
        } else {
          setListProducts(null);
          setError(res);
        }
        setLoading(false);
      });
  }, [url]);

  return (
    <div className="products--category__page">
      <Search />
      <h2 className="products--category__page--title">Cantidad de resultados encontrados para <strong>{searchParam.get("title").replace(reg," ")}</strong>: {!listProducts? 0 : listProducts?.length} </h2>
      <div className="recommended--cards">
        {listProducts?.map((e) => (
          <CardProduct key={e.id} data={e} />
        ))}
      </div>
    </div>
  );
};

export default ProductsCategoryPage;
