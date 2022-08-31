import React, {useEffect, useState} from 'react';
import { useLocation, useSearchParams } from "react-router-dom";
import { helpHttp } from "../../Subcomponents/helpers/helpHttp";
import Search from "../../Search/Search";
import CardProduct from "../../Subcomponents/Card_Product/CardProduct";

function ProductsCityPage() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [listProducts, setListProducts] = useState([]);
    const [searchParam]=useSearchParams();
    const location= useLocation();
    const reg = /-/g;
    const search = location.search.replace(reg,"+");

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

  let url = "product/city" + search;

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
      <div className='products--city__page'>
          <Search/>
          <h2 className='products--city__page--title'>{searchParam.get("name").replace(reg," ")}: {!listProducts? 0 : listProducts?.length} alojamientos encontrados</h2>
          <div className='recommended--cards'>
          {listProducts?.map(e => (
          <CardProduct key={e.id} data={e} />
        ))}
          </div>
      </div>
  );
}

export default ProductsCityPage;
