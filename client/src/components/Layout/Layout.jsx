import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import NavBar from '../../container/NavBar/NavBar'

const Layout = () => {
  return (
      <>
          <Header />
          {/* <NavBar/> */}
          <Outlet />
          <Footer/>
      </>
  )
}

export default Layout