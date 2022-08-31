import React, {useEffect, useState} from 'react';
import { useSearchParams } from "react-router-dom";
import { helpHttp } from "../../Subcomponents/helpers/helpHttp";
import Search from "../../Search/Search";
import CardProduct from "../../Subcomponents/Card_Product/CardProduct";

function ProductsCityDatePage() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [listProducts, setListProducts] = useState([]);
    const [searchParam]=useSearchParams();
    const reg = /-/g;

    let dateStart = searchParam.get("start");
  let prueva = new Date(dateStart);
  let dayStart = prueva.getDate();
  if (dayStart < 10) {
    dayStart = "0" + dayStart;
  }
  let monthStart = prueva.getMonth() + 1;
  if (monthStart < 10) {
    monthStart = "0" + monthStart;
  }
  let yearStart = prueva.getFullYear();

  let start = yearStart + "-" + monthStart + "-" + dayStart;
  //-----------------------------------------------------
  let dateEnd = searchParam.get("end");
  let pruevaEnd = new Date(dateEnd);
  let dayEnd = pruevaEnd.getDate();
  if (dayEnd < 10) {
    dayEnd = "0" + dayEnd;
  }
  let monthEnd = pruevaEnd.getMonth() + 1;
  if (monthEnd < 10) {
    monthEnd = "0" + monthEnd;
  }
  let yearEnd = pruevaEnd.getFullYear();

  let end = yearEnd + "-" + monthEnd + "-" + dayEnd;

  let url = "product/"+start+"/"+end+"/"+searchParam.get("name").replace(reg," ");

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
      <div className='products--city__page'>
          <Search/>
          <h2 className='products--city__page--title'>{!listProducts? 0 : listProducts?.length} Alojamientos encontrados para el {searchParam.get("start")} hasta el {searchParam.get("end")} en {searchParam.get("name").replace(reg, " ")}</h2>
          <div className='recommended--cards'>
          {listProducts?.map(e => (
          <CardProduct key={e.id} data={e} />
        ))}
          </div>
      </div>
  );
}

export default ProductsCityDatePage;
