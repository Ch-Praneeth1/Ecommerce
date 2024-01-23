import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { clearCartAsync, deleteItemFromCartAsync, selectAllCartItems, updateCartAsync } from '../features/cart/cartSlice';
// import {
//   increment,
//   incrementAsync,
//   selectCount,
// } from './cartSlice';

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form';
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice';
import { createOrderAsync, selectCurrentPlacedOrder } from '../features/order/orderSlice';



const CheckOutPage = () => {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const items = useSelector(selectAllCartItems)
    const totalAmount = items.reduce((amount,item)=> item.price*item.quantity +amount,0)
    const totalItems = items.reduce((total,item)=> item.quantity+ total,0)
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const user = useSelector(selectLoggedInUser)
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const [selectedAddress, setSelectedAddress] = useState(null)
    const currentOrder = useSelector(selectCurrentPlacedOrder)
    
    const handleQuantity = (e,item) => {
      dispatch(updateCartAsync({...item,quantity: +e.target.value}))
    };
  
    const handleDeleteItem = (e,itemId) => {
      dispatch(deleteItemFromCartAsync(itemId))
    };

    const handleAddress = (e) => {
      // console.log(user.addresses[e.target.value])
      setSelectedAddress(user.addresses[e.target.value])
    }

    const handlePayment = (e) => {
      setPaymentMethod(e.target.value)
    }

    const handleOrder = (e) => {
      if(paymentMethod && selectedAddress){
        const order = {items,totalAmount,totalItems,paymentMethod, selectedAddress, user }
        dispatch(createOrderAsync(order));
        
        // need to redircet into order-success page   --> DONE 
      }
      else{
        alert("select your delivery address")
        //TODO: need an proper messaging popup
      }
      // redirect to order-success page --> DONE 

      dispatch(clearCartAsync(user.id))
      //TODO: clear cart after order
      //TODO: on server chnage the stock number of items
    }
    
  return (
    // <div className=''>

    <>
    {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className='lg:col-span-3 pt-12'>
                <form className='bg-white px-4 pb-5 ' noValidate onSubmit={handleSubmit((data)=>{
                  // console.log(data)
                  dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}))
                  reset();
                })}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12 py-5">
                    <h2 className=" font-semibold leading-7 text-2xl text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Full name
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            {...register("name",{required: "name is required"})}
                            id="name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>
                        <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            {...register("email",{required: "Email is required", pattern: {
                              value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                              message:"not an valid email" }})}
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                            Country
                        </label>
                        <div className="mt-2">
                            <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                            <option>India</option>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                            </select>
                        </div>
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone No
                        </label>
                        <div className="mt-2">
                        <input
                            type="tel"
                            {...register("phone",{required: "phone is required"})}
                            id="phone"
                            autoComplete="phone"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            
                        </div>
                        </div>

                        <div className="col-span-full">
                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                        Street
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            {...register("street",{required: "street is required"})}
                            id="street"
                            autoComplete="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            {...register("city",{required: "city is required"})}
                            id="city"
                            autoComplete="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                            State / Province
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            {...register("state",{required: "state is required"})}
                            id="state"
                            autoComplete="state"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900">
                            ZIP / Postal code
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            {...register("pincode",{required: "pincode is required"})}
                            id="pincode"
                            autoComplete="pincode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Reset
                    </button>
                    <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Save Address
                    </button>
                </div>

                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose form the existing address.
                    </p>
                    <ul role="list" className="divide-y divide-gray-100">
      {user.addresses.map((address,index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-2 ">
          <div className="flex min-w-0 gap-x-4 ">
          <input
                onChange={e=>handleAddress(e)}
                id="address"
                name="address"
                type="radio"
                value = {index}
                className="h-4 w-4  text-indigo-600 focus:ring-indigo-600"
            />
            <div className="min-w-0 flex-auto ">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.phoneno}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{address.city}</p>
            {address.pincode ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                {address.pincode}
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>

                    <div className="mt-10 space-y-10">
                        
                        <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Chose one method to pay.</p>
                        <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-x-3">
                            <input
                                onChange={e=>handlePayment(e)}
                                id="cash"
                                name="payments"
                                type="radio"
                                value="cash"
                                checked={paymentMethod==="cash"}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                COD
                            </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                            <input
                                onChange={e=>handlePayment(e)}
                                id="online-payment"
                                name="payments"
                                type="radio"
                                value="card"
                                checked={paymentMethod==="card"}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="online-payment" className="block text-sm font-medium leading-6 text-gray-900">
                                Online Payment
                            </label>
                            </div>
                            
                        </div>
                        </fieldset>
                    </div>
                    </div>
                </div>

                
                </form>
            </div>


                {/** cart in checkout page */}
            <div className='lg:col-span-2'>
            <div className="mx-auto mt-12 max-w-7xl mt-10 bg-white px-2 sm:px-2 lg:px-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-700">Cart Items</h1>
        <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
              <li key={item.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                      <a href={item.thubnail}>{item.title}</a>
                    </h3>
                    <p className="ml-4">${item.price}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="text-gray-500 ">
                  <label htmlFor="password" className="inline mr-4 text-sm font-medium leading-6 text-gray-900">
                  Qty
                </label>
                  <select onChange={e=>(handleQuantity(e,item))} value = {item.quantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  </div>


                  <div className="flex">
                    <button
                      type="button"
                      onClick={e=>handleDeleteItem(e,item.id)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
        <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
            
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <p className="font-thin">{totalItems}-Items</p>
            
          </div>
          
          <div className="mt-6">
            <div className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            onClick={e=>handleOrder(e)}
            >
              Order Now
            </div>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
              <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
              </Link>
            </p>
          </div>
        </div>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default CheckOutPage