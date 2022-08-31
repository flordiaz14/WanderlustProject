import React, { useState, useEffect } from "react";
import Select from "../Subcomponents/Select/Select";
import { helpImages } from "../Subcomponents/helpers/helpImages";
import ReactData from "../Subcomponents/ReactDate/ReactDate";
import { useNavigate } from "react-router-dom";
import { useModal } from "../Subcomponents/Hooks/useModal";
import Modal from "../Subcomponents/Modal/Modal";
import MsgAlert from "../Subcomponents/MsgAlert/MsgAlert";

export default function Search() {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [errorForm, setErrorForm] = useState(null);
  const [select, setSelect] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const reg = /\s/g;
  
  useEffect(() => {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    setValue(dateRange?.map(e=> {
      const fecha = new Date(e);
      return fecha.getDate()  +" "+ months[fecha.getMonth()]
    })
    );
  }, [dateRange])
  
  const handleSearch=(e)=>{
    e.preventDefault()
    if (select && dateRange.length !== 0 ) {
      setErrorForm(null);
      //redireccionar a la busqueda por fecha y ciudad
      const selectUrl = select.replace(reg,"-"); 
      const[ dateStart, dateEnd] = dateRange;
      const start= dateStart.getFullYear()+"-"+(Number(dateStart.getMonth())+1)+"-"+dateStart.getDate();
      const end = dateEnd.getFullYear()+"-"+(Number(dateEnd.getMonth())+1)+"-"+dateEnd.getDate();
      navigate("/product/city_daterange?name=" + selectUrl+"&start="+start+"&end="+end);
      setSelect(null);
      setValue("");       
    } else if(dateRange.length !== 0){
      setErrorForm(null);
      //redireccionar a la busqueda por fecha
      const[ dateStart, dateEnd] = dateRange;
      const start= dateStart.getFullYear()+"-"+(Number(dateStart.getMonth())+1)+"-"+dateStart.getDate();
      const end = dateEnd.getFullYear()+"-"+(Number(dateEnd.getMonth())+1)+"-"+dateEnd.getDate();
      navigate("/product/daterange?start="+start+"&end="+end);
      setValue("");
    } else if(select){
      setErrorForm(null);
      const selectUrl = select.replace(reg,"-");
      navigate("/product/city?name=" + selectUrl);
      setSelect(null) 
    }else {
      setErrorForm({
        error: "Por favor ingrese una ciudad y/o un rango de fecha para la búsqueda."
      })
    }
  }

  return (
    <div className="search">
      <h1>Busca ofertas en hoteles, casas y mucho más</h1>
      <div className="search--form" >
        <div className="search--form__inputs">
          <Select setSelect={setSelect} errorForm={errorForm} setErrorForm={setErrorForm} />
          <div className="search--calendar">
          <img
            className="feature--img"
            src={helpImages(`./calendar.png`)}
            alt="calendar"
            onClick={() => {
              openModal();
            }}
          />
          <input type="text" 
                  id="dateRange"
                  placeholder= "Check in - Check out" 
                  onFocus={() => {
                    openModal();
                    }}
                    value={value}
                  readOnly />
          <Modal isOpen={isOpenModal} closeModal={closeModal} content={"Aplicar"}>
            {isOpenModal && <ReactData setDateRange={setDateRange} setErrorForm={setErrorForm}/>}
          </Modal>
          </div>
          <button className="btn green old" onClick={handleSearch}>Buscar</button>
        </div>
        {errorForm && <MsgAlert  msg={errorForm.error} />} 
      </div>
    </div>
  );
}
