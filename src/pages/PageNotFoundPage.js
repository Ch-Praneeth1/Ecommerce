import React from 'react'
import { Link } from 'react-router-dom'
import errorimg  from '../images/error404.png'
const PageNotFoundPage = () => {
  return (
   
    <div className='grid h-screen place-items-center bg-gray px-6 lg:px-8'>
      <div className="text-base font-medium text-gray-900">
        <img src={errorimg} alt="Empty Order" />
    </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-black-900 sm:text-5xl">Page not found</h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
    </div>
  )
}

export default PageNotFoundPage