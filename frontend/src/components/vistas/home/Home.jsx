import React from 'react';
import "./homeStyle.scss";
import imageBuilding from '../../../asset/icons/imag-building.svg';
import { Link } from "react-router-dom";

function Home(props) {
  const name = localStorage.getItem('username');
  const isAdministrador = () => localStorage.getItem('role') === 'administrador'

  return (
    <div className="MainSeccion__content p-5">
      <h2 className="MainSeccion__title">Bienvenido {name}!</h2>

      <div className="MainSeccion__message alert" style={{ display: isAdministrador() ? 'none' : '' }}>
        <span>No tiene deudas pendientes</span>

        <Link className="btn bg-condominio" to={'/payments'}>
          See payments
        </Link>
      </div>

      <img src={imageBuilding} alt="icon-home"></img>

      <div className="MainSeccion__info" style={{ display: !isAdministrador() ? 'none' : '' }}>
        <div className="MainSeccion__info__item">
          <strong>Monthly income</strong>
          <div>S/ 50,000.00</div>
        </div>
        <div className="MainSeccion__info__item">
          <strong>Registered users</strong>
          <div>86</div>
        </div>
        <div className="MainSeccion__info__item">
          <strong>Total flats</strong>
          <div>365</div>
        </div>
        <div className="MainSeccion__info__item">
          <strong>To pay</strong>
          <div>8</div>
        </div>
      </div>
    </div>
  );
}

export default Home;