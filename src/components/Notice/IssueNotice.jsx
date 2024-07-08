import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function IssueNotice() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigateTo = useNavigate();
  const [loading,setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const noticeData = {
      title,
      description,
      dueDate,
    };

    try {
      setLoading(true)
      await axios.post(
        'https://projectmanagerbackend-mern.onrender.com/api/v1/notice/issue',
        noticeData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Reset the form after submission
      setTitle('');
      setDescription('');
      setDueDate('');
      toast.success('Notice issued successfully!');
      navigateTo('/notice/all');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error issuing notice:', error);
      toast.error('Error issuing notice. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto px-4 pt-32 md:pt-10 pb-10 bg-gray-900 text-white">
      <h1 className="text-3xl text-[#66D9EF] font-bold text-center mb-8">Issue Notice</h1>
      <div className="flex flex-wrap justify-center items-center gap-y-4 xl:gap-x-20 mb-8">
        <div className="bg-gray-800 rounded-lg shadow-md p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-400 font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder='Eg. PPT Submission'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-400 font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder='Eg. PPT max size '
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dueDate" className="block text-gray-400 font-bold mb-2">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >{!loading?

              "Issue Notice":"Processing..."
            }
            </button>
          </form>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-md p-2 w-full md:h-[23rem] md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
          {/* Add any animation or visualization here */}
          <img src="/file.jpg" alt="file" className='h-full' />
        </div>
      </div>
    </div>
  );
}

export default IssueNotice;
