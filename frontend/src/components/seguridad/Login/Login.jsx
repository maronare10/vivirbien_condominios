import React, { useState } from "react";
import "./loginStyles.scss";
import building from "../../../asset/img/login-building.svg";
import { useHistory } from "react-router-dom";
import axios from '../../../api/axios';

function Login() {
  const history = useHistory();
  const url = "api/token/"

  const [datos, setDatos] = useState({
    email: "",
    pass: "",
  });

  const [error, setError] = useState(false);

  const actualizarState = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const { email, pass } = datos;

  const getInfoToken = (token) => {
    let payload = token.split('.')[1];
    let payloadDecoded = atob(payload);
    let payloadJSON = JSON.parse(payloadDecoded);
    return payloadJSON;
  }

  const autenticacion = (e) => {
    e.preventDefault()

    axios.post(url, {
      username: email,
      password: pass,
    })
      .then(res => {
        const data = res.data
        const accessToken = data.access
        const userInfo = getInfoToken(accessToken);
        localStorage.setItem('token', accessToken);
        localStorage.setItem('condominio', userInfo.condominio_nombre);
        localStorage.setItem('name', userInfo.usuario_nombre);
        localStorage.setItem('username', userInfo.username);
        localStorage.setItem('role', userInfo.role);
        return history.push("/Home")
      })
      .catch(err => {
        setError(true)
        console.log("error")
      })
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
            {error ? <p className="alerta-error">Rellenar todos los campos</p> : null}
            <div className="mb-3">
              <input
                type="text"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="email"
                onChange={actualizarState}
                value={email}
              ></input>
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="pass"
                className="form-control"
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
