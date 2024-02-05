import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import orderSuccess from '../images/orderSuccess.webp'

const OrderSuccesspage = () => {
  const {id} = useParams()
  return (
    <>
    {!id && <Navigate to='/' replace={true}></Navigate>}
    <div className='sm:px-4 md:px-6 lg:px-8 flex items-center justify-end'>
    <div className="text-base font-medium text-gray-900">
        <img src={orderSuccess} alt="Empty Order" />
    </div>
    <div className='grid h-screen place-items-center bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-10'>
        <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-green-500">Order Placed Successfully #{id}</h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-7 text-gray-600">Your purchase has been successfully placed and will be shipped soon.</p>
            <div className="flex items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10 mt-4 sm:mt-6 md:mt-8 lg:mt-10">
                <Link
                    to="/"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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