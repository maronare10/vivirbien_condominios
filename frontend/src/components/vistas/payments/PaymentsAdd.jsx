import axios from 'axios';
import React, { useState, useEffect } from 'react'

import { useHistory } from "react-router-dom";

import useApp from "../../../server/useApp";

import './PaymentsAdd.scss'

const PaymentsAdd = () => {
  const historial = useHistory()

  const [ departamentosData, setDepartamentosData ] = useState([])
  const [ propietariosData, setPropietariosData ] = useState([])
  const [ serviciosData, setServiciosData ] = useState([])

  const [datos, setDatos] = useState({
    monto_a_pagar: 0,
    monto_pagado: 0,
    numero_operacion: "",
    vencimiento: "",
    voucher: "",
    departamento: null,
    pagado_por: null,
    servicio: null,
  });

  const [errors, setErrors] = useState(null)

  const {
    monto_a_pagar,
    monto_pagado,
    numero_operacion,
    vencimiento,
    voucher,
    departamento,
    pagado_por,
    servicio
  } = datos;

  useEffect(() => {
    const url_departamentos = 'http://localhost:8000/api/departamentos?page_size=1000'
    const url_propietarios = 'http://localhost:8000/api/propietarios?page_size=1000'
    const url_servicios = 'http://localhost:8000/api/servicios?page_size=1000'
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }
    const config_departamentos = { method: 'GET', url: url_departamentos, headers }
    const config_propietarios = { method: 'GET', url: url_propietarios, headers }
    const config_servicios = { method: 'GET', url: url_servicios, headers }

    axios.request(config_departamentos)
      .then((response) => {
        console.log(response.data.results)
        setDepartamentosData(response.data.results)
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
    
    axios.request(config_servicios)
      .then((response) => {
        console.log(response.data.results)
        setServiciosData(response.data.results)
      })
      .catch((error) => {
        console.log(error)
      });
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const url = "http://localhost:8000/api/pagos"

    const data = {
      monto_a_pagar: Number(monto_a_pagar),
      monto_pagado: Number(monto_pagado),
      numero_operacion,
      vencimiento: vencimiento ? vencimiento : '',
      voucher,
      departamento: departamento ? Number(departamento) : '',
      pagado_por: pagado_por ? Number(pagado_por) : '',
      servicio: servicio ? Number(servicio) : '',
    }

    const token= localStorage.getItem('token');
    const headers = {'Authorization': `Bearer ${token}`}
    const config = { method: 'POST', url, data, headers }

    axios.request(config)
      .then((response) => {
        // La respuesta del server
        historial.push('/payments')
      })
      .catch((err) => {
        console.log(err)
        setErrors(err.response.data)
      });
  }

  const actualizarState = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="MainSeccion__content p-5 text-start">

      <div className="PaymentAdd">

        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Crear pago</h2>
          <div className="mb-3">
            <label className="form-label">Fecha de vencimiento</label>
            <input type="date" className="form-control" name="vencimiento" onChange={actualizarState} />
            { errors && errors.vencimiento && <div className="error-message">{errors.vencimiento}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Departamento</label>
            <select className="form-select" name="departamento" onChange={actualizarState}>
              <option value="0">Selecciona un dpto.</option>
              {departamentosData.map((flat, index) => 
                <option value={flat.id} key={index}>
                  {flat.edificio_extra.nombre}: {flat.numero}
                </option>
              )}
            </select>
            { errors && errors.departamento && <div className="error-message">{errors.departamento}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Servicio</label>
            <select className="form-select" name="servicio" onChange={actualizarState}>
              <option value="0">Selecciona un servicio.</option>
              {serviciosData && serviciosData.map((servicio, index) => 
                <option value={servicio.id} key={index}>
                  {servicio.nombre}  
                </option>
              )}
            </select>
            { errors && errors.servicio && <div className="error-message">{errors.servicio}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Monto a pagar</label>
            <input type="text" className="form-control" name="monto_a_pagar" onChange={actualizarState} />
            { errors && errors.monto_a_pagar && <div className="error-message">{errors.monto_a_pagar}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Monto pagado</label>
            <input type="text" className="form-control" name="monto_pagado" onChange={actualizarState} />
            { errors && errors.monto_pagado && <div className="error-message">{errors.monto_pagado}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Número de operación</label>
            <input type="text" className="form-control" name="numero_operacion" onChange={actualizarState} />
            { errors && errors.numero_operacion && <div className="error-message">{errors.numero_operacion}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Pagado por</label>
            <select className="form-select" name="pagado_por" onChange={actualizarState}>
              <option value="0">Selecciona un propietario.</option>
              {propietariosData.map((propietario, index) => 
                <option value={propietario.id} key={index}>
                  {propietario.username}  
                </option>
              )}
            </select>
            { errors && errors.pagado_por && <div className="error-message">{errors.pagado_por}</div> }
          </div>

          <div className="mb-3">
            <label className="form-label">Voucher(foto)</label>
            <input
              disabled
              type="file"
              accept="image/png, image/jpeg"
              className="form-control"
              name="numero_operacion"
              onChange={actualizarState} />
            { errors && errors.voucher && <div className="error-message">{errors.voucher}</div> }
          </div>

          <div className="mb-3">
            <input type="submit" className="form-control btn btn-primary" />
          </div>
        </form>
      </div>

    </div>
  )
}

export default PaymentsAdd
