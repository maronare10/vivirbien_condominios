import axios from 'axios'
import React, { useState, useEffect} from 'react'
import Pagination from '../layout/Pagination'
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const FlatsList = () => {
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
    const url = `http://localhost:8000/api/departamentos?page=${pageParam}`
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios.request({ method: 'GET', url, headers })
      .then(res => {
        const { count, page_size, results } = res.data
        const pages = Math.ceil(count / page_size)
        setData(results)
        setPagination({ page_size, pages })
      })
      .catch(err => {
        setErrors(true)
        historial.push('/flats')
      })
  }, [pageParam]);


  const handleEdit = (id) => {
    historial.push(`/flats/${id}/edit`)
  }

  const handleDelete = (id) => {
    
    const confirmDelete = window.confirm('Are you sure to delete this flat?')
    
    if (!confirmDelete) {
      return
    }
    
    const url = `http://localhost:8000/api/departamentos/${id}`
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

  return (
    <>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">NUMERO</th>
            <th scope="col">PISO</th>
            <th scope="col">EDIFICIO</th>
            <th scope="col">PROPIETARIOS</th>
            <th scope="col">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((flat, index) => (
            <tr key={index}>
              <th scope="row">{flat.id}</th>
              <td>{flat.numero}</td>
              <td>{flat.piso}</td>
              <td>{flat.edificio_extra.nombre}</td>
              <td>
                {flat.propietarios_extra.map((propietario, index) => 
                  <div key={index}>{propietario.username}</div>
                )}
                </td>
              <td className="d-flex gap-2 justify-content-center">
                <button className="btn btn-warning" onClick={() => handleEdit(flat.id)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(flat.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination resource="flats" pages={pagination.pages} currentPage={pageParam} />
    </>
  )
}

export default FlatsList