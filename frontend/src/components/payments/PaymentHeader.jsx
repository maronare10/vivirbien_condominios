import React from 'react'
import IconSearch from '../../asset/icons/imag-search.svg'
import './PaymentHeader.scss'

const Search = () => {
  return (
    <div className="contenedor-search px-5 mb-5">
      <h1 className="paymentName">Maintenance Payments</h1>

      <form className="contenedor-form mt-0">
        <span className="iconSearch">
          <img src={IconSearch} alt="Search" />
        </span>
        <input className="inputSearch" type="search" placeholder="Busca por flat number or user name" />
      </form>

      <a className="botonAddPayment btn btn-primary" href="/payments/add">Add a pay</a>
    </div>
  )
}

export default Search