import React from 'react'
import iconUser from '../../asset/icons/icon-user.svg';
import iconBell from '../../asset/icons/icon-bell.svg';
import iconMenu from '../../asset/icons/icon-menu.svg';
import useApp from '../../server/useApp';

import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();

  const { toggleSidebar, setToggleSidebar } = useApp()

  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')

  function openCloseSidebar(e) {
    e.preventDefault()
    setToggleSidebar(!toggleSidebar)
  }

  function handleLogout(e) {
    e.preventDefault();

    localStorage.removeItem('token');
    localStorage.removeItem('condominio');
    localStorage.removeItem('name');
    localStorage.removeItem('role');

    history.push("/")
  }

  return (
    <nav className="MainSeccion__navbar navbar bg-white p-2 ">
      <div className="container-fluid">
        <div className="MainSeccion__menubuttons">
          <a className="navbar-brand" href="/" onClick={openCloseSidebar}>
            <img src={iconMenu} alt="icon-home"></img>
          </a>
        </div>
        <div className="MainSeccion__userbuttons">
          <div>Bienvenid@, {username} ({role})</div>
          <a href=" " onClick={handleLogout}>Logout</a>
          <a href=" ">
            <img src={iconBell} alt="icon-home"></img>
          </a>
          <a href=" ">
            <img src={iconUser} alt="icon-home"></img>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
