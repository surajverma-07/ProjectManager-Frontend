import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/authContext.jsx';
import { Link ,useNavigate} from 'react-router-dom';

function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout } = useAuth();
  const [loading,setLoading] = useState(false);

  const navigateTo = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        'https://projectmanagerbackend-mern.onrender.com/api/v1/student/login',
        { email, password },
        { withCredentials: true }
      );
      console.log("Studetn login successfully ");
      login(response.data.data);
      toast.success(response.data.message || 'Student Login successful');
      navigateTo("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message || 'Student Login failed');
      logout();
    }
  };

  return (
    <div className="flex items-center pt-72 pb-10 mx-2  md:pt-44 justify-center bg-gray-900 text-white">
      <div className="max-w-lg w-full mx-auto bg-gray-800 rounded-lg shadow-lg p-8 -mt-32">
        <div className="mb-4 flex justify-center">
          <img src="/spmlogo.png" alt="logo" className="w-24" />
        </div>
        <h2 className="text-center text-2xl text-[#66D9EF] font-bold mb-4">Sign in to your account</h2>
        <p className="text-center text-gray-400 mb-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
        <form onSubmit={loginHandler} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-400 mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition duration-200"
          >{!loading ?
            "Sign In":"Signing in..."
          }
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;

