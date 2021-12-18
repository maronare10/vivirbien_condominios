import React, { useState, useEffect } from 'react'
import useFetch from '../../server/useFecth';
import Pagination from '../layout/Pagination'
import axios from 'axios'
import { useHistory, useLocation } from "react-router-dom"

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UsersList = () => {
  const historial = useHistory()
  let cat = localStorage.getItem('condominio');
  const query = useQuery();
  const pageParam = query.get("page") || 1
  const LIMIT = 8

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const url = `http://localhost:8000/api/propietarios`
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
    historial.push(`/Users/${id}/edit`)
  }

  const handleDelete = (id) => {
    
    const confirmDelete = window.confirm('Are you sure to delete this user?')
    
    if (!confirmDelete) {
      return
    }
    
    const url = `http://localhost:8000/api/propietarios/${id}`
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }

    axios.request({method: 'DELETE', url, headers})
    .then((response) => {
      // La respuesta del server
      historial.go(0) //regresa al listado de flats
    });
  }

  return (
    <>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">USERNAME</th>
            <th scope="col">NOMBRE</th>
            <th scope="col">APELLIDO</th>
            <th scope="col">EMAIL</th>
            <th scope="col">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user, index) => (
            <tr key={index}>
              <th scope="row">{user.id}</th>
              <td>{user.username}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td className="d-flex gap-2 justify-content-center">
                <button className="btn btn-warning" onClick={() => handleEdit(user.id)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* <Pagination resource="users" pages={pageNumber} currentPage={pageParam} /> */}
    </>
  )
}

export default UsersList