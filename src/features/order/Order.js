import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrderByUserIdAsync, selectAllOrdersByUserId } from "./orderSlice";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { selectUserInfo } from "../user/userSlice";

export default function Order() {
  const user = useSelector(selectUserInfo)
  const dispatch = useDispatch()
  const orders = useSelector(selectAllOrdersByUserId)
  console.log(orders)
  useEffect(() => {
    dispatch(fetchAllOrderByUserIdAsync(user.id))
  },[dispatch,user])

  return (
    <>
    {!orders && <Navigate to="/" replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl mt-10 bg-white px-4 sm:px-6 lg:px-8">
        <div className=" px-4 py-6 sm:px-6">
          <div className="flow-root ">
            <ul role="list" className="-my-6 ">
              {orders.map((order,index) => (
                <>
                {order.items.map((item,innerIndex) => (
                  
              
              <li key={innerIndex} className="flex py-6 divide-y divide-green-400">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md ">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href={item.thumbnail}>{item.title}</a>
                    </h3>
                    <div className="block">
                    <p className="ml-4">No of items-{item.quantity}</p>
                    <p className="ml-4 align-bottom text-red-600">{order.deliveryStatus}</p>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            </li>
          
                ))}

              <div className=' px-4 py-6 sm:px-6'>
                  <p className='mt-0.5 text-sm text-gray-500'>Delivery Address :</p>
                <li key={index} className="flex justify-between gap-x-6 py-5 px-5  ">
                  <div className="flex min-w-0 gap-x-4 ">
                  
                    <div className="min-w-0 flex-auto ">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{order.selectedAddress.name}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.street}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.phoneno}</p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">Phone No: {order.selectedAddress.phone}</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">{order.selectedAddress.pincode}</p>
              </div>
          
        </li>
       
        </div>
                </>
              ))}
        </ul>
      </div>
    </div>
        <div className="0 px-4 py-6 sm:px-6">
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            {/* <p>${totalAmount}</p> */}
            
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p className="mt-0.5 text-sm text-gray-500">Your order will be shipped to the specified address very soon..</p>
          {/* <p className="font-thin">{totalItems}-Items</p> */}
            
          </div>
          
          <div className="mt-6">
            <div className="flex items-center cursor-pointer justify-center rounded-md  bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            
            >
              Thank's For Shopping With Us
            </div>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            
            <p>
              {' '}

              <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
    
  );
}
