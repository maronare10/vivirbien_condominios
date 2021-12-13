import axios from 'axios';
import React, { useState, useEffect } from 'react'

import { useHistory } from "react-router-dom";
import './BuildingsAdd.scss'

const BuildingsAdd = () => {
  const historial = useHistory()

  const [condominios, setCondominios] = useState([])

  const [datos, setDatos] = useState({
    nombre: "",
    departamentos: 0,
    pisos: 0,
    condominio: 0
  });

  const [errors, setErrors] = useState(null)

  const { nombre, departamentos, pisos, condominio } = datos;

  useEffect(() => {
    const url = 'http://localhost:8000/api/condominios'
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }
    const config = { method: 'GET', url, headers }

    axios.request(config)
      .then((response) => {
        console.log(response.data.results)
        setCondominios(response.data.results)
        // La respuesta del server
        // historial.push('/buildings')
      })
      .catch((error) => {
        console.log(error)
      });
  }, [])

  const actualizarState = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault()

    const url = "http://localhost:8000/api/edificios"

    const data = {
      nombre,
      departamentos: Number(departamentos),
      pisos: Number(pisos),
      condominio: Number(condominio)
    }

    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }
    const config = { method: 'POST', url, data, headers }

    axios.request(config)
      .then((response) => {
        // La respuesta del server
        historial.push('/buildings')
      })
      .catch(err => {
        console.log(err.response.data)
        setErrors(err.response.data)
      })
  }

  return (
    <div className="MainSeccion__content p-5 text-start">

      <div className="BuildingAdd">

        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Crear un edificio</h2>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="nombre" onChange={actualizarState} />
            { errors && errors.nombre && <div className="error-message">{errors.nombre}</div> }
          </div>
          <div className="mb-3">
            <label className="form-label">Departamentos</label>
            <input type="text" className="form-control" name="departamentos" onChange={actualizarState} />
            { errors && errors.departamentos && <div className="error-message">{errors.departamentos}</div> }
          </div>
          <div className="mb-3">
            <label className="form-label">Pisos</label>
            <input type="text" className="form-control" name="pisos" onChange={actualizarState} />
            { errors && errors.pisos && <div className="error-message">{errors.pisos}</div> }
          </div>
          <div className="mb-3">
            <label className="form-label">Condominio</label>
            <select className="form-select" name="condominio" value={condominio} onChange={actualizarState}>
              <option value="0">Selecciona un condominio</option>
              {condominios.map((condominio, index) =>
                <option
                value={condominio.id}
                key={index}>
                  {condominio.nombre}
                </option>
              )}
            </select>
            { errors && errors.condominio && <div className="error-message">Este campo es requerido</div> }
          </div>
          <div className="mb-3">
            <input type="submit" className="form-control btn btn-primary" />
          </div>
        </form>
      </div>

    </div>
  )
}

export default BuildingsAdd
