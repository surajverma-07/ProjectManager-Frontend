import React from 'react'

function Layout({children}) {
  return (
    <div className='w-full max-w-screen mx-auto p-4 md:p-0 '>
      {children}
    </div>
  )
}

export default Layout
