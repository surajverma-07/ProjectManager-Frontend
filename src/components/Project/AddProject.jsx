import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddProject() {
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');
  const [group, setGroup] = useState('');
  const [studentTwo, setStudentTwo] = useState('');
  const [studentThree, setStudentThree] = useState('');
  const [projectImage, setProjectImage] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false)
  const navigateTo = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('domain', domain);
    formData.append('description', description);
    formData.append('group', group);
    formData.append('studentTwo', studentTwo);
    formData.append('studentThree', studentThree);
    formData.append('projectImage', projectImage);

    try {
      setLoading(true);
      const response = await axios.post('https://projectmanagerbackend-mern.onrender.com/api/v1/project/submit', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Project added successfully!');
      setLoading(false);
      navigateTo('/project/my')
      setError(false)
      // Handle success response from backend
    } catch (error) {
      setError(true)
      setLoading(false)
      toast.error('Error adding project: ' + error.response.data.message);
      // Handle error response from backend
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (file && !validImageTypes.includes(file.type)) {
      toast.error('Invalid file type. Only .png, .jpeg, and .jpg are allowed.');
      return;
    }
    setProjectImage(file);
  };

  return (
    <div className="container mx-auto p-4 pb-20 pt-32 md:pt-6 lg:p-8 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold text-center mb-4">Add Your Project</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded-lg p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-gray-400 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter project title"
            />
          </div>
          <div>
            <label htmlFor="domain" className="block text-gray-400 text-sm font-bold mb-2">
              Domain
            </label>
            <select
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select domain</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="Game Development">Game Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-400 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter project description"
            />
          </div>
          <div>
            <label htmlFor="group" className="block text-gray-400 text-sm font-bold mb-2">
              Group {error && <p className='inline ml-2 text-sm text-red-400'>* Enter Correct Group Number</p>}
            </label>
            <input
              type="text"
              id="group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter project group"
            />
          </div>
          <div>
            <label htmlFor="studentTwo" className="block text-gray-400 text-sm font-bold mb-2">
              Student Two {error && <p className='inline ml-2 text-sm text-red-400'>* Enter Correct University Roll Number</p>}
            </label>
            <input
              type='number'
              id="studentTwo"
              value={studentTwo}
              onChange={(e) => setStudentTwo(e.target.value)}
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Student Two Roll Number"
            />
          </div>
          <div>
            <label htmlFor="studentThree" className="block text-gray-400 text-sm font-bold mb-2">
              Student Three  {error && <p className='inline ml-2 text-sm text-red-400'>* Enter Correct University Roll Number</p>}
            </label>
            <input
              type='number'
              id="studentThree"
              value={studentThree}
              onChange={(e) => setStudentThree(e.target.value)}
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Student Three Roll Number"
            />
          </div>
          <div>
            <label htmlFor="projectImage" className="block text-gray-400 text-sm font-bold mb-2">
              Project Image  {error && <p className='inline ml-2 text-sm text-red-400'>* Enter Image Only </p>}
            </label>
            <input
              type="file"
              id="projectImage"
              accept='.png, .jpeg, .jpg'
              onChange={handleImageChange}
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {!loading ?
          "Add Project":
          "Adding Project..."
          }
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;
