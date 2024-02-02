import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, signOutAsync } from '../authSlice'
import { Navigate } from 'react-router-dom'

const LogOut = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)

    useEffect(()=>{
        dispatch(signOutAsync(user.id))//removing user data from redux store
    },[]);

    //useEffect will be called after the render so we have to delay the navigation process so when the user is null(user data is removed ) then we will navigate to login page
  return (
    <>
        {!user && <Navigate to='/login' replace={true}></Navigate>}
    </>
  );
}

export default LogOut