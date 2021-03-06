import axios from '../../../api/axios';
import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from "react-router-dom";

import './FlatsEdit.scss'

const FlatsEdit = () => {
  const historial = useHistory()

  const { id } = useParams()

  const [edificiosData, setEdificios] = useState([])
  const [propietariosData, setPropietarios] = useState([])

  const [datos, setDatos] = useState({
    piso: 0,
    numero: 0,
    edificio: null,
    propietarios: []
  });

  const [errors, setErrors] = useState(null)

  const { piso, numero, edificio, propietarios } = datos;
  
  const url_departamento = `api/departamentos/${id}`

  useEffect(() => {
    const url_edificios = `api/edificios?page_size=1000`
    const url_propietarios = `api/propietarios?page_size=1000`
    
    const token = localStorage.getItem('token');
    const headers = {
    'Authorization': `Bearer ${token}`}
    
    const config_edificios = { method: 'GET', url: url_edificios, headers }
    const config_propietarios = { method: 'GET', url: url_propietarios, headers } 
    const config_departamento = { method: 'GET', url: url_departamento, headers }

    axios.request(config_edificios)
      .then((response) => {
        setEdificios(response.data.results)
      })
      .catch((error) => {
        console.log(error)
      });
    
    axios.request(config_propietarios)
      .then((response) => {
        setPropietarios(response.data.results)
      })
      .catch((error) => {
        console.log(error)
      });

    axios.request(config_departamento)
      .then((response) => {
        const { piso, numero, edificio, propietarios } = response.data
        setDatos({ piso, numero, edificio, propietarios })
      })
      .catch((error) => {
        console.log(error)
      });
  }, [])

  const actualizarState = (e) => {
    let value = e.target.value
    if (e.target.multiple) {
      value = Array.from(
        e.target.selectedOptions, option => Number(option.value)
      )
    }
    setDatos({
      ...datos,
      [e.target.name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault()

    const data = {
      piso,
      numero,
      edificio,
      propietarios,
    }

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer  ${token}` }
  const config = { method: 'PUT', url: url_departamento, data,headers }

  axios.request(config)
    .then ((response) => {
      // La respuesta del server
      historial.push('/flats')
    })
    .catch((err) => {
      console.log(err.response.data)
      setErrors(err.response.data)
    });
  }

  return (
    <div className="MainSeccion__content p-5 text-start">

      <div className="FlatsEdit">

        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Editar departamento </h2>

          <div className="mb-3">
            <label className="form-label">Piso</label>
            <input type="text" className="form-control" name="piso" value={piso} onChange={actualizarState} />
            { errors && errors.piso && <div className="error-message">{errors.piso}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">N??mero</label>
            <input type="text" className="form-control" name="numero" value={numero} onChange={actualizarState} />
            { errors && errors.numero && <div className="error-message">{errors.numero}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Edificio</label>
            <select className="form-select" name="edificio" value={edificio} onChange={actualizarState}>
              <option value="0">Selecciona un edificio</option>
              {edificiosData.map((edificio, index) =>
                <option value={edificio.id} key={index}>{edificio.nombre}</option>
              )}
            </select>
            { errors && errors.edificio && <div className="error-message">{errors.edificio}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Propietarios</label>
            <select className="form-select" multiple name="propietarios" value={propietarios} onChange={actualizarState}>
              {propietariosData.map((propietario, index) =>
                <option value={propietario.id} key={index}>{propietario.username}</option>
              )}
            </select>
            <small>Mantenga presionado "Control" o "Comando" en una Mac, para seleccionar m??s de uno.</small>
            { errors && errors.propietario && <div className="error-message">{errors.propietario}</div> }
          </div>

          <div className="mb-3">
            <input type="submit" className="form-control btn btn-primary" />
          </div>

        </form>
      </div>

    </div>
  )
}

export default FlatsEdit
