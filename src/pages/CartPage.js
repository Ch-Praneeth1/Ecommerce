import React from 'react'
import Cart from '../features/cart/Cart'
import {Navbar} from '../features/nav-bar/Navbar'
import Footer from '../features/common/Footer'
const CartPage = () => {
  return (
    <div>
      <Navbar>
        
      {/* <h1 className='mx-auto text-2xl'>Cart Items</h1> */}
        <Cart></Cart>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default CartPage