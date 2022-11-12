import React from 'react'
import { Outlet } from 'react-router-dom'
import HorizontalNavbar from '../components/dashboard/HorizontalNavbar'
import Footer from '../components/shared/Footer'

const CustomerDashboardLayout = () => {
  return (
    <div>
        <HorizontalNavbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default CustomerDashboardLayout