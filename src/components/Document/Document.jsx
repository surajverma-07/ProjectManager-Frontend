import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';

function Document() {
  const [documents, setDocuments] = useState([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    // Fetch notice data from API
    axios.get('https://projectmanagerbackend-mern.onrender.com/api/v1/document/all', { withCredentials: true })
      .then(response => {
        setDocuments(response.data.data);
        console.log("response notice: ", response.data.data);
      })
      .catch(error => {
        console.error('Error fetching notices:', error);
      });
  }, []);

  const deleteDocument = async (id) => {
    try {
      await axios.delete(`https://projectmanagerbackend-mern.onrender.com/api/v1/document/delete/${id}`, { withCredentials: true });
      toast.success("Document Deleted Successfully");
      setDocuments(documents.filter(notice => notice._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    
    <div className="container mx-auto px-4 md:pt-4 pt-32 pb-4 bg-gray-900 text-white">
      {documents && 
      <div>
      <h1 className="text-3xl font-bold text-center mb-8">Documents</h1>
      <div className="flex flex-wrap flex-row-reverse justify-center items-center gap-y-4 xl:gap-x-20 mb-8">
        {documents.length > 0 ? documents.map(document => (
          <div key={document._id} className="bg-gray-800 rounded-lg shadow-md p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
            <h2 className="text-2xl font-bold text-[#66D9EF] mb-4">{document.title}</h2>
            <p className="text-gray-400">{document.description}</p>
            <div className="flex justify-between">
              {!isAdmin ? (
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  <a href={`${document.file}`} target='_blank'>Download</a>
                </button>
              ) : (
                
                  <button
                    onClick={() => deleteDocument(document._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded">
                    Delete
                  </button>
              )}
            </div>
          </div>
        )) : (
          <div>
            <h2>No Documents Available</h2>
            <h3>Stay updated for further information.</h3>
          </div>
        )}
      </div>
      </div>
      }
    </div>
  );
}

export default Document;
