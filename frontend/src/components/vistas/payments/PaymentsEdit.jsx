import axios from 'axios';
import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from "react-router-dom";

import useApp from "../../../server/useApp";

import './PaymentsEdit.scss'

const PaymentsEdit = () => {
  const historial = useHistory()

  const { flats } = useApp()

  const { id } = useParams()

  const url = `http://localhost:8000/payments/${id}`

  const [flatId, setFlatId] = useState(0)
  const [dueDate, setDueDate] = useState("")
  const [amountToPay, setAmountToPay] = useState(0)
  const [amountPaid, setAmountPaid] = useState(0)
  const [operationNumber, setOperationNumber] = useState("")

  useEffect(() => {

    axios
      .get(url)
      .then(response => {
        setFlatId(response.data.flatId)
        setDueDate(response.data.dueDate)
        setAmountToPay(response.data.amountToPay)
        setAmountPaid(response.data.amountPaid)
        setOperationNumber(response.data.operationNumber)
      })

  }, [url])

  function currentDate() {
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    return `${year}-${month}-${day}`
  }

  function handleSubmit(e) {
    e.preventDefault()

    const data = {
      flatId: flatId,
      dueDate,
      amountToPay,
      amountPaid,
      operationNumber,
      created_at: currentDate(),
      updated_at: currentDate()
    }

    axios
      .put(url, data)
      .then((response) => {
        // La respuesta del server
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

      <div className="PaymentsEdit">

        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Edit a payment</h2>

          <div className="mb-3">
            <label className="form-label">Flat</label>
            <select className="form-select" value={flatId} onChange={handleFlatId}>
              <option value="0">Selecciona un dpto.</option>
              {flats.map((flat, index) =>
                <option
                  value={flat.id}
                  key={index}>
                  {flat.building.name}: {flat.number}
                </option>
              )}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Due date</label>
            <input type="date" className="form-control" value={dueDate} onChange={handleDueDate} />
          </div>

          <div className="mb-3">
            <label className="form-label">Amount to pay</label>
            <input type="text" className="form-control" value={amountToPay} onChange={handleAmountToPay} />
          </div>

          <div className="mb-3">
            <label className="form-label">Amount paid</label>
            <input type="text" className="form-control" value={amountPaid} onChange={handleAmountPaid} />
          </div>

          <div className="mb-3">
            <label className="form-label">Operation number</label>
            <input type="text" className="form-control" value={operationNumber} onChange={handleOperationNumber} />
          </div>

          <div className="mb-3">
            <input type="submit" className="form-control btn btn-primary" />
          </div>

        </form>
      </div>

    </div>
  )
}

export default PaymentsEdit
