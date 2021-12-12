import React from 'react'

import UsersList from '../../Users/UsersList'
import SearchUser from '../../Users/SearchUser'

const Users = () => {
  return (
        <div className="MainSeccion__content p-5">
          <SearchUser />
          
          <UsersList />
        </div>
     
    
  )
}

export default Users;