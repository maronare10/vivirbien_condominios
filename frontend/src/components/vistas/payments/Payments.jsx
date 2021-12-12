import React from 'react'
import PaymentHeader from '../../payments/PaymentHeader'
import PaymentList from '../../payments/PaymentList'

const Payments = () => {
  return (
    <div className="MainSeccion__content p-5">
      <PaymentHeader />
      
      <PaymentList />
    </div>
  )
}

export default Payments