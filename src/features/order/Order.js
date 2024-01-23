import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrderByUserIdAsync, selectAllOrdersByUserId } from "./orderSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Order() {
  const user = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()
  const orders = useSelector(selectAllOrdersByUserId)
  useEffect(() => {
    dispatch(fetchAllOrderByUserIdAsync(user.id))
  },[dispatch,user])

  return (
    <>
    {!orders && <Navigate to="/" replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl mt-10 bg-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-700">Ordered Items</h1>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {orders.map((item) => (
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
                  


                  
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            {/* <p>${totalAmount}</p> */}
            
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          {/* <p className="font-thin">{totalItems}-Items</p> */}
            
          </div>
          
          <div className="mt-6">
            <Link to="/checkout"
              
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
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
