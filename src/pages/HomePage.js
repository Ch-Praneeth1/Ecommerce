import React from 'react'
import { Navbar } from '../features/nav-bar/Navbar'
import ProductList from '../features/product/components/ProductList' 
import Footer from '../features/common/Footer'
export const HomePage = () => {
  return (
    <div>
        <Navbar>
            <ProductList></ProductList>
        </Navbar>
        <Footer></Footer>
    </div>
  )
}
