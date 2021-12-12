import axios from "axios";
import React, { useState, useEffect } from "react";

import { useHistory, useParams } from "react-router-dom";

import useApp from "../../../server/useApp";

import "./UserEdit.scss";

const UserEdit = () => {
  let cat = localStorage.getItem("condominio");
  const historial = useHistory();

  const { buildings, users } = useApp();

  const { id } = useParams();

  const url = `http://localhost:8000/users/${id}`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get(url).then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setPassword(response.data.password);
    });
  }, []);

  function currentDate() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      condominio:cat,
      role:"propietario",
      created_at: currentDate(),
      updated_at: currentDate(),
    };

    axios
      .put(url, data)
      .then((response) => {
        // La respuesta del server
        historial.push("/Users");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleName(event) {
    setName(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePass(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="MainSeccion__content p-5 text-start">
      <div className="UserEdit">
        <form className="m-0" onSubmit={handleSubmit}>
          <h2 className="mb-5">Edit User</h2>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={handleName}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={handleEmail}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handlePass}
            />
          </div>

          <div className="mb-3">
            <input type="submit" className="form-control btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
