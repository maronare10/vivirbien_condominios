import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Context = React.createContext({})

export function AppContextProvider({ children }) {
  const [buildings, setBuildings] = useState([])
  const [users, setUsers] = useState([])
  const [flats, setFlats] = useState([])
  
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [menuSelected, setMenuSelected] = useState('home')

  useEffect(() => {
    
    axios.get("//localhost:8000/buildings").then(response => setBuildings(response.data))
    axios.get("//localhost:8000/users").then(response => setUsers(response.data))
    axios.get("//localhost:8000/flats?_expand=building&_expand=user").then(response => setFlats(response.data))

  }, [toggleSidebar])

  return <Context.Provider value={{
    buildings,
    setBuildings,
    users,
    setUsers,
    flats,
    setFlats,
    toggleSidebar,
    setToggleSidebar,
    menuSelected,
    setMenuSelected
  }}>
    {children}
  </Context.Provider>
}

export default Context