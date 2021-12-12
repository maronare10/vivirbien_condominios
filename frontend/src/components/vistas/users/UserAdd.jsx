import axios from 'axios';
import React, { useState } from 'react'

import { useHistory } from "react-router-dom";

const UserAdd = () => {
    let cat = localStorage.getItem('condominio');
  
    const historial = useHistory()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function currentDate() {
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    return `${year}-${month}-${day}`
  }

  function handleSubmit(e) {
    e.preventDefault()

    const url = "http://localhost:8000/users"

    const data = {
      name,
      email,
      password,
      role:"propietario",
      condominio:cat,
      created_at: currentDate(),
      updated_at: currentDate()
    }

    axios
      .post(url, data)
      .then((response) => {
        // La respuesta del server
        console.log('push,,,,,')
        historial.push('/Users')
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleName(event) {
    setName(event.target.value)

  }

  function handleEmail(event) {
    setEmail(event.target.value)
  }

  function handlePass(event) {
    setPassword(event.target.value)
  } 

  return (
    <div className="MainSeccion__content p-5 text-start">

      <div className="BuildingAdd">

        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Create a User</h2>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" onChange={handleName} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" onChange={handleEmail} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" onChange={handlePass} />
          </div>
          <div className="mb-3">
            <input type="submit" value="Create" className="form-control btn btn-primary" />
          </div>
        </form>
      </div>

    </div>
  )
}

export default UserAdd
