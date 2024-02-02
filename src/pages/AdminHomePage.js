import React from 'react'
import { Navbar } from '../features/nav-bar/Navbar'
import AdminProductList from '../features/admin/components/AdminProductList'

export const AdminHomePage = () => {
  return (
    <div>
        <Navbar>
            <AdminProductList></AdminProductList>
        </Navbar>
    </div>
  )
}
