import React from 'react'
import IconSearch from '../../asset/icons/imag-search.svg'


const SearchUser = () => {
  return (
    <div className="contenedor-search px-5 mb-5">
      <h1 className="buildingName">Usuarios</h1>

      <form className="contenedor-form mt-0">
        <span className="iconSearch">
          <img src={IconSearch} alt="Search" />
        </span>
        <input className="inputSearch" type="search" placeholder="Busca por nombre" />
      </form>

      <a className="botonAddBuilding btn btn-primary" href="/Users/add">Add User</a>
    </div>
  )
}

export default SearchUser