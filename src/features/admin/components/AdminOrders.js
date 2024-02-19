import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, selectAllOrders, updateOrderAsync } from '../../order/orderSlice';
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { discountPrice } from '../../../app/constants';
import { updateCartAsync } from '../../cart/cartSlice';

const AdminOrders = () =>{
    const dispatch = useDispatch();
    const orders = useSelector(selectAllOrders)
    const [editableOrderId , setEditableOrderId] = useState(-1);

    useEffect(() => {
        dispatch(fetchAllOrdersAsync())
    },[dispatch,orders]);


    const handleEdit = (order) => {
      setEditableOrderId(order.id);
    };

    const handeleShow = (order) => {
      console.log("handle show")
    };

    const handleUpdate = (e,order) => {
      const updatedOrder = {...order, deliveryStatus:e.target.value}
      dispatch(updateOrderAsync(updatedOrder))
      setEditableOrderId(-1)
    };

    const statusColor = (deliveryStatus) => {
      switch(deliveryStatus){
        case 'pending':
          return 'bg-purple-300 text-purple-600';
        case 'shipping':
          return 'bg-yellow-300 text-yellow-600';
        case 'dispatched':
          return 'bg-blue-300 text-blue-600';
        case 'delivered':
          return 'bg-green-300 text-green-600';
        case 'cancled':
          return 'bg-red-300 text-red-600';
        default:
          return 'bg-purple-300 text-purple-600';
      }
    };

    return(
      <div className="overflow-x-auto hide-scrollbar">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">#Order Id</th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-left">Total Amount</th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">


            {orders.map( order => <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                <div className='mr-2'>

                </div>
                  <span className="font-medium">{order.id}</span>
                </div>
              </td>
                <td className="py-3 px-6 text-left">
              {order.items.map(item => <div className="flex items-center p-2">
                  <div className='mr-2'>
                  <span>
                    <img className='w-10 h-10 rounded-full' src={item.product.thumbnail} alt='img'></img>
                  </span>
                  </div>
                  <span >{item.product.title} - #{item.quantity} - ${discountPrice(item.product)}</span>
                </div>)}
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">
                  {/* totle amount */} 
                  <span>${order.totalAmount}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="">
                  {/* shipping address */}
                  <div><strong className='font-bold'>{order.selectedAddress.name}</strong></div>
                  <div><span>{order.selectedAddress.phone}</span></div>
                  <div><span>{order.selectedAddress.street}</span></div>
                  <div><span>{order.selectedAddress.city}</span></div>
                  <div><span>{order.selectedAddress.pincode}</span></div>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                
              {order.id === editableOrderId ? 

                 <select onChange={e=> handleUpdate(e,order)}>
                <option value="pending">Pending</option>
                  <option value="shipping">In shipping</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancled">Cancled</option>
                </select> :

                <span className={`${statusColor(order.deliveryStatus)} py-1 px-3 rounded-full text-xs`}>
                  
                {order.deliveryStatus}
              </span>
              }
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center ">
                  {/* edit and eye icon */}
                  <div className='w-4 mr-2 px-3 transform text-blue-500 hover:scale-110'>
                        <EyeIcon className='w-6 h-6 cursor-pointer' onClick={e => handeleShow(order)}></EyeIcon>
                  </div>
                  <div className='w-4 mr-2 px-3 transform hover:text-green-500 hover:scale-110'>
                        <PencilIcon className='w-6 h-6 cursor-pointer' onClick={e => handleEdit(order)}></PencilIcon>
                  </div>
                  
                </div>
              </td>
            </tr>)}
            
          </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    

    );
}

export default AdminOrders;