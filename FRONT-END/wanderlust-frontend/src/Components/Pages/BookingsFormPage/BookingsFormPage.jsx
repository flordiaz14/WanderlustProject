import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { helpImages } from "../../Subcomponents/helpers/helpImages";
import AuthContext from "../../Context/AuthContext";
import HeaderProduct from "../../HeaderProduct/HeaderProduct";
import ProductPolitics from "../../ProductPolitics/ProductPolitics";
import { helpHttp } from "../../Subcomponents/helpers/helpHttp";
import ReactDate from "../../Subcomponents/ReactDate/ReactDate";
import Stars from "../../Subcomponents/Stars/Stars";
import SweetAlert from "../../Subcomponents/SweetAlert/SweetAlert";
import emailjs from "@emailjs/browser";

const token = localStorage.getItem("token");

const FormBookingsPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [excludeDates, setExcludeDates] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const refDayCheckIn = useRef();
  const refDayCheckOut = useRef();
  const refMonthCheckIn = useRef();
  const refMonthCheckOut = useRef();
  const refYearCheckIn = useRef();
  const refYearCheckOut = useRef();
  const refUserName = useRef();
  const refUserEmail = useRef();
  const refUserLastName = useRef();
  const refUserCity = useRef();
  const refSelect = useRef();
  const hours=["01:00","02:00","03:00","04:00","05:00","06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


const checkDateRange=(dateRange,excludeDates )=>{
  let res;
  const [start, end]=dateRange;
  const listExcludeDates= excludeDates?.map(e=>({start:new Date(e?.inicio_periodo), end: new Date(e?.fin_periodo)}));
  listExcludeDates.map(e=>{
    if(e.start?.getTime() > end?.getTime()){
      res=false;
    }else if(e.end?.getTime() < start?.getTime()){
      res=false;
    }else{
      res=true;
    }
  })
  return res;
}

  let url = "product/" + productId;

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

  useEffect(() => {
    const months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    const [startDate, finalDate] = dateRange?.map((e) => new Date(e));
    if (startDate !== undefined) {      
      if (startDate?.getDate() < 10) {
        refDayCheckIn.current.value = "0"+startDate?.getDate();
      }else{
        refDayCheckIn.current.value = startDate?.getDate();
      }
      refMonthCheckIn.current.value = months[startDate?.getMonth()];
      refYearCheckIn.current.value = startDate?.getFullYear();
    } else {
      refDayCheckIn.current.value = "";
      refMonthCheckIn.current.value = "";
      refYearCheckIn.current.value = "";
    }

    if (finalDate !== undefined) {
      if (finalDate?.getDate() < 10) {
        refDayCheckOut.current.value = "0"+finalDate?.getDate();
      }else{
        refDayCheckOut.current.value = finalDate?.getDate();
      }
      refMonthCheckOut.current.value = months[finalDate?.getMonth()];
      refYearCheckOut.current.value = finalDate?.getFullYear();
    } else {
      refDayCheckOut.current.value = "";
      refMonthCheckOut.current.value = "";
      refYearCheckOut.current.value = "";
    }
  }, [dateRange]);

  useEffect(() => {
    if (user) {
      refUserName.current.value = user.name;
      refUserEmail.current.value = user.username;
      refUserLastName.current.value = user.lastname;
    }
  }, [user]);

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
    if (refUserCity.current.value==="") {
      setError({error: "Debe indicar la ciudad donde vive."})      
    }else if (refDayCheckIn.current.value==="" && refDayCheckOut.current.value===""){
      setError({error: "Debe seleccionar un rango de fecha para la reserva."})
    }else if (checkDateRange(dateRange,excludeDates)){
      setError({error: "Debe seleccionar un rango de fecha que no incluya un rango de reserva completa."})
    }else if (refSelect.current.value===""){
      setError({error: "Debe seleccionar una hora de llegada."})
    }else{ 
      const url = "users";  
      let options={
        headers:{
          Authorization :`Bearer ${JSON.parse(token)}`,
        },
        body:{
          "username": user.username,
          "validate": "",
          "city": refUserCity.current.value
        },
      }
      helpHttp()
        .put(url, options)
        .then((res) => {
          if (res?.id) {
            setError(null);
            setUser(res);
          }else{
            setError({error: res?.message});
          }
          setLoading(false);
          setTimeout(() => setError({}), 5000);
        });      

    const urlBooking = "booking";  
    let optionsBooking={
      headers:{
        Authorization :`Bearer ${JSON.parse(token)}`,
      },
      body:{
        "startTime": `${refSelect.current.value}`,
        "startDate": `${refYearCheckIn.current.value}-${refMonthCheckIn.current.value}-${refDayCheckIn.current.value}`,
        "endingDate": `${refYearCheckOut.current.value}-${refMonthCheckOut.current.value}-${refDayCheckOut.current.value}`,
        "product": {
          "id": product.id
          },
        "user": {
          "id": user.id
        }
        },
      };
    helpHttp()
    .post(urlBooking, optionsBooking)
    .then((res) => {
      if (res?.id) {
        const templateParams = {
          name: user.name,
          email: user.username,
          html: `<div style="background:#92c8a7;padding:50px 10px">
          <div style="max-width:600px;margin:auto">
          <div style="background:white;padding:15px 30px 25px 30px;border-radius:5px">
          <h1>Hola ${user.name}:</h1>
          <p>Gracias por usar Wanderlust!!</p>
          <p>Tu reserva en <strong>${product.name}</strong> para el día <strong>${refDayCheckIn.current.value}-${refMonthCheckIn.current.value}</strong>, hasta el día <strong>${refDayCheckOut.current.value}-${refMonthCheckOut.current.value}</strong> ha sido registrada con éxito.</p>
          <h2>Esperamos que disfrutes de tu estadía.</h2>
          <p style="margin-top:40px">Saludos,<br>Wanderlust</p>
          </div>
          </div>
          </div>`,
        };
        //send email function
        /*emailjs
          .send(
            "service_7wiru2e",
            "template_validation_emai",
            templateParams,
            "TV_a2Oj5KVD_5vet8"
          )
          .then(
            (response) => {
              console.log("SUCCESS!", response.status, response.text);
            },
            (error) => {
              console.log("FAILED...", error);
            }
          );*/
        setError(null);
        navigate("/success");
      }else{
        setError({error: res?.message});
      }
      setLoading(false);
      setTimeout(() => setError({}), 4000);
    });
    }}

  return (
    <>
      <HeaderProduct category={product?.category?.title} name={product?.name} />
      <div className="form--booking">
        <div className="userData">
        {error?.productLoad && <h2 style={{color: "red"}}>{error?.productLoad}</h2>}
          <h2>Completá tus datos</h2>
          <div className="userData--container">
            <div className="userData--name">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                ref={refUserName}
                readOnly
              />
            </div>
            <div className="userData--lastname">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                ref={refUserLastName}
                readOnly
              />
            </div>
            <div className="userData--email">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                ref={refUserEmail}
                readOnly
              />
            </div>
            <div className="userData--city">
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                id="city"
                name="city"
                required
                ref={refUserCity}
              />
            </div>
          </div>
        </div>
        <div className="date">
          <h2>Seleccioná tu fecha de reserva</h2>
          <ReactDate setDateRange={setDateRange} setErrorForm={setError} excludeDates={excludeDates}/>
        </div>
        <div className="time">
          <h2>Tu horario de llegada</h2>
          <div className="time--container">
            <FaRegCheckCircle className="time--icon" /> Tu habitación va a estar
            lista para el check-in entre las 10:00 AM y las 11:00 PM
            <p>Indicá tu horario estimado de llegada</p>
            <select ref={refSelect}>
              <option value="">
                Seleccionar hora de llegada
              </option>
              {hours.map(e=>(<option key={e+" AM"} value={e+" AM"}>{e+" AM"}</option>))}
              {hours.map(e=>(<option key={e+" PM"} value={e+" PM"}>{e+" PM"}</option>))}
            </select>
          </div>
        </div>
        <div className="dataProduct">
          <div className="dataProduct--container">
            <h2 className="dataProduct--title">Detalle de la reserva</h2>
            <div className="dataProduct--wrapper">
              <div className="dataProduct--wrapper__left">
                <img
                  className="dataProduct--img"
                  src={product?.images[0]?.url}
                  alt={product?.images[0]?.title}
                />
              </div>
              <div className="dataProduct--wrapper__right">
                <h4>{product?.category?.title}</h4>
                <h2>{product?.name}</h2>
                <Stars scores={product?.rates} productId={product?.id}/>
                <div className="location--container">
                  <div className="location--img">
                    <img src={helpImages(`./location.png`)} alt="location" />
                  </div>
                  <p>
                    {product?.city?.state}, {product?.city?.name},{" "}
                    {product?.city?.country} <br />
                    {product?.location}
                  </p>
                </div>
                <hr />
                <div className="Check-in">
                  <h3>Check in</h3>
                  <div>
                    <input type="text" ref={refDayCheckIn} readOnly /> /{" "}
                    <input type="text" ref={refMonthCheckIn} readOnly /> /{" "}
                    <input type="text" ref={refYearCheckIn} readOnly />
                  </div>
                </div>
                <hr />
                <div className="Check-out">
                  <h3>Check out</h3>
                  <div>
                    <input type="text" ref={refDayCheckOut} readOnly /> /{" "}
                    <input type="text" ref={refMonthCheckOut} readOnly /> /{" "}
                    <input type="text" ref={refYearCheckOut} readOnly />
                  </div>
                </div>
                <hr />
                <button className="btn green" onClick={(e) => handleClick(e)}>
                  Confirmar reserva
                </button>
              </div>
            </div>
          </div>
        </div>
        {error?.error && <SweetAlert msg={error.error} icon={"error"} />}
      </div>
      <ProductPolitics politics={product?.politics}/>
    </>
  );
};

export default FormBookingsPage;
