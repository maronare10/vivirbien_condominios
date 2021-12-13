import React from 'react'

import iconHome from '../../asset/icons/icon-home.svg';
import iconBuilding from '../../asset/icons/icon-building.svg';
import iconFlats from '../../asset/icons/icon-flats.svg';
import iconUsers from '../../asset/icons/icon-users.svg';
// import iconRoles from '../../asset/icons/icon-roles.svg';
import iconConfig from '../../asset/icons/icon-config.svg';
import useApp from '../../server/useApp';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  let condominio = localStorage.getItem('condominio');
  const { toggleSidebar, menuSelected, setMenuSelected } = useApp()

  function activeMenuSelected (menuName) {
    console.log(menuName)
    setMenuSelected(menuName)
  }

  return (
    <div className={`Sidebar MainSidebar d-flex flex-column flex-shrink-0 p-0 text-white bg-condominio ${toggleSidebar ? 'is-closed' : ''}`}>
      <h1 className="p-4">
        <span className="LongName">Residencial {condominio}</span>
        {toggleSidebar ? <span className="ShortName">RSE</span> : ''}
      </h1>

      {/* {menuSelected} */}

      <ul className="MainSidebar-items nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link className={`nav-link ${menuSelected === 'home' && 'ActiveItem'}`} to="/Home" onClick={() => activeMenuSelected('home')}>
            <img src={iconHome} alt="icon-home"></img>
            <span>Inicio</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${menuSelected === 'buildings' && 'ActiveItem'}`} to="/buildings" onClick={() => activeMenuSelected('buildings')}>
            <img src={iconBuilding} alt="icon-home"></img>
            <span>Edificios</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${menuSelected === 'flats' && 'ActiveItem'}`} to="/flats" onClick={() => activeMenuSelected('flats')}>
            <img src={iconFlats} alt="icon-home"></img>
            <span>Departamentos</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link  className={`nav-link ${menuSelected === 'users' && 'ActiveItem'}`} to="./Users" onClick={() => activeMenuSelected('users')}>
            <img src={iconUsers} alt="icon-home"></img>
            <span>Usuarios</span>
          </Link>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={iconRoles} alt="icon-home"></img>
            <span>Roles & Perms</span>
          </a>
        </li> */}
        <li className="nav-item">
          <Link  className={`nav-link ${menuSelected === 'payments' && 'ActiveItem'}`} to="/payments" onClick={() => activeMenuSelected('payments')}>
            <img src={iconFlats} alt="icon-home"></img>
            <span>Pagos</span>
          </Link>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={iconFlats} alt="icon-home"></img>
            <span>Services</span>
          </a>
        </li> */}
      </ul>

      <div className="MainSidebar-config p-3 d-flex justify-content-between">
        <Link to="/">
          <img src={iconConfig} alt="icon-home"></img>
        </Link>
        <div className="VersionName">
          v0.2.0
        </div>
      </div>
    </div>
  )
}

export default Sidebar
