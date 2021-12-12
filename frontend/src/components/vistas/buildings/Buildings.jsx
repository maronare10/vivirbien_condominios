import React from 'react'
import BuildingHeader from '../../buildings/BuildingHeader'
import BuildingList from '../../buildings/BuildingList'

const Buildings = () => {
  return (
    <div className="MainSeccion__content p-5">
      <BuildingHeader />
      
      <BuildingList />
    </div>
  )
}

export default Buildings
