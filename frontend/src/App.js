import React from "react";

import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/seguridad/Login/Login.jsx'
import RegistroUsuario from './components/seguridad/registroUsuario/RegistroUsuario';
import Home from './components/vistas/home/Home';
import Buildings from './components/vistas/buildings/Buildings';
import BuildingsAdd from './components/vistas/buildings/BuildingsAdd';
import BuildingsEdit from './components/vistas/buildings/BuildingsEdit';
import Flats from './components/vistas/flats/Flats';
import FlatsAdd from './components/vistas/flats/FlatsAdd';
import Payments from './components/vistas/payments/Payments.jsx';
import PaymentsAdd from './components/vistas/payments/PaymentsAdd.jsx';
import PaymentsEdit from './components/vistas/payments/PaymentsEdit.jsx';
import FlatsEdit from './components/vistas/flats/FlatsEdit';
import Users from './components/vistas/users/Users'
import UserAdd from "./components/vistas/users/UserAdd"
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import UserEdit from "./components/vistas/users/UserEdit.jsx";

import { AppContextProvider } from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <React.Fragment>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/registrarUsuario" exact>
              <RegistroUsuario />
            </Route>

            <main className="MainContainer">
              <Sidebar />

              <section className="MainSeccion d-flex flex-column flex-grow-1 p-0">
                <Navbar />

                <Route path="/home" exact>
                  <Home />
                </Route>

                <Route path="/flats" exact>
                  <Flats />
                </Route>
                <Route path="/flats/add" exact>
                  <FlatsAdd />
                </Route>
                <Route path="/flats/:id/edit" exact>
                  <FlatsEdit />
                </Route>

                <Route path="/buildings" exact>
                  <Buildings />
                </Route>
                <Route path="/buildings/add" exact>
                  <BuildingsAdd />
                </Route>
                <Route path="/buildings/:id/edit" exact>
                  <BuildingsEdit />
                </Route>

                <Route path="/payments" exact>
                  <Payments />
                </Route>
                <Route path="/payments/add" exact>
                  <PaymentsAdd />
                </Route>
                <Route path="/payments/:id/edit" exact>
                  <PaymentsEdit />
                </Route>

                <Route path="/Users" exact>
                  <Users />
                </Route>
                <Route path="/Users/add" exact>
                  <UserAdd />
                </Route>
                <Route path="/Users/:id/edit" exact>
                  <UserEdit />
                </Route>

              </section>
            </main>
          </Switch>
        </Router>
      </React.Fragment>
    </AppContextProvider>
  );
}

export default App;
