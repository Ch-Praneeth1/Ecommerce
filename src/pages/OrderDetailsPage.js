import React from 'react'
import Protected from '../features/auth/components/Protected'
import Order from '../features/order/Order'
import { Navbar } from '../features/nav-bar/Navbar'

const OrderDetailsPage = () => {
  return (
    <Protected>
      <Navbar>
        <h1 className='mx-auto text-2xl'>Your Orders</h1>
        <Order></Order>
      </Navbar>
    </Protected>
  )
}

export default OrderDetailsPage