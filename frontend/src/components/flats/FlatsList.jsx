import axios from 'axios'
import React, { useState, useEffect} from 'react'
import useFetch from '../../server/useFecth';
import Pagination from '../layout/Pagination'
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const FlatsList = () => {
  const historial = useHistory()
  const query = useQuery();
  const pageParam = query.get("page") || 1 
  const LIMIT = 8

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);
  
  useEffect(() => {
    const url = `http://localhost:8000/api/departamentos`
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios.request({ method: 'GET', url, headers })
      .then(res => setData(res.data.results))
      .catch(err => {
        setError(true)
        console.log("error", err)
      })
  }, []);


  // Consulta a la API
  // const { data: flats, total } = useFetch(
  //   `http://localhost:8000/flats?_expand=building&_expand=user&_sort=created_at,id&_order=desc,desc&_limit=${LIMIT}&_page=${pageParam}`
  // );

  // const pagesNumber = Math.ceil(total / LIMIT)

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

      {/* <Pagination resource="flats" pages={pagesNumber} currentPage={pageParam} /> */}
    </>
  )
}

export default FlatsList