import React from "react";
import { helpImages } from "../helpers/helpImages";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Stars from "../Stars/Stars";
import Score from "../Score/Score";
import Favorite from "../Favorite/Favorite";


export default function CardProduct({ data }) {
  const navegation = useNavigate();
  const product = data;
  const reg = /\s/g;
  const url = product?.name.replace(reg, "-");

  const handleNavegation = (product) =>{
    navegation(`/product/${url}/${product?.id}`)
  }

  return (
    <div className="cardProduct">
      <div className="cardProduct--left">
        <div className="cardProduct--img">
          {product?.images?.map((e, i)=>i <1 && <img key={e?.id} src={e?.url} alt={product?.title}/>)}
          <Favorite className="favorite" productId={product?.id}/>
        </div>
      </div>
      <div className="cardProduct--right">
        <div className="card-header">
          <div className="card--product__category">
            <div className="cardProduct--category__name">
              <h4>{product?.category?.title}</h4>
            </div>
            <Stars scores={product?.rates} productId={product?.id}/>
            <h2>{product?.name}</h2>
          </div>
          <Score
            classContainer="card--score__product"
            classContent="card--score__product--score"
            scores={product?.rates}
            productId={product?.id}
          />
        </div>
        <div className="card--location__product">
          <p>
            {" "}
            <IoLocationSharp />{product?.location}{" "}
            <button
            onClick={()=> {handleNavegation(product)}}
            >
              MOSTRAR EN EL MAPA
            </button>
          </p>
        </div>
        <div className="card--icons__product">
        {product?.features?.map((e,i) => (
          i < 5 &&
          <img
            key={e?.id}
            className="feature--img"
            src={helpImages(`./${e?.icon}.png`)}
            alt={e?.name}
          />
      ))}
        </div>
        <div className="card--description__product">
          <p>
            {product?.description}
          </p>
        </div>
          <button className="btn green" onClick={()=> {handleNavegation(product)}}>Ver más</button>          
      </div>
    </div>
  );
}
