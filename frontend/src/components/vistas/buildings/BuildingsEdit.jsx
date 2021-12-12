import axios from 'axios';
import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from "react-router-dom";

import './BuildingsEdit.scss'

const BuildingsEdit = () => {
  const historial = useHistory()

  const { id } = useParams()

  const url = `http://localhost:8000/buildings/${id}`

  const [name, setName] = useState("")
  const [floors, setFloors] = useState(0)
  const [flats, setFlats] = useState(0)

  useEffect(() => {

    axios
      .get(url)
      .then(response => {
        setName(response.data.name)
        setFloors(response.data.floors)
        setFlats(response.data.flats)
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
      name,
      floors,
      flats,
      created_at: currentDate(),
      updated_at: currentDate()
    }

    axios
      .put(url, data)
      .then((response) => {
        // La respuesta del server
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

      <div className="BuildingsEdit">

        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Edit a building</h2>

          <div className="mb-3">
            <label className="form-label">Name Building</label>
            <input type="text" className="form-control" value={name} onChange={handleName} />
          </div>

          <div className="mb-3">
            <label className="form-label">Floors</label>
            <input type="text" className="form-control" value={floors} onChange={handleFloors} />
          </div>

          <div className="mb-3">
            <label className="form-label">Flats</label>
            <input type="text" className="form-control" value={flats} onChange={handleFlats} />
          </div>

          <div className="mb-3">
            <input type="submit" className="form-control btn btn-primary" />
          </div>

        </form>
      </div>

    </div>
  )
}

export default BuildingsEdit
