import axios from 'axios';
import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from "react-router-dom";

import './ServicesEdit.scss'

const ServicesEdit = () => {
  const historial = useHistory()

  const { id } = useParams()

  const [condominios, setCondominios] = useState([])

  const [datos, setDatos] = useState({
    nombre: "",
    condominio: 0
  });

  const [errors, setErrors] = useState(null)

  const { nombre, condominio } = datos;

  const url_condominios = 'http://localhost:8000/api/condominios'
  const url_servicio = `http://localhost:8000/api/servicios/${id}`

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }
    const config_condominios = { method: 'GET', url: url_condominios, headers }
    const config_servicio = { method: 'GET', url: url_servicio, headers }

    axios.request(config_condominios)
      .then((response) => {
        setCondominios(response.data.results)
      })
      .catch((error) => {
        console.log(error)
      });

    axios.request(config_servicio)
      .then((response) => {
        const { nombre, condominio } = response.data
        setDatos({ nombre, condominio })
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
      condominio,
    }

    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }
    const config = { method: 'PUT', url: url_servicio, data, headers }

    axios.request(config)
      .then((response) => {
        // La respuesta del server
        historial.push('/services')
      })
      .catch((err) => {
        console.log(err.response.data)
        setErrors(err.response.data)
      });
  }

  return (
    <div className="MainSeccion__content p-5 text-start">

      <div className="ServicesEdit">

        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Editar servicio</h2>

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
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="nombre" value={nombre} onChange={actualizarState} />
            { errors && errors.nombre && <div className="error-message">{errors.nombre}</div> }
          </div>

          <div className="mb-3">
            <input type="submit" className="form-control btn btn-primary" />
          </div>

        </form>
      </div>

    </div>
  )
}

export default ServicesEdit
