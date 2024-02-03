import React from 'react'
import { Navbar } from '../features/nav-bar/Navbar'
import AdminOrders from '../features/admin/components/AdminOrders'

export const AdminOrdersPage = () => {
  return (
    <div>
        <Navbar>
            <AdminOrders></AdminOrders>
        </Navbar>
    </div>
  )
}
