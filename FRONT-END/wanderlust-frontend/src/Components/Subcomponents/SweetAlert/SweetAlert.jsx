import React from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const SweetAlert = ({msg, icon}) => {

  
  function sweetAlert() {
    Swal.fire({
        position: 'top-center',
        icon: `${icon}`,
        title:`${msg}`,
        timer: 3000,
        showConfirmButton: false,
      })
    }
  return (
    <div>{sweetAlert()}</div>
  )
}

export default SweetAlert