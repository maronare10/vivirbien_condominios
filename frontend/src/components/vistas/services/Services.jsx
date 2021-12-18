import React from 'react'
import ServiceHeader from '../../services/ServiceHeader'
import ServiceList from '../../services/ServiceList'

const Services = () => {
  return (
    <div className="MainSeccion__content p-5">
      <ServiceHeader />
      
      <ServiceList />
    </div>
  )
}

export default Services
