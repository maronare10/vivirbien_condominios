import React, { useState } from "react";
import "./loginStyles.scss";
import building from "../../../asset/img/login-building.svg";
import { useHistory } from "react-router-dom";
import useFetch from "../../../server/useFecth";

function Login() {
  const history = useHistory();
  const { data: users } = useFetch("http://localhost:8000/users");

  const [datos, setDatos] = useState({
    email: "",
    pass: "",
  });

  const [error, setError] = useState(false);
  //const handleClick = () => history.push('/home');
  

  const actualizarState = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const {email,pass}=datos;
  
  const autenticacion = (e) => {
    e.preventDefault()
    const info=users.find(user=>user.email===email && user.password===pass)
    
    if(info && info!=={}){
        localStorage.setItem('condominio', info.condominio);
        localStorage.setItem('name',info.name)
        return history.push("/Home")
        
    }else{
      setError(true)
      console.log("error")
    }
  }

  return (
    <div className="d-flex justify-content-center min-vh-100 align-items-center">
      <div className="row login">
        <div className="col justify-content-center asideLeft ">
          <p className="h2 text-white text-center">
            Bienvenidos al sistema de administracion de <br />
            condominios{" "}
          </p>
          <img className="img" src={building} alt="edi" />
        </div>
        <div className="col align-items-center">
          <form className="frmLogin" onSubmit={autenticacion}>
            <h2 className="fw-bold text-center  ">BIENVENIDOS</h2>
            {error?<p className="alerta-error">Rellenar todos los campos</p>:null}
            <div class="mb-3">
              <input
                type="text"
                name="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="email"
                onChange={actualizarState}
                value={email}
              ></input>
            </div>
            <div class="mb-3">
              <input
                type="password"
                name="pass"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={actualizarState}
                value={pass}
              ></input>
            </div>
            <button
              className="btn btn-login w-100"
              type="submit"
            >
              Login
            </button>
            <a
              className="crear-cuenta"
              href=" "
              onClick={() => history.push("/registrarUsuario")}
            >
              Crear cuenta
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
