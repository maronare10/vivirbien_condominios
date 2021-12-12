import axios from 'axios'
import React from 'react'
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

  const { users, buildings } = useApp()

  // Consulta a la API
  const { data: payments, total } = useFetch(
    `http://localhost:8000/payments?_expand=flat&_sort=created_at,id&_order=desc,desc&_limit=${LIMIT}_page=${pageParam}`
  );

  const pagesNumber = Math.ceil(total / LIMIT)

  const findUser = (id) =>  {
    if (!users) {
      return ''
    }
    const resultado = users.find(user => user.id === id)
    if (resultado) {
      return resultado.name
    }
    return ''
  }
  
  const findBuilding = (id) => {
    if (!buildings) {
      return ''
    }
    const resultado = buildings.find(building => building.id === id)
    if (resultado) {
      return resultado.name
    }
    return ''
  }

  const handleEdit = (id) => {
    historial.push(`/payments/${id}/edit`)
  }

  const handleDelete = (id) => {
    const url = `http://localhost:8000/payments/${id}`

    const confirmDelete = window.confirm('Are you sure to delete this payment?')

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
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">FLAT / USER</th>
            <th scope="col">DUE DATE</th>
            <th scope="col">AMOUNT<br />TO PAY</th>
            <th scope="col">AMOUNT<br />PAID</th>
            <th scope="col">OP.<br />NUMBER</th>
            <th scope="col">STATUS</th>
            <th scope="col">CREATED AT</th>
            <th scope="col">UPDATED AT</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment, index) => (
            <tr key={index}>
              <th scope="row">{payment.id}</th>
              <td>
                {findBuilding(payment.flat.buildingId).name} {payment.flat.number}<br/>
                {`${findUser(payment.flat.userId).name}`}
              </td>
              <td>{payment.dueDate}</td>
              <td>{payment.amountToPay}</td>
              <td>{payment.amountPaid}</td>
              <td>{payment.operationNumber}</td>
              <td>
                {
                  payment.amountToPay === payment.amountPaid 
                  ? <span className="badge bg-success">Pagado</span>
                  : <span className="badge bg-danger">Pendiente</span>
                }
              </td>
              <td>{payment.created_at}</td>
              <td>{payment.updated_at}</td>
              <td className="d-flex gap-2 justify-content-center">
                <button className="btn btn-warning" onClick={() => handleEdit(payment.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(payment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination resource="payments" pages={pagesNumber} currentPage={pageParam} />
    </>
  )
}

export default PaymentList