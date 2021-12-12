import React from 'react'
import iconUser from '../../asset/icons/icon-user.svg';
import iconBell from '../../asset/icons/icon-bell.svg';
import iconMenu from '../../asset/icons/icon-menu.svg';
import useApp from '../../server/useApp';

const Navbar = () => {
  const { toggleSidebar, setToggleSidebar } = useApp()

  function openCloseSidebar(e) {
    e.preventDefault()
    setToggleSidebar(!toggleSidebar)
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
        <a href="/">
            Logout
          </a>
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
