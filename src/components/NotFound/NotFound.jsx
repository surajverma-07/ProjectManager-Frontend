import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'
function NotFound() {
  return (
    <section className='page notfound'>
      <div className="content">
        <img src="/notfound.png" alt="notfound" />
        <Link to={"/"}>Return To Home</Link>
      </div>
    </section>
  )
}

export default NotFound
