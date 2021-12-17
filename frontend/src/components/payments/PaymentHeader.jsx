import React from 'react'
import IconSearch from '../../asset/icons/imag-search.svg'
import './PaymentHeader.scss'

const Search = () => {
  const isAdministrador = () => localStorage.getItem('role') === 'administrador'

  return (
    <div className="contenedor-search px-5 mb-5">
      <h1 className="paymentName">Pagos</h1>

      <form className="contenedor-form mt-0" style={{ display: "none"}}>
        <span className="iconSearch">
          <img src={IconSearch} alt="Search" />
        </span>
        <input className="inputSearch" type="search" placeholder="Busca por flat number or user name" />
      </form>

      { isAdministrador() && 
        <a className="botonAddPayment btn btn-primary" href="/payments/add">Agregar pago</a>
      }
    </div>
  )
}

export default Search
