import axios from 'axios';
import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from "react-router-dom";

import useApp from "../../../server/useApp";

import './FlatsEdit.scss'

const FlatsEdit = () => {
  const historial = useHistory()

  const { buildings, users } = useApp()

  const { id } = useParams()

  const url = `http://localhost:8000/flats/${id}`

  const [building, setBuilding] = useState(null)
  const [user, setUser] = useState(null)
  const [floor, setFloor] = useState(0)
  const [number, setNumber] = useState(0)

  useEffect(() => {

    axios
      .get(url)
      .then(response => {
        setBuilding(response.data.buildingId)
        setUser(response.data.userId)
        setFloor(response.data.floor)
        setNumber(response.data.number)
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
      buildingId: building,
      userId: user,
      floor,
      number,
      created_at: currentDate(),
      updated_at: currentDate()
    }

    axios
      .put(url, data)
      .then((response) => {
        // La respuesta del server
        historial.push('/flats')
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleBuilding(event) {
    setBuilding(Number(event.target.value))
  }

  function handleUser(event) {
    setUser(Number(event.target.value))
  }

  function handleFloor(event) {
    setFloor(Number(event.target.value))
  }

  function handleNumber(event) {
    setNumber(Number(event.target.value))
  }

  return (
    <div className="MainSeccion__content p-5 text-start">

      <div className="FlatsEdit">

        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Edit a flat</h2>

          <div className="mb-3">
            <label className="form-label">Building</label>
            <select className="form-select" value={building} onChange={handleBuilding}>
              <option value="0">Selecciona un edificio</option>
              {buildings.map((building, index) =>
                <option
                  value={building.id}
                  key={index}>
                  {building.name}
                </option>
              )}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">User</label>
            <select className="form-select" value={user} onChange={handleUser}>
              <option value="0">Selecciona un propietario</option>
              {users.map((user, index) =>
                <option
                  value={user.id}
                  key={index}>
                  {user.name}
                </option>
              )}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Floor</label>
            <input type="text" className="form-control" value={floor} onChange={handleFloor} />
          </div>

          <div className="mb-3">
            <label className="form-label">Number</label>
            <input type="text" className="form-control" value={number} onChange={handleNumber} />
          </div>

          <div className="mb-3">
            <input type="submit" className="form-control btn btn-primary" />
          </div>

        </form>
      </div>

    </div>
  )
}

export default FlatsEdit
