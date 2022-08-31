import React, { useContext, useEffect, useState } from "react";
import MsgAlert from "../../Subcomponents/MsgAlert/MsgAlert";
import { IoMdHelpCircle } from "react-icons/io";
import Modal from "../../Subcomponents/Modal/Modal";
import { useModal } from "../../Subcomponents/Hooks/useModal";
import Aid from "../../Subcomponents/Aid/Aid";
import { helpHttp } from "../../Subcomponents/helpers/helpHttp";
import { helpImages } from "../../Subcomponents/helpers/helpImages";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const AddProductFormPage = () => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [city, setCity] = useState([]);
  const [categories, setCategories] = useState();
  const [features, setFeatures] = useState(null);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [rule, setRule] = useState(""); // string norma de la casa
  const [rules, setRules] = useState([]); // array normas de la casa
  const [security, setSecurity] = useState(""); // string seguridad y salud
  const [healthSecurity, setHealthSecurity] = useState([]); // array seguridad y salud
  const [cancellation, setCancellation] = useState(""); // string politica de cancelacion
  const [cancellations, setCancellations] = useState([]); // array politicas de cancelacion
  const [property, setProperty] = useState(""); // string nombre del producto
  const [category, setCategory] = useState(""); // string o numero id categoría del producto
  const [address, setAddress] = useState(""); // string direccion del producto
  const [location, setLocation] = useState(""); // string ubicacion desde el centro del producto
  const [capacity, setCapacity] = useState(0); // Capacidad de alojamiento del producto
  const [locationMap, setLocationMap] = useState(""); // string http del mapa del producto
  const [cityVal, setCityVal] = useState(""); // string o numero id ciudad del producto
  const [slogan, setSlogan] = useState(""); // string slogan del producto
  const [description, setDescription] = useState(""); // string descripcion del producto
  const [collectionFeatures, setCollectionFeatures] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const token = localStorage.getItem("token");




  useEffect(() => {
    if (state?.productId) {
      const url = "product/"+state?.productId;
      helpHttp()
      .get(url)
      .then((res) => {
        if (!res?.mesage) {
          setProperty(res?.name)
          setAddress(res?.direction)
          setLocation(res?.location)
          setCapacity(res?.capacity)
          setLocationMap(res?.map)
          setSlogan(res?.descriptionTitle)
          setDescription(res?.description)
          setRules(res?.politics?.rules)
          setHealthSecurity(res?.politics?.healthAndSecurityPolicies)
          setCancellations(res?.politics?.cancellationPolicies)
          setItems(res?.images)
          setCollectionFeatures(res?.features);
          setError(null);
        } else {
          setError(res);
        }
        setLoading(false);
      });
    }
  }, [state?.productId]);


  const urlCity = "city";
  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(urlCity)
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
  }, [urlCity]);

  const urlCategory = "category";
  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(urlCategory)
      .then((res) => {
        if (!res.err) {
          setCategories(res);
          setError(null);
        } else {
          setCategories();
          setError(res);
        }
        setLoading(false);
      });
  }, [urlCategory]);

  const urlFeatures = "feature";
  useEffect(() => {
    setLoading(true);
    let options = {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
    helpHttp()
      .get(urlFeatures, options)
      .then((res) => {
        if (!res.err) {
          setFeatures(res);
          setError(null);
        } else {
          setFeatures();
          setError(res);
        }
        setLoading(false);
      });
  }, [urlFeatures, token]);

  const handleAdd = () => {
    if (url === "" || title === "") {
      setError({ images: "No se pueden sumar campos vacíos." });
    } else if (!url.includes("https://")) {
      setError({ images: "Ingrese una url de imagen correcta." });
    } else {
      setItems([...items, { url, title }]);
      setUrl("");
      setTitle("");
      setError(null);
    }
  };
  const handleInput = (e) => {
    if (e.target.name === "images") setUrl(e.target.value);
    if (e.target.name === "imagesAlt") setTitle(e.target.value);
  };
  const handleDelete = (item, type) => {
    if (type === "img") {
      const newItems = items.filter((i) => i !== item);
      setItems(newItems);
    } else if (type === "rules") {
      const newItems = rules.filter((i) => i !== item);
      setRules(newItems);
    } else if (type === "healthSecurity") {
      const newItems = healthSecurity.filter((i) => i !== item);
      setHealthSecurity(newItems);
    } else if (type === "cancellation") {
      const newItems = cancellations.filter((i) => i !== item);
      setCancellations(newItems);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (property === "") {
      setError({ property: "Este campo es obligatorio." });
    } else if (category === "") {
      setError({ category: "Este campo es obligatorio." });
    } else if (address === "") {
      setError({ address: "Este campo es obligatorio." });
    } else if (location === "") {
      setError({ location: "Este campo es obligatorio." });
    } else if (capacity < 1) {
      setError({
        capacity: "Este campo es obligatorio y requiere un número positovo.",
      });
    } else if (locationMap === "") {
      setError({ locationMap: "Este campo es obligatorio." });
    } else if (
      !locationMap.includes("http://") &&
      !locationMap.includes("https://")
    ) {
      setError({
        locationMap:
          "Ingrese los datos correctamente como se explica en la ayuda.",
      });
    } else if (cityVal === "") {
      setError({ cityVal: "Este campo es obligatorio." });
    } else if (slogan === "") {
      setError({ slogan: "Este campo es obligatorio." });
    } else if (description === "") {
      setError({ description: "Este campo es obligatorio." });
    } else if (collectionFeatures.length === 0) {
      setError({
        collectionFeatures: "Seleccione algún atributo para su producto.",
      });
    } else if (rules.length === 0) {
      setError({ rules: "Agregue alguna política de la casa." });
    } else if (healthSecurity.length === 0) {
      setError({
        healthSecurity: "Agregue alguna norma de seguridad y salud.",
      });
    } else if (cancellations.length === 0) {
      setError({ cancellations: "Agregue alguna norma de cancelación." });
    } else if (items.length < 4 || items.length > 5) {
      setError({ images: "Debe agregar 5 imágenes." });
    } else {
      if (state?.productId) {
        const url = "product";
        let options = {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: {
          id: state?.productId,
          name: property.trim(),
          descriptionTitle: slogan.trim(),
          description: description.trim(),
          direction: address.trim(),
          location: location.trim(),
          map: locationMap,
          capacity: capacity,
          createdBy: user?.id,
          category: {
            id: category,
          },
          city: {
            id: cityVal,
          },
          features: collectionFeatures,
          images: items,
          rates: [],
          politics: {
            rules: rules,
            healthAndSecurityPolicies: healthSecurity,
            cancellationPolicies: cancellations,
          },
        },
      };

      helpHttp()
        .put(url, options)
        .then((res) => {
          if (res?.id) {
            setError(null);
            navigate("/success_add_product",  { state: { message : "Tu propiedad se ha modificado con éxito" }});
          } else {
            setError({ error: res?.message });
          }
          setLoading(false);
          setTimeout(() => setError({}), 5000);
        });        
      }else{
      const url = "product";
      let options = {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: {
          name: property.trim(),
          descriptionTitle: slogan.trim(),
          description: description.trim(),
          direction: address.trim(),
          location: location.trim(),
          map: locationMap,
          capacity: capacity,
          createdBy: user?.id,
          category: {
            id: category,
          },
          city: {
            id: cityVal,
          },
          features: collectionFeatures,
          images: items,
          rates: [],
          politics: {
            rules: rules,
            healthAndSecurityPolicies: healthSecurity,
            cancellationPolicies: cancellations,
          },
        },
      };
      helpHttp()
        .post(url, options)
        .then((res) => {
          if (res?.id) {
            setError(null);
            navigate("/success_add_product",  { state: { message : "Tu propiedad se ha creado con éxito" }});
          } else {
            setError({ error: res?.message });
          }
          setLoading(false);
          setTimeout(() => setError({}), 5000);
        });
      }
    }
  };

  return (
    <div className="form">
      <div className="form--add">
        <h2>Crear propiedad</h2>
        <div className="property">
          <label htmlFor="property">Nombre de la propiedad</label>
          <input
            type="text"
            id="property"
            name="property"
            onChange={(e) => {
              setProperty(e.target.value);
              error?.property && setError(null);
            }}
            value={property}
            placeholder="Hotel Hermirage"
            className={error?.property && "msgError--input"}
          />
          {error?.property && <MsgAlert msg={error?.property} />}
        </div>
        <div className="category">
          <label htmlFor="category">Categoria</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              error?.category && setError(null);
            }}
            id="category"
            name="category"
          >
            <option value="">Categoría</option>
            {categories?.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </select>
          {error?.category && <MsgAlert msg={error?.category} />}
        </div>
        <div className="address">
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={(e) => {
              setAddress(e.target.value);
              error?.address && setError(null);
            }}
            value={address}
            placeholder="Av. Colón 1643"
            className={error?.address && "msgError--input"}
          />
          {error?.address && <MsgAlert msg={error?.address} />}
        </div>
        <div className="location">
          <label htmlFor="location">Ubicación</label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={(e) => {
              setLocation(e.target.value);
              error?.location && setError(null);
            }}
            value={location}
            placeholder="A 1 km del centro de la ciudad"
            maxLength="100"
            className={error?.location && "msgError--input"}
          />
          {error?.location && <MsgAlert msg={error?.location} />}
        </div>
        <div className="capacity">
          <label htmlFor="capacity">Capacidad de hospedaje por persona</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            onChange={(e) => {
              setCapacity(e.target.value);
              error?.capacity && setError(null);
            }}
            value={capacity}
            placeholder="10"
            className={error?.capacity && "msgError--input"}
          />
          {error?.capacity && <MsgAlert msg={error?.capacity} />}
        </div>
        <div className="locationMap">
          <label htmlFor="locationMap">
            URL para el Mapa{" "}
            <IoMdHelpCircle
              onClick={() => {
                openModal();
              }}
            />
          </label>
          <input
            type="text"
            id="locationMap"
            name="locationMap"
            onChange={(e) => {
              setLocationMap(e.target.value?.trim());
              error?.locationMap && setError(null);
            }}
            value={locationMap}
            placeholder="Insertar https://"
            maxLength="100"
            className={error?.locationMap && "msgError--input"}
          />
          <Modal isOpen={isOpenModal} closeModal={closeModal} content={"X"}>
            {isOpenModal && <Aid />}
          </Modal>
          {error?.locationMap && <MsgAlert msg={error?.locationMap} />}
        </div>
        <div className="city">
          <label htmlFor="city">Ciudad</label>
          <select
            value={cityVal}
            onChange={(e) => {
              setCityVal(e.target.value);
              error?.cityVal && setError(null);
            }}
            id="city"
            name="city"
          >
            <option value="">Ciudad</option>
            {city?.map((e, i) => (
              <option key={e?.id} value={e?.id} >
              {e?.name}
            </option>
            ))}
          </select>
          {error?.cityVal && <MsgAlert msg={error?.cityVal} />}
        </div>
        <div className="slogan">
          <label htmlFor="slogan">Slogan</label>
          <input
            type="text"
            id="slogan"
            name="slogan"
            onChange={(e) => {
              setSlogan(e.target.value);
              error?.slogan && setError(null);
            }}
            value={slogan}
            placeholder="Disfruta Buenos aires desde nuestro hotel"
            maxLength="250"
            className={error?.slogan && "msgError--input"}
          />
          {error?.slogan && <MsgAlert msg={error?.slogan} />}
        </div>
        <div className="description">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            cols="50"
            placeholder="Escribir aquí"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              error?.description && setError(null);
            }}
            maxLength="1500"
            className={error?.description && "msgError--input"}
          ></textarea>
          {error?.description && <MsgAlert msg={error?.description} />}
        </div>
        <div className="features">
          <h3 className="features--title">Agregar atributos</h3>
          <div className="features--icons">
            {features?.map((element) => (
              <label key={element.id} htmlFor={element.name}>
                <input
                  type="checkbox"
                  id={element?.name}
                  name={element?.name}
                  value={element?.id}
                  defaultChecked={
                    collectionFeatures.some(e=> e.id === element.id)
                  }
                  onChange={(e) => {
                    let list = [...collectionFeatures];
                    const value = e?.target?.value;
                    if (e.target.checked) {
                      setCollectionFeatures([...list, { id: value }]);
                    } else {
                      const filter = list?.filter((e) => e.id !== value);
                      setCollectionFeatures(filter);
                    }
                    error?.collectionFeatures && setError(null);
                  }}
                />
                {element?.name}
                <img
                  className="feature--img"
                  src={helpImages(`./${element.icon}.png`)}
                  alt={element.name}
                />
              </label>
            ))}
            {error?.collectionFeatures && (
              <MsgAlert msg={error?.collectionFeatures} />
            )}
          </div>
        </div>
        <div className="politics">
          <h3 className="politics--title">Políticas del Producto</h3>
          <div className="politics--container">
            <div className="rules">
              <h4>Normas de la casa</h4>
              <label htmlFor="rules">Descripción</label>
              <input
                type="text"
                id="rules"
                name="rules"
                onChange={(e) => {
                  setRule(e.target.value);
                  error?.rules && setError(null);
                }}
                value={rule}
                placeholder="Check-Out 10:00"
                className={error?.rules && "msgError--input"}
              />
              <button
                className="btn green"
                onClick={(e) => {
                  e.preventDefault();
                  if (rule === "") {
                    setError({ rules: "No se pueden sumar campos vacíos." });
                  } else {
                    setRules([...rules, { description: rule }]);
                    setRule("");
                  }
                }}
              >
                +
              </button>
              <ul>
                {rules?.map((item, i) => (
                  <li key={i}>
                    <label htmlFor="rules">Descripción</label>
                    <input
                      type="text"
                      id="rules"
                      value={item.description}
                      readOnly
                    />
                    <button onClick={() => handleDelete(item, "rules")}>
                      x
                    </button>
                  </li>
                ))}
              </ul>
              {error?.rules && <MsgAlert msg={error?.rules} />}
            </div>
            <div className="healthSecurity">
              <h4>Salud y Seguridad</h4>
              <label htmlFor="healthSecurity">Descripción</label>
              <input
                type="text"
                id="healthSecurity"
                name="healthSecurity"
                onChange={(e) => {
                  setSecurity(e.target.value);
                  error?.healthSecurity && setError(null);
                }}
                value={security}
                placeholder="Depósito de seguridad."
                className={error?.healthSecurity && "msgError--input"}
              />
              <button
                className="btn green"
                onClick={(e) => {
                  e.preventDefault();
                  if (security === "") {
                    setError({
                      healthSecurity: "No se pueden sumar campos vacíos.",
                    });
                  } else {
                    setHealthSecurity([
                      ...healthSecurity,
                      { description: security },
                    ]);
                    setSecurity("");
                  }
                }}
              >
                +
              </button>
              <ul>
                {healthSecurity.map((item, i) => (
                  <li key={i}>
                    <label htmlFor="healthSecurity">Descripción</label>
                    <input
                      type="text"
                      id="healthSecurity"
                      value={item.description}
                      readOnly
                    />
                    <button
                      onClick={() => handleDelete(item, "healthSecurity")}
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
              {error?.healthSecurity && (
                <MsgAlert msg={error?.healthSecurity} />
              )}
            </div>
            <div className="cancellation">
              <h4>Política de cancelación</h4>
              <label htmlFor="cancellation">Descripción</label>
              <input
                type="text"
                id="cancellation"
                name="cancellation"
                onChange={(e) => {
                  setCancellation(e.target.value);
                  error?.cancellations && setError(null);
                }}
                value={cancellation}
                placeholder="Se permiten cancelaciones."
                className={error?.cancellations && "msgError--input"}
              />
              <button
                className="btn green"
                onClick={(e) => {
                  e.preventDefault();
                  if (cancellation === "") {
                    setError({
                      cancellations: "No se pueden sumar campos vacíos.",
                    });
                  } else {
                    setCancellations([
                      ...cancellations,
                      { description: cancellation },
                    ]);
                    setCancellation("");
                  }
                }}
              >
                +
              </button>
              <ul>
                {cancellations.map((item, i) => (
                  <li key={i}>
                    <label htmlFor="cancellation">Descripción</label>
                    <input
                      type="text"
                      id="cancellation"
                      value={item.description}
                      readOnly
                    />
                    <button onClick={() => handleDelete(item, "cancellation")}>
                      x
                    </button>
                  </li>
                ))}
              </ul>
              {error?.cancellations && <MsgAlert msg={error?.cancellations} />}
            </div>
            <div className="images">
              <h3>Cargar imágenes</h3>
              <div className="images--left">
                <label htmlFor="images">URL de la imagen</label>
                <input
                  type="text"
                  id="images"
                  name="images"
                  onChange={handleInput}
                  value={url?.trim()}
                  maxLength="500"
                  placeholder="Insertar https://"
                  className={error?.images && "msgError--input"}
                />
              </div>
              <div className="images--right">
                <label htmlFor="imagesAlt">Descripción de la imagen</label>
                <input
                  type="text"
                  id="imagesAlt"
                  name="imagesAlt"
                  onChange={handleInput}
                  value={title}
                  maxLength="255"
                  placeholder="Hermirage-restaurant"
                  className={error?.images && "msgError--input"}
                />
              </div>
              <button className="btn green" onClick={handleAdd}>
                +
              </button>
              <ul className="ul--container">
                {items.map((item, i) => (
                  <li className="li--container" key={i}>
                    <div className="li--left">
                      <label htmlFor="images">URL de la imagen</label>
                      <input type="text" id="images" value={item.url} readOnly />
                    </div>
                    <div className="li--right">
                    <label htmlFor="imagesAlt">Descripción de la imagen</label>
                    <input
                      type="text"
                      id="imagesAlt"
                      value={item.title}
                      readOnly
                    />
                    </div>
                    <button
                      className="li--button btn green"
                      onClick={() => handleDelete(item, "img")}
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
              {error?.images && <MsgAlert msg={error?.images} />}
            </div>
            {error?.error && (
              <MsgAlert
                msg={
                  "No se pudo dar de alta su producto, por favor intentelo más tarde."
                }
              />
            )}
          </div>
        </div>
        <button className="crear btn green" onClick={(e) => handleClick(e)}>
          Crear propiedad
        </button>
      </div>
    </div>
  );
};

export default AddProductFormPage;
