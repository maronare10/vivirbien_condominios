import axios from 'axios';
import React, { useState, useEffect } from 'react'

import { useHistory } from "react-router-dom";

import './FlatsAdd.scss'

const FlatsAdd = () => {
  const historial = useHistory()
  
  const [ edificiosData, setEdificiosData ] = useState([])
  const [ propietariosData, setPropietariosData ] = useState([])

  const [datos, setDatos] = useState({
    numero: 0,
    piso: 0,
    edificio: null,
    propietarios: []
  });

  const [errors, setErrors] = useState(null)

  const { numero, piso, edificio, propietarios } = datos;

  useEffect(() => {
    const url_edificios = 'http://localhost:8000/api/edificios'
    const url_propietarios = 'http://localhost:8000/api/propietarios'
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }
    const config_edificios = { method: 'GET', url: url_edificios, headers }
    const config_propietarios = { method: 'GET', url: url_propietarios, headers }

    axios.request(config_edificios)
      .then((response) => {
        console.log(response.data.results)
        setEdificiosData(response.data.results)
      })
      .catch((error) => {
        console.log(error)
      });
    
    axios.request(config_propietarios)
      .then((response) => {
        console.log(response.data.results)
        setPropietariosData(response.data.results)
      })
      .catch((error) => {
        console.log(error)
      });
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const url = "http://localhost:8000/api/departamentos"

    console.log(datos)

    const data = {
      edificio: Number(edificio) ,
      propietarios,
      piso: Number(piso),
      numero: Number(numero),
    }

    const token= localStorage.getItem('token');
    const headers = {'Authorization': `Bearer ${token}`}
    const config = { method: 'POST', url, data, headers }

    axios.request(config)
      .then((response) => {
        // La respuesta del server
        historial.push('/flats')
      })
      .catch((err) => {
        console.log(err.response.data)
        setErrors(err.response.data)
      });
  }
  
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

  return (
    <div className="MainSeccion__content p-5 text-start">

      <div className="FlatsAdd">

        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Crear un departamento</h2>

          <div className="mb-3">
            <label className="form-label">Piso</label>
            <input type="text" className="form-control" name="piso" onChange={actualizarState} />
            { errors && errors.piso && <div className="error-message">{errors.piso}</div> }
          </div>
          
          <div className="mb-3">
            <label className="form-label">Número</label>
            <input type="text" className="form-control" name="numero" onChange={actualizarState} />
            { errors && errors.numero && <div className="error-message">{errors.numero}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Edificio</label>
            <select className="form-select" name="edificio" onChange={actualizarState}>
              <option value="0">Selecciona un edificio</option>
              {edificiosData && edificiosData.map((edificio, index) => 
                <option value={edificio.id} key={index}>{edificio.nombre}</option>
              )}
            </select>
            { errors && errors.edificio && <div className="error-message">{errors.edificio}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Propietarios</label>
            <select className="form-select" multiple name="propietarios" onChange={actualizarState}>
              {propietariosData && propietariosData.map((propietario, index) => 
                <option value={propietario.id} key={index}>{propietario.username}</option>
              )}
            </select>
            <small>Mantenga presionado "Control" o "Comando" en una Mac, para seleccionar más de uno.</small>
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

export default FlatsAdd
