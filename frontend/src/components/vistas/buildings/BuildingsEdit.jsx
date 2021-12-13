import axios from 'axios';
import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from "react-router-dom";

import './BuildingsEdit.scss'

const BuildingsEdit = () => {
  const historial = useHistory()

  const { id } = useParams()

  const [condominios, setCondominios] = useState([])

  const [datos, setDatos] = useState({
    nombre: "",
    departamentos: 0,
    pisos: 0,
    condominio: 0
  });

  const [errors, setErrors] = useState(null)

  const { nombre, departamentos, pisos, condominio } = datos;

  const url_condominios = 'http://localhost:8000/api/condominios'
  const url_edificio = `http://localhost:8000/api/edificios/${id}`

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }
    const config_condominios = { method: 'GET', url: url_condominios, headers }
    const config_edificio = { method: 'GET', url: url_edificio, headers }

    axios.request(config_condominios)
      .then((response) => {
        setCondominios(response.data.results)
      })
      .catch((error) => {
        console.log(error)
      });

    axios.request(config_edificio)
      .then((response) => {
        const { nombre, departamentos, pisos, condominio } = response.data
        setDatos({ nombre, departamentos, pisos, condominio })
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

    const data = {
      nombre,
      departamentos,
      pisos,
      condominio,
    }

    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }
    const config = { method: 'PUT', url: url_edificio, data, headers }

    axios.request(config)
      .then((response) => {
        // La respuesta del server
        historial.push('/buildings')
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <div className="MainSeccion__content p-5 text-start">

      <div className="BuildingsEdit">

        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Editar edificio</h2>

          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="nombre" value={nombre} onChange={actualizarState} />
            { errors && errors.nombre && <div className="error-message">{errors.nombre}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Departamentos</label>
            <input type="text" className="form-control" name="departamentos" value={departamentos} onChange={actualizarState} />
            { errors && errors.departamentos && <div className="error-message">{errors.departamentos}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Pisos</label>
            <input type="text" className="form-control" name="pisos" value={pisos} onChange={actualizarState} />
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

export default BuildingsEdit
