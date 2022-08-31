import React, { useContext, useEffect, useState } from "react";
import { helpHttp } from "../../Subcomponents/helpers/helpHttp";
import { useNavigate, useParams } from "react-router-dom";
import location from "../../../Img/location.png";
import Stars from "../../Subcomponents/Stars/Stars";
import Score from "../../Subcomponents/Score/Score";
import Feature from "../../Subcomponents/Feature/Feature";
import ProductImgGallery from "../../Subcomponents/ProductImgGallery/ProductImgGallery";
import { useModal } from "../../Subcomponents/Hooks/useModal";
import Modal from "../../Subcomponents/Modal/Modal";
import SimpleSlider from "../../Subcomponents/SimpleSlider/SimpleSlider";
import Map from "../../Subcomponents/Map/Map";
import Favorite from "../../Subcomponents/Favorite/Favorite";
import ReactData from "../../Subcomponents/ReactDate/ReactDate";
import HeaderProduct from "../../HeaderProduct/HeaderProduct";
import ProductPolicies from "../../ProductPolitics/ProductPolitics";
import  SweetAlert  from "../../Subcomponents/SweetAlert/SweetAlert";
import AuthContext from "../../Context/AuthContext";


function ProductPage() {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { productId, productName } = useParams();
  const [product, setProduct] = useState(null);
  const [excludeDates, setExcludeDates] = useState([]);
  const { user } = useContext(AuthContext);
  const navegation= useNavigate()
  let url = "product/" + productId;

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res?.message) {
          setProduct(res);
          setError(null);
        } else {
          setProduct(null);
          setError({productLoad: "Producto no encontrado."});
        }
        setLoading(false);
      });
  }, [url,error?.productLoad]);

  useEffect(()=>{
    const urlExcludeDates= "product/na/"+ productId
    setLoading(true);
    helpHttp()
      .get(urlExcludeDates)
      .then((res) => {
        if (!res.err) {
          setExcludeDates(res);
          setError(null);
        } else {
          setExcludeDates(null);
          setError(res);
        }
        setLoading(false);
      });
  }, [productId])

  const handleClick=(e)=>{
    e.preventDefault();
    if (user?.validate=== false) {
      setError({validate:"Necesita validar su email, revise su casilla de correos."})
    }else{
      navegation(`/product/${productName}/${productId}/booking`);
    }
  }

    return (
      <div className="product">
        <HeaderProduct category={product?.category?.title} name={product?.name}/>
        {error?.productLoad && <h2 style={{color: "red"}}>{error?.productLoad}</h2>}
        {!error?.productLoad && <>
        <div className="location">
          <div className="location--container">
            <div className="location--img">
              <img src={location} alt="location" />
              <p>
                {product?.city?.state}, {product?.city?.name}, {product?.city?.country} <br />{product?.location}
              </p>
            </div>
            <div className="location--score">
              <Score
                classContainer="score--product"
                classContent="score--product__score"
                scores={product?.rates}
                productId={product?.id}
              />
              <Stars scores={product?.rates} productId={product?.id}/>
            </div>
          </div>
        </div>
        <div className="gallery">
          <div className="gallery--social">
            <Favorite productId={product?.id}/>
          </div>
          <SimpleSlider className="gallery--slider__mobile" images={product?.images} />
          <ProductImgGallery images={product?.images} />
          <button
            onClick={() => {
              openModal();
            }}
          >
            Ver más
          </button>
          <Modal isOpen={isOpenModal} closeModal={closeModal} content={"X"}>
            {isOpenModal && <SimpleSlider images={product?.images} />}
          </Modal>
        </div>
        <div className="description">
          <h2>{product?.descriptionTitle}</h2>
          <p>{product?.description}</p>
        </div>
        <div className="features">
          <div className="features--container">
            <h2>¿Qué ofrece este lugar?</h2>
          </div>
          <hr />
          <Feature data={product?.features} />
        </div>
        <div className="availability">
          <h2>Fechas disponibles</h2>
          <div className="availability--contianer">
            <div className="availability--calendar">
            <ReactData excludeDates={excludeDates}/>
            </div>
            <div className="availability--reserva">
              <div className="availability--reserva__container">
                <p>Te interesó este alojamiento, reservalo ya!!!</p>
                <button
                  className="btn green"
                  onClick={(e)=>handleClick(e)}
                >Iniciar reserva
                </button>
                {error?.validate && <SweetAlert msg={error?.validate} icon={"warning"} />}
              </div>
            </div>
          </div>
        </div>
        <div className="map">
          <h2>¿Dónde vas a estar?</h2>
          <hr />
          <p>
            {product?.city?.name}, {product?.city?.country}
          </p>
          <Map url={product?.map} />
        </div>
            <ProductPolicies politics={product?.politics}/>
        </>}
      </div>
    );
}

export default ProductPage;
