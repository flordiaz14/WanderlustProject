import { createContext, useState, useEffect } from "react";
import { helpHttp } from "../Subcomponents/helpers/helpHttp";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token] = useState(localStorage.getItem("token"));
  const [auth, setAuth ] = useState(false);
  const [user, setUser ] = useState({});

  //console.log(user);
  
  const handleAuth = (e) => {
    if (auth) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  };
  useEffect(() =>{
    if (token) {
      const url = "users";
          let options={
            headers:{
              Authorization :`Bearer ${JSON.parse(token)}`,
            },
            body:{
              token: `${JSON.parse(token)}`
              },
          };
          helpHttp()
            .post(url, options)
            .then((res) => {
              if (!res?.error ) {
                handleAuth();
                setUser(res);
              }
            });
            }
          },[token])
    
    

  const data = { auth, handleAuth, user, setUser };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;

