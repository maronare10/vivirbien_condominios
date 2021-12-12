import axios from 'axios';
import React, { useState } from 'react'

import { useHistory } from "react-router-dom";
import './BuildingsAdd.scss'

const BuildingsAdd = () => {
  const historial = useHistory()

  const [name, setName] = useState("")
  const [floors, setFloors] = useState(0)
  const [flats, setFlats] = useState(0)

  function currentDate() {
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    return `${year}-${month}-${day}`
  }

  function handleSubmit(e) {
    e.preventDefault()

    const url = "http://localhost:8000/buildings"

    const data = {
      name,
      floors,
      flats,
      created_at: currentDate(),
      updated_at: currentDate()
    }

    axios
      .post(url, data)
      .then((response) => {
        // La respuesta del server
        console.log('push,,,,,')
        historial.push('/buildings')
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleName(event) {
    setName(event.target.value)

  }

  function handleFloors(event) {
    setFloors(Number(event.target.value))
  }

  function handleFlats(event) {
    setFlats(Number(event.target.value))
  }

  return (
    <div className="MainSeccion__content p-5 text-start">

      <div className="BuildingAdd">

        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Create a building</h2>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" onChange={handleName} />
          </div>
          <div className="mb-3">
            <label className="form-label">Floors</label>
            <input type="text" className="form-control" onChange={handleFloors} />
          </div>
          <div className="mb-3">
            <label className="form-label">Flats</label>
            <input type="text" className="form-control" onChange={handleFlats} />
          </div>
          <div className="mb-3">
            <input type="submit" className="form-control btn btn-primary" />
          </div>
        </form>
      </div>

    </div>
  )
}

export default BuildingsAdd
