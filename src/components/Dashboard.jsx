import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Dashboard() {
  const [data, setData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollnum: '',
    semester: '',
    branch: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://projectmanagerbackend-mern.onrender.com/api/v1/student/dashboard',
          { withCredentials: true }
        );
        setData(response.data.data);
        setFormData({
          name: response.data.data.name,
          email: response.data.data.email,
          rollnum: response.data.data.rollnum,
          semester: response.data.data.semester,
          branch: response.data.data.branch,
        });
        console.log('User Dashboard Fetched : ', response.data);
      } catch (error) {
        console.log('Error while fetching user data for dashboard', error);
      }
    };

    fetchData();
  }, [isEditable]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveClick = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        'https://projectmanagerbackend-mern.onrender.com/api/v1/student/update',
        formData,
        { withCredentials: true }
      );
      setData(response.data.data);
      setIsEditable(false);
      toast.success('User Details Updated Successfully');
      console.log('User details updated: ', response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error while updating user data', error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-32 md:pt-10 bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row gap-4 p-4 min-h-full">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-6 w-full md:w-1/2 h-full">
          <h2 className="text-3xl font-bold text-[#66D9EF]">Student Details</h2>
          <div className="flex flex-col text-xl md:gap-y-7">
            {isEditable ? (
              <>
                {['name', 'email', 'rollnum', 'semester', 'branch'].map((field) => (
                  <div key={field} className="flex flex-col gap-2">
                    <label htmlFor={field} className="text-gray-400 capitalize">
                      {field}:
                    </label>
                    <input
                      type={field === 'email' ? 'email' : field === 'rollnum' || 'semester' ? 'number': 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="text-gray-200 p-2 bg-gray-700 rounded "
                    />
                  </div>
                ))}
                <button
                  onClick={handleSaveClick}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Save'}
                </button>
              </>
            ) : (
              <>
                {['name', 'email', 'rollnum', 'group', 'semester', 'branch'].map((field) => (
                  <div key={field} className="flex gap-2 gap-y-4">
                    <label htmlFor={field} className="text-gray-400 capitalize text-lg md:text-2xl">
                      {field.replace('rollnum', 'roll no').replace('group', 'group no')}:
                    </label>
                    <span className="text-gray-200 text-lg md:text-2xl ">{data?.[field]}</span>
                  </div>
                ))}
                <button
                  onClick={handleEditClick}
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-6 w-full md:w-1/2 h-full">
          <h2 className="text-3xl font-bold text-[#66D9EF]">Assessment Marks</h2>
          {data?.title?.map((title, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-md shadow-md flex flex-col gap-2">
              <h3 className="text-xl font-medium text-gray-200">{title}</h3>
              <span className="text-gray-400">Marks: {data?.marks?.[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
