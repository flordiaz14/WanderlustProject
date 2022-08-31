import { createContext, useEffect, useState } from "react";


const ScoreContext = createContext();

const ScoreProvider = ({ children }) => {
    const [flag, setFlag] = useState({});

    useEffect(() => {
    },[flag])

  const data = { flag, setFlag };

  return <ScoreContext.Provider value={data}>{children}</ScoreContext.Provider>;
};

export { ScoreProvider};
export default ScoreContext;
