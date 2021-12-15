import React from 'react'
import IconSearch from '../../asset/icons/imag-search.svg'
import './FlatsHeader.scss'

const Search = () => {
  return (
    <div className="contenedor-search px-5 mb-5">
      <h1 className="flatName">Departamentos</h1>

      <form className="contenedor-form mt-0" style={{ display: "none"}}>
        <span className="iconSearch">
          <img src={IconSearch} alt="Search" />
        </span>
        <input className="inputSearch" type="search" placeholder="Busca por number" />
      </form>

      <a className="botonAddFlat btn btn-primary" href="/flats/add">Agregar Departamento</a>
    </div>
  )
}

export default Search
