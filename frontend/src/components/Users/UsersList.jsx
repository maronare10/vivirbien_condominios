import React from 'react'
import useFetch from '../../server/useFecth';
import Pagination from '../layout/Pagination'
import axios from 'axios'

import { useHistory,useLocation } from "react-router-dom"

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UsersList = () => {
  const historial = useHistory()
  let cat = localStorage.getItem('condominio');
  const query = useQuery();
  const pageParam = query.get("page") || 1 
  const LIMIT = 8

  // Consulta a la API
  const { data: users, total } = useFetch(
    `http://localhost:8000/users?condominio=${cat}&_limit=${LIMIT}&_page=${pageParam}`
  );

  const pageNumber = Math.ceil(total / LIMIT)

  const handleEdit = (id) => {
    historial.push(`/Users/${id}/edit`)
  }

  const handleDelete = (id) => {
    const url = `http://localhost:8000/users/${id}`

    const confirmDelete = window.confirm('Are you sure to delete this user?')

    if (!confirmDelete) {
      return
    }

    axios
      .delete(url)
      .then((response) => {
        // La respuesta del server
        historial.go(0)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <>
      <table class="table">
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">NAME</th>
            <th scope="col">EMAIL</th>
            <th scope="col">ROLE</th>
            <th scope="col">CREATED AT</th>
            <th scope="col">UPDATED AT</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.created_at}</td>
              <td>{user.updated_at}</td>
              <td className="d-flex gap-2 justify-content-center">
                <button className="btn btn-warning" onClick={() => handleEdit(user.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination resource="users" pages={pageNumber} currentPage={pageParam} />
    </>
  )
}

export default UsersList