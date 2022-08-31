import React, {useContext, useEffect, useState} from 'react';
import { FaHeart } from "react-icons/fa";
import AuthContext from "../../Context/AuthContext";
import { helpHttp } from '../helpers/helpHttp';
import SweetAlert from '../SweetAlert/SweetAlert';

const Favorite = ({productId}) => {
    const [like, setLike] = useState("white");
    const [error, setError] = useState(null);
    const { auth, user, setUser } = useContext(AuthContext);

    useEffect(() => {
      const productsFavorites= user?.favorites?.map(e=>(e.id));
      productsFavorites?.map(e=> e === productId && setLike("red"))
    }, [user, productId])

    const handleClick = (e) => {
    e.preventDefault();
    const token= localStorage.getItem("token");
    if (auth) {
      like==="white"?setLike("red"):setLike("white");
      let url = "users/updatefavorite";
      let options={
        headers:{
          Authorization :`Bearer ${JSON.parse(token)}`,
        },
        body:{
          "username": user?.username,
          "product": {
          "id": productId
          }
          },
        };

      helpHttp()
        .put(url, options)
        .then((res) => {
          setUser(res)
        });
    }else{
      setError({error: "Inicia sesión para poder guardar tus favoritos."})
    };
    setTimeout(() => setError(null), 1000);
  };

  return (
    <>
    <FaHeart className="favorite" onClick={(e)=>handleClick(e)} style={{color: like }}/>
    {error?.error && <SweetAlert msg={error.error} icon={"info"} />}
    </>
  )
}

export default Favorite;