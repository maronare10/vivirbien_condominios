import axios from 'axios'
import React from 'react'
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

  // Consulta a la API
  const { data: buildings, total } = useFetch(
    `http://localhost:8000/buildings?_sort=created_at,id&_order=desc,desc&_limit=${LIMIT}_page=${pageParam}`
  );

  const pagesNumber = Math.ceil(total / LIMIT)

  const handleEdit = (id) => {
    historial.push(`/buildings/${id}/edit`)
  }

  const handleDelete = (id) => {
    const url = `http://localhost:8000/buildings/${id}`

    const confirmDelete = window.confirm('Are you sure to delete this building?')

    if (!confirmDelete) {
      return
    }

    axios
      .delete(url)
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
            <th scope="col">NAME</th>
            <th scope="col">FLOORS</th>
            <th scope="col">FLATS</th>
            <th scope="col">CREATED AT</th>
            <th scope="col">UPDATED AT</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {buildings?.map((building, index) => (
            <tr key={index}>
              <th scope="row">{building.id}</th>
              <td>{building.name}</td>
              <td>{building.floors}</td>
              <td>{building.flats}</td>
              <td>{building.created_at}</td>
              <td>{building.updated_at}</td>
              <td className="d-flex gap-2 justify-content-center">
                <button className="btn btn-warning" onClick={() => handleEdit(building.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(building.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination resource="buildings" pages={pagesNumber} currentPage={pageParam} />
    </>
  )
}

export default BuidingList