import React from 'react'
import { Navbar } from '../features/nav-bar/Navbar'
import ProductList from '../features/product-list/ProductList'

export const HomePage = () => {
  return (
    <div>
        <Navbar>
            <ProductList></ProductList>
        </Navbar>
    </div>
  )
}