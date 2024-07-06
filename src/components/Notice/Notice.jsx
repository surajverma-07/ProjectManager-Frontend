import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';

function Notice() {
  const [notices, setNotices] = useState([]);
  const { isAdmin } = useAuth();
  const [editingNotice, setEditingNotice] = useState(null);

  useEffect(() => {
    // Fetch notice data from API
    axios.get('https://projectmanagerbackend-mern.onrender.com/api/v1/notice/all', { withCredentials: true })
      .then(response => {
        setNotices(response.data.data);
        console.log("response notice: ", response.data.data);
      })
      .catch(error => {
        console.error('Error fetching notices:', error);
      });
  }, []);

  const deleteNotice = async (id) => {
    try {
      await axios.delete(`https://projectmanagerbackend-mern.onrender.com/api/v1/notice/delete/${id}`, { withCredentials: true });
      toast.success("Notice Deleted Successfully");
      setNotices(notices.filter(notice => notice._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const editNotice = async (id) => {
    try {
      await axios.patch(`https://projectmanagerbackend-mern.onrender.com/api/v1/notice/edit/${id}`, {
        title: editingNotice.title,
        description: editingNotice.description,
        dueDate: editingNotice.dueDate,
      }, { withCredentials: true });

      toast.success("Notice Edited Successfully");
      setNotices(notices.map(notice => notice._id === id ? editingNotice : notice));
      setEditingNotice(null); // Close the modal
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openEditModal = (notice) => {
    setEditingNotice(notice);
  };

  const closeEditModal = () => {
    setEditingNotice(null);
  };

  const handleEditChange = (e) => {
    setEditingNotice({ ...editingNotice, [e.target.name]: e.target.value });
  };

  function formatDate(apiDate) {
    const [year, month, day] = apiDate.split('T')[0].split('-');
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="container mx-auto px-4 md:pt-4 pt-32 pb-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Notice</h1>
      <div className="flex flex-wrap flex-row-reverse justify-center items-center gap-y-4 xl:gap-x-20 mb-8">
        {notices.length > 0 ? notices.map(notice => (
          <div key={notice._id} className="bg-gray-800 rounded-lg shadow-md p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
            <h2 className="text-2xl font-bold text-[#66D9EF] mb-4">{notice.title}</h2>
            <p className="text-gray-400">{notice.description}</p>
            <div className="flex justify-between">
              <p className="text-gray-400">Due Date: {formatDate(notice.dueDate)}</p>
              {!isAdmin ? (
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  <Link to={'/files/submit'}>Submit</Link>
                </button>
              ) : (
                <div className='flex gap-x-2'>
                  <button
                    onClick={() => openEditModal(notice)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNotice(notice._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )) : (
          <div>
            <h2>No Notice Available</h2>
            <h3>Stay updated for further information.</h3>
          </div>
        )}
      </div>

      {editingNotice && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mt-10 w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-bold text-[#66D9EF] mb-4">Edit Notice</h2>
            <form onSubmit={(e) => { e.preventDefault(); editNotice(editingNotice._id); }}>
              <div className="mb-4">
                <label className="block text-white mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editingNotice.title}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 text-gray-700 bg-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Description</label>
                <textarea
                  name="description"
                  value={editingNotice.description}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 text-gray-700 bg-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={editingNotice.dueDate.split('T')[0]}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 text-gray-700 bg-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end gap-x-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notice;
