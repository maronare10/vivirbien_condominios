import React from 'react';
import cominghome from '../../../asset/img/cominghome.svg';
import  "./ruStyle.scss";
import { useHistory } from "react-router-dom";
import axios from '../../../api/axios';
import { useState } from 'react';


function RegistroUsuario(props) {
  const history = useHistory()
  
  const url="api/registrar_condominio"

  const [data, setData] = useState({
    condominio:"",
    role:"admin",
    name: "",
    email:"",
    password:""
  })
  const [errors, setErrors] = useState(null)

  function submit(e){
    e.preventDefault();

    const data2 = {
      first_name: data.name,
      last_name: data.name,
      username: data.email,
      email: data.email,
      password: data.password,
      password_confirmation: data.password,
      condominio_nombre: data.condominio,
  }

    axios.post(url, data2)
    .then(res=>{
        console.log(res.data)
        history.push('/')
    })
    .catch(err => {
      console.log(err.response.data)
      setErrors(err.response.data)
    })
  }

  function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
  }

  return (
    <div className="main-contenedor">
        <div className="contenedor1">
      <h2>Crea tu Cuenta</h2>
      <form className="form-register" onSubmit={(e)=>submit(e)}>
        <div>
          <input 
            onChange={(e)=>handle(e)} 
            id="condominio" 
            value={data.condominio} 
            type="text" 
            placeholder="Nombre del condominio"
            className ="controls"
          
          />
          { errors && errors.condominio_nombre && <div className="error-message">{errors.condominio_nombre}</div> }
        </div>
        <div>
          <input 
            onChange={(e)=>handle(e)} 
            id="name" 
            value={data.name} 
            type="text"
            placeholder="Nombre completo"
            className="controls"
          />
          { errors && errors.first_name && <div className="error-message">{errors.first_name}</div> }
        </div>
        
        <div>
          <input 
            onChange={(e)=>handle(e)} 
            id="email" 
            value={data.email} 
            type="email" 
            placeholder="Email"
            className ="controls"
          
          />
          { errors && errors.email && <div className="error-message">{errors.email}</div> }
        </div>

        <div>
          <input 
            onChange={(e)=>handle(e)} 
            id="password" 
            value={data.password} 
            type="password" 
            placeholder="Password"
            className ="controls"
          
          />
          { errors && errors.password && <div className="error-message">{errors.password}</div> }
        </div>
        <div className="text-center">
        <button  className="controls-btn">
            Registrar
          </button>
          
        </div>
      </form>
    </div>
    <div className="contenedor2" >
      <h2>Bienvenido al Sistema de administracion de condominios</h2> 
      <img src={cominghome} alt="edi" />
    </div> 
    </div>
  );
}

export default RegistroUsuario;
