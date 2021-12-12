import axios from 'axios';
import React, { useState } from 'react'

import { useHistory } from "react-router-dom";

import useApp from "../../../server/useApp";

import './PaymentsAdd.scss'

const PaymentsAdd = () => {
  const historial = useHistory()

  const { flats } = useApp()

  const [flatId, setFlatId] = useState(0)
  const [dueDate, setDueDate] = useState("")
  const [amountToPay, setAmountToPay] = useState(0)
  const [amountPaid, setAmountPaid] = useState(0)
  const [operationNumber, setOperationNumber] = useState("")

  function currentDate() {
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    return `${year}-${month}-${day}`
  }

  function handleSubmit(e) {
    e.preventDefault()

    const url = "http://localhost:8000/payments"

    const data = {
      flatId,
      dueDate,
      amountToPay,
      amountPaid,
      operationNumber,
      created_at: currentDate(),
      updated_at: currentDate()
    }

    axios
      .post(url, data)
      .then((response) => {
        // La respuesta del server
        console.log('push,,,,,')
        historial.push('/payments')
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleFlatId(event) {
    setFlatId(Number(event.target.value))
  }

  function handleDueDate(event) {
    setDueDate(event.target.value)
  }

  function handleAmountToPay(event) {
    setAmountToPay(Number(event.target.value))
  }

  function handleAmountPaid(event) {
    setAmountPaid(Number(event.target.value))
  }
  
  function handleOperationNumber(event) {
    setOperationNumber(event.target.value)
  }

  return (
    <div className="MainSeccion__content p-5 text-start">

      <div className="PaymentAdd">

        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Create a payment</h2>
          <div className="mb-3">
            <label className="form-label">Flat</label>
            <select className="form-select" onChange={handleFlatId}>
              <option value="0">Selecciona un dpto.</option>
              {flats.map((flat, index) => 
                <option value={flat.id} key={index}>{flat.building.name}: {flat.number}</option>
              )}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Due date</label>
            <input type="date" className="form-control" onChange={handleDueDate} />
          </div>
          <div className="mb-3">
            <label className="form-label">Amount to pay</label>
            <input type="text" className="form-control" onChange={handleAmountToPay} />
          </div>
          <div className="mb-3">
            <label className="form-label">Amount paid</label>
            <input type="text" className="form-control" onChange={handleAmountPaid} />
          </div>
          <div className="mb-3">
            <label className="form-label">Operation number</label>
            <input type="text" className="form-control" onChange={handleOperationNumber} />
          </div>
          <div className="mb-3">
            <input type="submit" className="form-control btn btn-primary" />
          </div>
        </form>
      </div>

    </div>
  )
}

export default PaymentsAdd
