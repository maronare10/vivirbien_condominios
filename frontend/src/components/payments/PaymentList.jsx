import axios from 'axios'
import React, { useState, useEffect } from 'react'
import useFetch from '../../server/useFecth';
import Pagination from '../layout/Pagination'
import { useHistory, useLocation } from "react-router-dom";
import useApp from "../../server/useApp";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PaymentList = () => {
  const historial = useHistory()
  const query = useQuery();
  const pageParam = query.get("page") || 1 
  const LIMIT = 8

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `http://localhost:8000/api/pagos`
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios.request({ method: 'GET', url, headers })
      .then(res => setData(res.data.results))
      .catch(err => {
        setError(true)
        console.log("error", err)
      })
  }, []);

  const handleEdit = (id) => {
    historial.push(`/payments/${id}/edit`)
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure to delete this payment?')

    if (!confirmDelete) {
      return
    }

    const url = `http://localhost:8000/api/pagos/${id}`
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios.request({method: 'DELETE', url, headers})
      .then((response) => {
        // La respuesta del server
        historial.go(0) // regresa al listado de flats
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const formatDate = (dateStr) => new Intl.DateTimeFormat('es-PE').format(new Date(dateStr))

  const isAdministrador = () => localStorage.getItem('role') === 'administrador'

  return (
    <>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">DPTO.<br />USUARIO</th>
            <th scope="col">VENCIMIENTO</th>
            <th scope="col">MONTO<br />A PAGAR</th>
            <th scope="col">MONTO<br />PAGADO</th>
            <th scope="col">ESTADO</th>
            <th scope="col">FECHA<br />ACTUALIZACION</th>
            {isAdministrador() && <th scope="col">ACCIONES</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((payment, index) => (
            <tr key={index}>
              <th scope="row">{payment.id}</th>
              <td>
                <strong>
                  {payment.departamento_extra.edificio} {payment.departamento_extra.numero}
                </strong><br/>
                {payment.departamento_extra.propietarios && 
                  payment.departamento_extra.propietarios.map(
                    propietario => <div key={index}>{propietario.username}</div>
                  )
                }
              </td>
              <td>{formatDate(payment.vencimiento)}</td>
              <td>{payment.monto_a_pagar || '0.00'}</td>
              <td>{payment.monto_pagado || '0.00'}</td>
              <td>
                {
                  payment.monto_a_pagar === payment.monto_pagado 
                  ? <span className="badge bg-success">Pagado</span>
                  : <span className="badge bg-danger">Pendiente</span>
                }
              </td>
              <td>{formatDate(payment.fecha_actualizacion)}</td>
              { isAdministrador() && 
                <td className="d-flex gap-2 justify-content-center">
                  <button className="btn btn-warning" onClick={() => handleEdit(payment.id)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(payment.id)}>Delete</button>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>

      {/* <Pagination resource="payments" pages={pagesNumber} currentPage={pageParam} /> */}
    </>
  )
}

export default PaymentList