import React from 'react';
import "./homeStyle.scss";
import imageBuilding from '../../../asset/icons/imag-building.svg';

function Home(props) {
  let name = localStorage.getItem('name');
  return (
    <div className="MainSeccion__content p-5">
      <h2 className="MainSeccion__title">Welcome back {name}!</h2>

      <div className="MainSeccion__message alert">
        <span>No tiene deudas pendientes</span>
        <button className="btn bg-condominio">See payments</button>
      </div>

      <img src={imageBuilding} alt="icon-home"></img>

      <div className="MainSeccion__info">
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