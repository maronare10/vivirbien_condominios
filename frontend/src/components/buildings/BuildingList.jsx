import axios from 'axios'
import React,{ useState, useEffect } from 'react'
import useFetch from '../../server/useFecth';
import Pagination from '../layout/Pagination'

import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BuidingList = () => {
  const historial = useHistory()
  const query = useQuery();
  const pageParam = query.get("page") || 1 
  const LIMIT = 8

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);
  
  useEffect(() => {
    const url = `http://localhost:8000/api/edificios`
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios.request({ method: 'GET', url, headers })
      .then(res => setData(res.data.results))
      .catch(err => {
        setError(true)
        console.log("error", err)
      })
  }, []);

  // const { data: buildings, total } = useFetch(
  //   `http://localhost:8000/buildings?_sort=created_at,id&_order=desc,desc&_limit=${LIMIT}_page=${pageParam}`
  // );

  // const pagesNumber = Math.ceil(total / LIMIT)

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

      {/* <Pagination resource="buildings" pages={pagesNumber} currentPage={pageParam} /> */}
    </>
  )
}

export default BuidingList