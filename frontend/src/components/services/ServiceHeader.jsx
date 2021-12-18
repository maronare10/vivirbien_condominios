import React from 'react'
import IconSearch from '../../asset/icons/imag-search.svg'
import './ServiceHeader.scss'

const Search = () => {
  return (
    <div className="contenedor-search px-5 mb-5">
      <h1 className="serviceName">Servicios</h1>

      <form className="contenedor-form mt-0" style={{ display: 'none' }}>
        <span className="iconSearch">
          <img src={IconSearch} alt="Search" />
        </span>
        <input className="inputSearch" type="search" placeholder="Busca por edificio" />
      </form>

      <a className="botonAddService btn btn-primary" href="/services/add">Agregar servicio</a>
    </div>
  )
}

export default Search
