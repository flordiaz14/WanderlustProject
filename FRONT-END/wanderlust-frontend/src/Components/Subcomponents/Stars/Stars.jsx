import React, {useState, useEffect, useContext} from "react";
import { FaStar} from "react-icons/fa";
import { helpHttp } from "../helpers/helpHttp";
import AuthContext from "../../Context/AuthContext";
import SweetAlert from "../SweetAlert/SweetAlert"
import ScoreContext from "../../ScoreContext/ScoreContext";

const Stars = ({scores, productId}) => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [score, setScore] =  useState(0);
  const { auth } = useContext(AuthContext);
  const { setFlag } = useContext(ScoreContext);

  useEffect(() => {
    if (scores?.length=== undefined) {
      setScore(0)
    }else if(scores?.length === 0){
      setScore(0)
    }else{
      setScore(Math.round(scores?.map(e=> e.rate).reduce((a,v)=>(a+v),0) / scores?.length));
    }
    if (response!==null) {
      setScore(response)
      setFlag({id: productId,rate:response})
    }
  }, [scores, score,response, setScore, setFlag, productId])

  const handleClick = (e,type, amount) => {
    e.preventDefault();
    const token= localStorage.getItem("token");
    if (auth) {
      let points=0;
      if (type === "score") {
        points=amount + 1;
        setMessage({text:"Gracias por tu puntuación!!!"})
      }else{
        points=amount + 1 + score;
        setMessage({text:"Gracias por tu puntuación!!!"})
      }
  
      let url = "product/rate";
      let options={
        headers:{
          Authorization :`Bearer ${JSON.parse(token)}`,
        },
        body:{
          "idProduct": productId,
          "rateDto": [
            {
              "rate": points
            }
          ]
          },
        };
      setLoading(true);
      helpHttp()
        .put(url, options)
        .then((res) => {
          if (res?.rates[0].rate) {
            setResponse(Math.round((score + res?.rates[0].rate )/2))
            setError(null);
          } else {
            setResponse(null)
          }
          setLoading(false);
        });
    }else{
      setError({error: "Inicia sesión para poder calificar productos."})
    };
    setTimeout(() => setMessage(null), 1000);
    setTimeout(() => setError(null), 1000);
  }

  const rest= 5 - score;

  return (
    <div className="cardProduct--category__star">
      {score > 0 && 
      Array(score).fill().map((_,i)=>( 
          <FaStar key={i} className="card--star" onClick={(e)=>handleClick(e,"score",i)}/>
      ))}
      {rest > 0 && 
      Array(rest).fill().map((_,i)=>( 
          <FaStar key={i} className="card--star" style={{color: "gray" }} onClick={(e)=>handleClick(e,"rest",i)}/>    
      ))}
      {error?.error && <SweetAlert msg={error.error} icon={"info"} />}
      {message?.text && <SweetAlert msg={message.text} icon={"success"} />}
    </div> 
  );
};

export default Stars;
