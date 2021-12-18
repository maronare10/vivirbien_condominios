import axios from 'axios'
import React,{ useState, useEffect } from 'react'
import Pagination from '../layout/Pagination'

import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BuildingList = () => {
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
    const url = `http://localhost:8000/api/edificios?page=${pageParam}`
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
    historial.push(`/buildings/${id}/edit`)
  }

  const handleDelete = (id) => {

    const confirmDelete = window.confirm('Are you sure to delete this building?')

    if (!confirmDelete) {
      return
    }

    const url = `http://localhost:8000/api/edificios/${id}`
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios.request({ method: 'DELETE', url, headers })
      .then((response) => {
        // La respuesta del server
        historial.go(0) // regresa al listado de buildings
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
            <th scope="col">NOMBRE</th>
            <th scope="col">DEPARTAMENTOS</th>
            <th scope="col">PISOS</th>
            <th scope="col">CONDOMINIO</th>
            <th scope="col">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((building, index) => (
            <tr key={index}>
              <th scope="row">{building.id}</th>
              <td>{building.nombre}</td>
              <td>{building.departamentos}</td>
              <td>{building.pisos}</td>
              <td>{building.condominio_extra.nombre}</td>
              <td className="d-flex gap-2 justify-content-center">
                <button className="btn btn-warning" onClick={() => handleEdit(building.id)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(building.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination resource="buildings" pages={pagination.pages} currentPage={pageParam} />
    </>
  )
}

export default BuildingList