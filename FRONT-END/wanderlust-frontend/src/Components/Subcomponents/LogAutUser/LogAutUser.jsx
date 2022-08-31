import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";

const LogAutUser = () => {
    const { handleAuth } = useContext(AuthContext);

    const handleClick = () => {
        localStorage.clear();
        handleAuth();
    };

    return (
        <div className="LogAutUser">
        <p>¿Deseas<span onClick={handleClick}> cerrar sesión</span> ?</p>
        </div>
    );
};
export default LogAutUser;