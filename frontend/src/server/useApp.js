import { useContext } from "react";
import Context from '../context/AppContext'

function useApp() {
  const { buildings, setBuildings, users, setUsers, flats, setFlats, toggleSidebar, setToggleSidebar, menuSelected, setMenuSelected } = useContext(Context)

  return { buildings, setBuildings, users, setUsers, flats, setFlats, toggleSidebar, setToggleSidebar, menuSelected, setMenuSelected };
}

export default useApp;