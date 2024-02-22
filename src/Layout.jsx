import React from 'react'
import { Outlet } from 'react-router-dom'
 

const Layout = () => {
    return (
        <div className='bg-black'>
           
            <Outlet />
           
        </div>
    )
}

export default Layout
