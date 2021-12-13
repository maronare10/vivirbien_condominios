import React from 'react'
import IconSearch from '../../asset/icons/imag-search.svg'
import './BuildingHeader.scss'

const Search = () => {
  return (
    <div className="contenedor-search px-5 mb-5">
      <h1 className="buildingName">Edificios</h1>

      <form className="contenedor-form mt-0" style={{ display: 'none' }}>
        <span className="iconSearch">
          <img src={IconSearch} alt="Search" />
        </span>
        <input className="inputSearch" type="search" placeholder="Busca por edificio" />
      </form>

      <a className="botonAddBuilding btn btn-primary" href="/buildings/add">Agregar edificio</a>
    </div>
  )
}

export default Search
