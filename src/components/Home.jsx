import React from 'react'
import { useAuth } from './context/authContext'
import { Link } from 'react-router-dom';
function Home() {
  const { isAuthorized, isAdmin } = useAuth()
  return (

    <div className="flex flex-wrap justify-center items-center md:gap-x-10 bg-gray-900 text-gray-100">
      <div className="w-full md:w-1/2 xl:w-1/3 text-center mt-32">
        <h1 className="text-5xl font-bold mb-4 text-[#66D9EF]">Student Project Manager</h1>
        <p className="mb-8">Manage projects in an easier way, track student projects</p>
        {isAuthorized && 
        (isAdmin ?
          <button className="bg-red-500 hover:bg-red-700  text-white font-bold py-2 my-4 px-4 rounded focus:outline-none focus:shadow-outline"><Link to={'/notice/issue'}>Issue Notice</Link></button>
          :
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 my-4 rounded focus:outline-none focus:shadow-outline"><Link to={'/project/submit'}>Add Your Project</Link></button>
        )
      }
      </div>
      <div className="md:mt-10">
        <img src="/homepic.jpg" alt="placeholder image" className="w-60 h-60 md:w-96 md:h-96 rounded" />
      </div>
    </div>
  );
}

export default Home;