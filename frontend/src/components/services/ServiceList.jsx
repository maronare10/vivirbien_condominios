import axios from '../../api/axios'
import React,{ useState, useEffect } from 'react'
import Pagination from '../layout/Pagination'

import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ServiceList = () => {
  const historial = useHistory()
  const query = useQuery();
  const pageParam = query.get("page") || 1 

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [errors, setErrors] = useState(null);
  const [pagination, setPagination] = useState({
    page_size: 10,
    pages: 0
  });
  
  useEffect(() => {
    const url = `api/servicios?page=${pageParam}`
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios.request({ method: 'GET', url, headers })
      // .then(res => setData(res.data.results))
      .then(res => {
        const { count, page_size, results } = res.data
        const pages = Math.ceil(count / page_size)
        setData(results)
        setPagination({ page_size, pages })
      })
      .catch(err => {
        setErrors(true)
        console.log("error", err)
      })
  }, [pageParam]);

  const handleEdit = (id) => {
    historial.push(`/services/${id}/edit`)
  }

  const handleDelete = (id) => {

    const confirmDelete = window.confirm('Are you sure to delete this service?')

    if (!confirmDelete) {
      return
    }

    const url = `api/servicios/${id}`
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios.request({ method: 'DELETE', url, headers })
      .then((response) => {
        // La respuesta del server
        historial.go(0) // regresa al listado de services
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">CONDOMINIO</th>
            <th scope="col">NOMBRE</th>
            <th scope="col">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((service, index) => (
            <tr key={index}>
              <th scope="row">{service.id}</th>
              <td>{service.condominio_extra.nombre}</td>
              <td>{service.nombre}</td>
              <td className="d-flex gap-2 justify-content-center">
                <button className="btn btn-warning" onClick={() => handleEdit(service.id)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(service.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination resource="services" pages={pagination.pages} currentPage={pageParam} />
    </>
  )
}

export default ServiceList