import React from 'react'
import { Navbar } from './_components/Navbar'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <Navbar/>
    <div>{children}</div>    
    </>
  )
}

export default Layout