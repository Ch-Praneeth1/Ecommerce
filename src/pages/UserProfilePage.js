import React from 'react'
import { Navbar } from '../features/nav-bar/Navbar'
import UserProfile from '../features/user/components/UserProfile'

const UserProfilePage = () => {
  return (
    <div>
        <Navbar>
            <h1 className='mx-auto text-2xl'>User Profile</h1>
            <UserProfile></UserProfile>
        </Navbar>
    </div>
  )
}

export default UserProfilePage