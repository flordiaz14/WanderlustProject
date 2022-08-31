import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { helpHttp } from "../../Subcomponents/helpers/helpHttp";

const MyProductPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const url = "product/admin/" + user?.id;
    setToken(token);
    setLoading(true);
    if (user?.id) {
      helpHttp()
        .get(url)
        .then((res) => {
          if (res) {
            setProducts(res);
            setError(null);
          } else {
            setProducts([]);
            setError(res);
          }
          setLoading(false);
        });
    }
  }, [user, token]);

  useEffect(() => {}, [products]);

  const handleDelete = (id) => {
    const url = "product/" + id;
    setLoading(true);
    let options = {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
    if (token) {
      helpHttp()
        .del(url, options)
        .then((res) => {
          const newList = products?.filter((i) => i.id !== id);
          setProducts(newList);
          setError(null);
          setLoading(false);
        });
    }
  };


  return (
    <div className="booking--page">
    <div className="booking--page__container recommended">
      {products?.length === 0 ? (
        <h2 className="recommended--title">
          Aún no has creado ningún producto.
        </h2>
      ) : (
        <div className="booking--table recommended--cards">
          <table className="table table-striped table-hover">
            <thead className="booking--table__head table-dark">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Dirección</th>
                <th scope="col">Ciudad</th>
                <th scope="col">Categoría</th>
                <th scope="col">Capacidad</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody className="booking--table__body">
              {products?.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{item?.name}</th>
                  <td>{item?.direction}</td>
                  <td>{item?.city?.name}</td>
                  <td>{item?.category?.title}</td>
                  <td>{item?.capacity}</td>
                  <td className="btns">
                    <button
                      className="btn green old newgreen"
                      onClick={() => {
                        navigate(`/admin/${user.username}/add_product`,  { state: { productId : item.id }})
                      }}
                    >
                      Modificar
                    </button>

                    <button
                      className="btn green"
                      onClick={() => handleDelete(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
  )
}

export default MyProductPage;