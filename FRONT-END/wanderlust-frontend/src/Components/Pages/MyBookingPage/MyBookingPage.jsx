import React, { useContext, useEffect, useState } from "react";
import HeaderProduct from "../../HeaderProduct/HeaderProduct";
import AuthContext from "../../Context/AuthContext";
import { helpHttp } from "../../Subcomponents/helpers/helpHttp";
import emailjs from "@emailjs/browser";

const MyBookingPage = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  //console.log(bookings);

  useEffect(() => {
    const url = "booking/product/user/" + user?.id;
    const token = localStorage.getItem("token");
    setToken(token);
    setLoading(true);
    let options = {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
    if (user?.id) {
      helpHttp()
        .get(url, options)
        .then((res) => {
          if (res) {
            setBookings(res);
            setError(null);
          } else {
            setBookings([]);
            setError(res);
          }
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {}, [bookings]);

  const handleDelete = (booking) => {
    const url = "booking/" + booking.id;
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
          console.log(res?.statusText);
          const newList = bookings?.filter((i) => i.id !== booking.id);
          setBookings(newList);
          const templateParams = {
            name: user.name,
            email: user.username,
            html: `<div style="background:#92c8a7;padding:50px 10px">
            <div style="max-width:600px;margin:auto">
            <div style="background:white;padding:15px 30px 25px 30px;border-radius:5px">
            <h1>Hola ${user.name}:</h1>
            <p>Gracias por usar Wanderlust!!</p>
            <p>Tu reserva en <strong>${booking.productName}</strong> para el día <strong>${booking.startDate}</strong>, hasta el día <strong>${booking.endingDate}</strong> ha sido cancelada.</p>
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
          setLoading(false);
        });
    }
  };

  return (
    <div className="booking--page">
      <HeaderProduct name={"Mis reservas"} />
      <div className="booking--page__container recommended">
        {bookings?.length === 0 ? (
          <h2 className="recommended--title">
            Aún no has efectuado ninguna reserva.
          </h2>
        ) : (
          <div className="booking--table recommended--cards">
            <table className="table table-striped table-hover">
              <thead className="booking--table__head table-dark">
                <tr>
                  <th scope="col">Alojamiento reservado</th>
                  <th scope="col">Hora estimada de llegada</th>
                  <th scope="col">Día de inicio de la reserva</th>
                  <th scope="col">Día de fin de la reserva</th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody className="booking--table__body">
                {bookings?.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{item?.productName}</th>
                    <td>{item?.startTime}</td>
                    <td>{item?.startDate}</td>
                    <td>{item?.endingDate}</td>
                    <td className="btns">
                      <button
                        className="btn green"
                        onClick={() => handleDelete(item)}
                      >
                        Cancelar Reserva
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
  );
};

export default MyBookingPage;
