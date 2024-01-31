import React from 'react'
import Cart from '../features/cart/Cart'
import {Navbar} from '../features/nav-bar/Navbar'
const CartPage = () => {
  return (
    <div>
      <Navbar>
        
      <h1 className='mx-auto text-2xl'>Cart Items</h1>
        <Cart></Cart>
      </Navbar>
    </div>
  )
}

export default CartPage