import React from 'react'
import Protected from '../features/auth/components/Protected'
import Order from '../features/order/Order'

const OrderDetailsPage = () => {
  return (
    <Protected>
        <Order></Order>
    </Protected>
  )
}

export default OrderDetailsPage