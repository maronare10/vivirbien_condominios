import React from 'react';
import cominghome from '../../../asset/img/cominghome.svg';
import  "./ruStyle.scss";
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import { useState } from 'react';


function RegistroUsuario(props) {
  const history = useHistory()
  
  const url="http://localhost:8000/users"
  const [data, setData] = useState({
    condominio:"",
    role:"admin",
    name: "",
    email:"",
    password:""
    // condominio:"",
    // role:"",
    // name: "",
    // email:"",
    // password:""
    
    
    
  })

  function currentDate() {
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    return `${year}-${month}-${day}`
  }

  function submit(e){
    e.preventDefault();
    Axios.post(url,{
        name: data.name,
        email: data.email,
        password: data.password,
        condominio: data.condominio,
        role: data.role,
        created_at: currentDate(),
        updated_at: currentDate()
        // condominio:"",
        // role:"",
        // name: "",
        // email:"",
        // password:""
       
    })
        .then(res=>{
            console.log(res.data)
            history.push('/')
        })

  }

  function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)

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
