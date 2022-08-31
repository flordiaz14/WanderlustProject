import React, { useContext, useEffect, useState } from 'react'
import HeaderProduct from '../../HeaderProduct/HeaderProduct';
import AuthContext from "../../Context/AuthContext";
import CardProduct from '../../Subcomponents/Card_Product/CardProduct';

const FavoritesPage = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (user?.favorites) {
      setFavorites(user?.favorites)
    }
  }, [user])
  

  return (
    <div className='products--favorite__page'>
        <HeaderProduct name={"Mis favoritos"}/>
        {favorites?.length===0 ? <h2 className="recommended--title">Aún no has agregado ningún favorito.</h2>:
        <div className="recommended--cards">
        {favorites?.map((e, i) => (
          i < 4 && <CardProduct key={e.id} data={e} />
        ))}
        </div>}
    </div>
  )
}

export default FavoritesPage;