import React, { useState, useEffect } from "react";
import locationCity from "../../../Img/locationCity.png";
import location from "../../../Img/location.png";
import { helpHttp } from "../helpers/helpHttp";
import MsgAlert from "../MsgAlert/MsgAlert";

const Select = ({ setSelect, setErrorForm }) => {
  const [city, setCity] = useState([]);
  const [citySearch, setCitySearch] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const [citySearchVisible, setCitySearchVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = "city";

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setCity(res);
          setError(null);
        } else {
          setCity([]);
          setError(res);
        }
        setLoading(false);
      });
  }, [url]);

  const searchCity=(e)=> {
    let stringSearchCity = e.target.value;
    let stringSearchCityNormal = stringSearchCity
      .split(" ")
      .join("")
      .toLowerCase();
    let citySearchLocal = city.filter((e) =>
      e.name.split(" ").join("").toLowerCase().includes(stringSearchCityNormal)
    );
    setCitySearch([...citySearchLocal.map((e) => e)]);
    setCitySearchVisible(true);
  }

  const handleClick=(e)=> {
    e.preventDefault();
    setValueInput(e.target.textContent);
    setSelect(e.target.textContent);
    setCitySearchVisible(false);
  }


const handleChange=(e)=>{
  setValueInput(e.target.value);
  setSelect(e.target.value);
  setErrorForm(null);
}

  return (
    <>
      <div onMouseLeave={() => setCitySearchVisible(false)} className="select">
        <img
          className="select--img"
          src={location}
          alt="location search city"
        />
        <input
          className="select--input"
          name=""
          onKeyUp={(e) => searchCity(e)}
          placeholder=" ¿ A dónde vamos ?"
          value={valueInput}
          onChange={(e) => handleChange(e)}
        />
        {citySearchVisible && (
          <div className="select--container">
            {citySearch?.map((e) => (
              <div className="select--city" key={e.id}>
                {" "}
                <div className="select--city--left">
                  <img src={locationCity} alt="location City" />
                </div>
                <div className="select--city--right">
                  <h3 value={e.name} onClick={(e) => handleClick(e)}>
                    {e.name}
                  </h3>
                  <p>{e.country}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {error && <MsgAlert msg={error.error} />}
      </div>
    </>
  );
};

export default Select;
