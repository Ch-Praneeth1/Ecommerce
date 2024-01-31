import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../auth/authSlice'


const UserProfile = () => {
  const user = useSelector(selectLoggedInUser)

  const handleEdit = (e, addressId) => {

  }

  const handelRemove = (e, addressId) => {

  }
   
  return (
    <div>
      <div className='mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
          <h1 className='text-4xl my-5 font-bold tracking-tight text-gray-900'>
            Name: {user.name ? user.name: "New User"}
          </h1>
          <h3 className='text-xl my-5 font-bold tracking-tight text-red-900'>
            email address: {user.email}
          </h3>
        </div>
        <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
          <p className='mt-0.5 text-sm text-gray-500'>Your Addresses :</p>
          {user.addresses.map((address,index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-2 ">
          <div className="flex min-w-0 gap-x-4 ">
          
            <div className="min-w-0 flex-auto ">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.phoneno}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{address.city}</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">{address.pincode}</p>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" 
                  onClick={(e) => handleEdit(e, address.id)}>
                      Edit Address
            </button>
            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={(e) => handelRemove(e, address.id)}> 
                      Remove 
            </button>
          </div>
        </li>
        
      ))}
        </div>
      </div>
    </div>
  )
}

export default UserProfile