import React, { useEffect, useState } from "react";
import { helpHttp } from "../../Subcomponents/helpers/helpHttp";
import Categories from '../../Categories/Categories';
import Recommended from '../../Recommended/Recommended'
import Search from "../../Search/Search";

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [errorProducts, setErrorProduct] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    
    let url = "category";
  
    useEffect(() => {
      setLoading(true);
      helpHttp()
        .get(url)
        .then((res) => {
          if (!res.err) {
            setCategories(res);
            setError(null);
          } else {
            setCategories(null);
            setError(res);
          }
          setLoading(false);
        });
    }, [url]);

    let urlProducts = "product";

    useEffect(() => {
        setLoadingProducts(true);
      helpHttp()
        .get(urlProducts)
        .then((res) => {
          if (!res.err) {
            setListProducts(res);
            setErrorProduct(null);
          } else {
            setListProducts(null);
            setErrorProduct(res);
          }
          setLoadingProducts(false);
        });
    }, [urlProducts]);

const productsOrderByCategies= listProducts?.map(e=> e.category.title).sort();
let categoriesOfProducts =[];
let storerTimeRepeated= [];
let counter=1;

productsOrderByCategies?.map((e,i)=>{ 
  if (productsOrderByCategies[i+1] === productsOrderByCategies[i] ) {
    counter ++;
  }else{
    categoriesOfProducts.push(productsOrderByCategies[i])
    storerTimeRepeated.push(counter);
    counter= 1;
  }
})

const  joinArray = (categoriesOfProducts, storerTimeRepeated) => {
  let contents = [categoriesOfProducts, storerTimeRepeated ]
  return contents.reduce(
    (a,v)=>(v.forEach((e, i) => a[i].push(e)), a),
    Array.from({
      length: Math.max(...contents.map(d=> d.length))
    }).map(d=> [])
  );
}

const res= joinArray(categoriesOfProducts, storerTimeRepeated);

    return(
     <div className='home'>
         <Search/>
         <Categories data={categories} error={error} loading={loading} total={res}/>
         <Recommended data={listProducts} error={errorProducts} loading={loadingProducts}/>
     </div>
    );
}


