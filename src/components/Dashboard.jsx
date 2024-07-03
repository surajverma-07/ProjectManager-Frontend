import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './context/authContext';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const [data, setData] = useState(null);
  const navigateTo = useNavigate();
  const{logout} = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://projectmanagerbackend-mern.onrender.com/api/v1/student/dashboard',
          { withCredentials: true }
        );
        setData(response.data.data);
        console.log('User Dashboard Fetched : ', response.data);
      } catch (error) {
        console.log('Error while fetching user data for dashboard', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 pt-32 md:pt-10 bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row gap-4 p-4 min-h-full">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-6 w-full md:w-1/2 h-full">
          <h2 className="text-3xl font-bold text-[#66D9EF]">Name</h2>
          <div className="flex flex-col text-xl md:gap-y-7">
            <div>
              <label htmlFor="email" className="text-gray-400">
                Email:
              </label>
              <span className="text-gray-200 ml-2">{data?.email}</span>
            </div>
            <div>
              <label htmlFor="rollNo" className="text-gray-400">
                Roll No.:
              </label>
              <span className="text-gray-200 ml-2">{data?.rollnum}</span>
            </div>
            <div>
              <label htmlFor="group" className="text-gray-400">
                Group No.:
              </label>
              <span className="text-gray-200 ml-2">{data?.group}</span>
            </div>
            <div>
              <label htmlFor="semester" className="text-gray-400">
                Semester:
              </label>
              <span className="text-gray-200 ml-2">{data?.semester}</span>
            </div>
            <div>
              <label htmlFor="branch" className="text-gray-400">
                Branch:
              </label>
              <span className="text-gray-200 ml-2">{data?.branch}</span>
            </div>
          </div>
         
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-6 w-full md:w-1/2 h-full">
          <h2 className="text-3xl font-bold text-[#66D9EF]">
            Assessment Marks
          </h2>
          {data?.title?.map((title, index) => (
            <div
              key={index}
              className="bg-gray-700 p-4 rounded-md shadow-md flex flex-col gap-2"
            >
              <h3 className="text-xl font-medium text-gray-200">
                {title}
              </h3>
              <span className="text-gray-400">Marks: {(data?.marks?.[index])}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
