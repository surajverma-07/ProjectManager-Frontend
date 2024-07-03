import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function SubmitFiles() {
  const [loading,setLoading] = useState(false)
  const [projectId, setProjectId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    group: '',
    file: null,
  });
  const navigateTo = useNavigate();

  useEffect(() => {
    axios.get('https://projectmanagerbackend-mern.onrender.com/api/v1/project/my', { withCredentials: true })
     .then(response => {
        setProjectId(response.data.data[0]._id);
      })
     .catch(error => {
        console.error('Error fetching project:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({...formData, [name]: files[0] });
    } else {
      setFormData({...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('group', formData.group);
    data.append('fileUrl', formData.file);

    try {
      setLoading(true)
      await axios.post(`https://projectmanagerbackend-mern.onrender.com/api/v1/submission/submit/${projectId}`, data, {
        withCredentials:true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset the form after submission
      setFormData({
        title: '',
        group: '',
        file: null,
      });
      toast.success('File submitted successfully!');
      setLoading(false)
      navigateTo('/project/my');
    } catch (error) {
      setLoading(false)
      console.error('Error submitting file:', error);
      toast.error('Error submitting file. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto p-4 pt-32 md:pt-4 bg-gray-900 text-white">
      <h1 className="text-3xl text-[#66D9EF] font-bold text-center mb-8">File Submission</h1>
      <div className="flex flex-wrap justify-center items-center xl:gap-x-20 mb-8">
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="group" className="block text-gray-400 font-bold mb-2">
                Group
              </label>
              <input
                type="text"
                id="group"
                name="group"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.group}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-400 font-bold mb-2">
                File
              </label>
              <input
                type="file"
                id="file"
                name="file"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >{!loading?
              "Submit":"submitting..."
              
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

export default SubmitFiles;