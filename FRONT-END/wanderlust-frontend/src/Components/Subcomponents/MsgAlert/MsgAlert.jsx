import React from "react";



export default function MsgAlert ({msg,pass}) {
    return(
        <>  
        <div id="msgError">
            <p className={`msgError--msg ${pass}`}>{msg}</p>
        </div>
        </>
    );
}