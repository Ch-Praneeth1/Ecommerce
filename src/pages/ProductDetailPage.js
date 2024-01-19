import React from 'react'
import ProductDetail from '../features/product/components/ProductDetail'
import { Navbar } from '../features/nav-bar/Navbar'

const ProductDetailPage = () => {
  return (
    <div>
        <Navbar>
            <ProductDetail></ProductDetail>
        </Navbar>
    </div>
  )
}

export default ProductDetailPage