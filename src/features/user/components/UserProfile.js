import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo, updateUserAsync } from '../userSlice'
import { useForm } from 'react-hook-form'


const UserProfile = () => {
  const user = useSelector(selectUserInfo)
  const dispatch = useDispatch() 
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm();

  // TODO: Need to add payment section when we work on backend

  const handleEdit = (addressUpdate,index) => {
    const newUser = {...user,addresses:[...user.addresses]};
    newUser.addresses.splice(index,1,addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
    
  }

  const handelRemove = (e, index) => {
    const newUser = {...user,addresses:[...user.addresses]};
    newUser.addresses.splice(index,1);
    dispatch(updateUserAsync(newUser));
  }

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue('name',address.name);
    setValue('street',address.street);
    setValue('phone',address.phone);
    setValue('city',address.city);
    setValue('email',address.email);
    setValue('pincode',address.pincode);
    setValue('state',address.state);
  }

  const handleAdd = (address) => {
    const newUser = {...user,addresses:[...user.addresses, address]};
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false)
  }
   
  return (
    <div>
      <div className='mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
          <h1 className='text-4xl my-5 font-bold tracking-tight text-gray-900'>
            {user.name ? user.name: "New User"}
          </h1>
          <h3 className='text-xl my-5 font-bold tracking-tight text-red-900'>
            email address: {user.email}
          </h3>                                                                                            
          {user.role==="admin" && <h3 className='text-xl my-5 font-bold tracking-tight text-red-900'>   {/* just for testing purpose  */}
            role: {user.role}
          </h3>}
         
        </div>
        <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
        <button
            onClick={e => {setShowAddAddressForm(true); setSelectedEditIndex(-1)}}
            type="submit"
            className="rounded-md bg-green-600 px-3 my-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Add New Address
        </button>

          { showAddAddressForm ? <form className='bg-white px-4 pb-5 ' noValidate onSubmit={handleSubmit((data)=>{
                  // console.log(data)
                  handleAdd(data);
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
                    <div className="mt-6 flex items-center justify-end gap-x-2">
                    
                    <button
                    type="submit"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Add Address
                    </button>
                </div>

                </div>

                
                </form> : null}
          <p className='mt-4 text-sm text-gray-500'>Your Addresses :</p>
          {user.address && user.addresses.map((address,index) => (
            <div>
              { selectedEditIndex === index ? <form className='bg-white px-4 pb-5 ' noValidate onSubmit={handleSubmit((data)=>{
                  // console.log(data)
                  handleEdit(data,index);
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
                    <div className="mt-6 flex items-center justify-end gap-x-2">
                    <button
                    onClick={e=>setSelectedEditIndex(-1)}
                    type="submit"
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Cancle
                    </button>
                    <button
                    type="submit"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Save Edited Address
                    </button>
                </div>

                </div>

                
                </form> : null}
        <li key={index} className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-2 ">
          <div className="flex min-w-0 gap-x-4 ">
          
            <div className="min-w-0 flex-auto ">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.phone}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{address.city}</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">{address.pincode}</p>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" 
                  onClick={(e) => handleEditForm(index)}>
                      Edit Address
            </button>
            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={(e) => handelRemove(e, index)}> 
                      Remove 
            </button>
          </div>
        </li>
        </div>
      ))}
        </div>
      </div>
    </div>
  )
}

export default UserProfile