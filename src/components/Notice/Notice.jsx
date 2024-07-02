import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
function Notice() {
  const [notices, setNotices] = useState([]);
  const {isAdmin} = useAuth();

  useEffect(() => {
    // Fetch notice data from API
    axios.get('https://projectmanagerbackend-mern.onrender.com/api/v1/notice/all',{withCredentials:true})
      .then(response => {
        setNotices(response.data.data);
        console.log("response notice : ",response.data.data);
      })
      .catch(error => {
        console.error('Error fetching notices:', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4 h-screen  bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Notice</h1>
      <div className="flex flex-wrap justify-center items-center xl:gap-x-20 mb-8">
        {notices ? 
        notices.map(notice => (
          <div key={notice._id} className="bg-gray-800 rounded-lg shadow-md p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
            <h2 className="text-2xl font-bold text-[#66D9EF] mb-4">{notice.title}</h2>
            <p className="text-gray-400">{notice.description}</p>
            <div className="flex justify-between">
              <p className="text-gray-400">Due Date: {notice.dueDate}</p>
              {!isAdmin &&
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <Link to={'/files/submit'}>Submit</Link>
              </button>
              }
            </div>
          </div>
        )):
        <div>
          <h2>No Notice Available </h2>
          <h3>Stay updated for further information.</h3>
        </div>
        }
      </div>
    </div>
  );
}

export default Notice;