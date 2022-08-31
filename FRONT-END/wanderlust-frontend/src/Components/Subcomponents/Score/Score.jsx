import React, {useState, useEffect, useContext} from "react";
import ScoreContext from "../../ScoreContext/ScoreContext";

const Score = ({classContainer, classContent, scores, productId}) => {
  const [assessment, setAssessment] = useState("");
  const [score, setScore] = useState(0);
  const { flag } = useContext(ScoreContext);

  useEffect(() => {
    if (scores?.length === undefined) {
      setScore(0)
    }else if(scores?.length === 0){
      setScore(0)
    }else{
      setScore(Math.round(scores?.map(e=> e.rate).reduce((a,v)=>(a+v),0) / scores?.length)*2);
    }
    if (flag?.id === productId) {
      if (!isNaN(flag?.rate*2)) {
        setScore(flag?.rate*2)        
      }
    }
    if (score === 0) {
      setAssessment("Sin Valorar");
    }
    if (score >= 1 && score <= 5) {
      setAssessment("Bueno");
    }
    if (score >= 6 && score <= 8) {
      setAssessment("Muy bueno");
    }
    if (score >= 9 && score <= 10){
      setAssessment("Excelente");
    }
  }, [scores, score, flag, productId])

  
  return (
    <div className={classContainer}>
      <div className={classContent}>
        <h2>{score}</h2>
      </div>
      <h4>{assessment}</h4>
    </div>
  );
};

export default Score;
