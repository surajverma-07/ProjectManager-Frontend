import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/authContext.jsx';
import { Link,useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    semester: '',
    rollnum: '',
    group: '',
    branch: '',
  });
  const [error,setError] = useState(false)
  const navigateTo = useNavigate();
  const [loading,setLoading] = useState(false);
  const { login, logout } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(
        'https://projectmanagerbackend-mern.onrender.com/api/v1/student/register',
        formData,
        { withCredentials: true }
      );
      toast.success(response.data.message || 'Student registration successful');
      console.log("Student registered successfully");
      login(response.data.data);
      setLoading(false);
      setError(false)
      navigateTo('/student/login');
    } catch (error) {
      setLoading(false)
      setError(true)
      console.log("error in register : ",error);
      toast.error(error.response.data.message || 'Student registration failed');
      logout();
    }
  };

  return (
    <div className="pt-60 sm:pt-44  pb-20 mx-2 bg-gray-900 text-white">
      <div className="max-w-lg w-full mx-auto bg-gray-800 rounded-lg shadow-lg p-8 -mt-32">
        <div className="mb-4 flex justify-center">
          <img src="/spmlogo.png" alt="logo" className="w-24" />
        </div>
        <h2 className="text-center text-2xl text-[#66D9EF] font-bold mb-4">Create your account</h2>
        <p className="text-center text-gray-400 mb-4">
          Already have an account?{' '}
          <Link to="/student/login" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
        <form onSubmit={registerHandler} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-400 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              placeholder='Your Full Name'
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Your Valid Email Id'
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="semester" className="block text-gray-400 mb-1">
              Semester
            </label>
            <input
              type="number"
              id="semester"
              name="semester"
              placeholder='Current Semester'
              value={formData.semester}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="rollnum" className="block text-gray-400 mb-1">
              Roll Number {error &&
              <p className='inline ml-4 text-sm text-red-700'>* Enter Currect University Roll Number</p>}
            </label>
            <input
              type="number"
              id="rollnum"
              name="rollnum"
              placeholder='University Roll Number (12digit)'
              value={formData.rollnum}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="group" className="block text-gray-400 mb-1">
              Group
            </label>
            <input
              type="text"
              id="group"
              name="group"
              placeholder='Group No. (example : 4A12)'
              value={formData.group}
              onChange={handleChange}
className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="branch" className="block text-gray-400 mb-1">
              Branch
            </label>
            <input
              type="text"
              id="branch"
              name="branch"
              placeholder='Example : CSE'
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition duration-200"
          >
            {!loading ? 
              "Sign Up":"Registering User"
            }
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;