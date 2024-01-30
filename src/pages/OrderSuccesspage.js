import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

const OrderSuccesspage = () => {
  const {id} = useParams()
  return (
    <>
    {!id && <Navigate to='/' replace={true}></Navigate>}
    <div>
        <div className='grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-green-500 sm:text-5xl">Order Placed Successfully #{id}</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Your purchase has been successfully placed, Will be shipped soon.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default OrderSuccesspage