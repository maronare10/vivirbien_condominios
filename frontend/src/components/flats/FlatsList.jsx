import axios from 'axios'
import React from 'react'
import useFetch from '../../server/useFecth';
import Pagination from '../layout/Pagination'
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const FlatsList = ({ filter = '' }) => {
  const historial = useHistory()
  const query = useQuery();
  const pageParam = query.get("page") || 1 
  const LIMIT = 8

  // Consulta a la API
  const { data: flats, total } = useFetch(
    `http://localhost:8000/flats?_expand=building&_expand=user&_sort=created_at,id&_order=desc,desc&_limit=${LIMIT}&_page=${pageParam}`
  );

  const pagesNumber = Math.ceil(total / LIMIT)

  const handleEdit = (id) => {
    historial.push(`/flats/${id}/edit`)
  }

  const handleDelete = (id) => {
    const url = `http://localhost:8000/flats/${id}`

    const confirmDelete = window.confirm('Are you sure to delete this flat?')

    if (!confirmDelete) {
      return
    }

    axios
      .delete(url)
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
            <th scope="col">BUILDING</th>
            <th scope="col">USER</th>
            <th scope="col">FLOOR</th>
            <th scope="col">NUMBER</th>
            <th scope="col">CREATED AT</th>
            <th scope="col">UPDATED AT</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {flats?.map((flat, index) => (
            <tr key={index}>
              <th scope="row">{flat.id}</th>
              <td>{flat.building.name}</td>
              <td>{flat.user.name}</td>
              <td>{flat.floor}</td>
              <td>{flat.number}</td>
              <td>{flat.created_at}</td>
              <td>{flat.updated_at}</td>

              <td className="d-flex gap-2 justify-content-center">
                <button className="btn btn-warning" onClick={() => handleEdit(flat.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(flat.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination resource="flats" pages={pagesNumber} currentPage={pageParam} />
    </>
  )
}

export default FlatsList