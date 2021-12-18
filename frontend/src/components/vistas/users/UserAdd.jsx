import axios from 'axios';
import React, { useState } from 'react'

import { useHistory } from "react-router-dom";

const UserAdd = () => {
  let cat = localStorage.getItem('condominio');

  const historial = useHistory()

  const [datos, setDatos] = useState({
    username: "",
    nombre: "",
    apellido: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState(null)

  const { username, nombre, apellido, email, password } = datos

  function handleSubmit(e) {
    e.preventDefault()

    const url = "http://localhost:8000/api/propietarios"

    const data = {
      username,
      first_name: nombre,
      last_name: apellido,
      email,
      password,
    }

    console.log(data)

    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }
    const config = { method: 'POST', url, data, headers }

    axios.request(config)
      .then((response) => {
        // La respuesta del server
        historial.push('/Users')
      })
      .catch((err) => {
        console.log(err.response.data)
        setErrors(err.response.data)
      });
  }

  const actualizarState = (e) => {
    let value = e.target.value
    setDatos({
      ...datos,
      [e.target.name]: value,
    });
  }

  return (
    <div className="MainSeccion__content p-5 text-start">

      <div className="BuildingAdd">

        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Crear un usuario</h2>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" onChange={actualizarState} />
            {errors && errors.username &&
            <div className="error-message">
            {errors.username}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="nombre" onChange={actualizarState} />
            {errors && errors.nombre &&
            <div className="error-message">
            {errors.nombre}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input type="text" className="form-control" name="apellido" onChange={actualizarState} />
            {errors && errors.apellido &&
            <div className="error-message">
            {errors.apellido}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="text" className="form-control" name="email" onChange={actualizarState} />
            {errors && errors.email &&
            <div className="error-message">
            {errors.email}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={actualizarState} />
            {errors && errors.password &&
            <div className="error-message">
            {errors.password}</div> }
          </div>

          <div className="mb-3">
            <input type="submit" className="form-control btn btn-primary" />
          </div>

        </form>
      </div>
    </div>
  )
}

export default UserAdd
