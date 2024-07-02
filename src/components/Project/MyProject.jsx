import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function MyProject() {
  const [project, setProject] = useState({});
  const [files, setFiles] = useState([]);
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    // Fetch project data from backend API
    axios.get('https://projectmanagerbackend-mern.onrender.com/api/v1/project/my',{withCredentials:true})
      .then(response => {
        setProject(response.data.data[0]);
        console.log(" project : ",response.data.data[0]);

        if (response.data.data) {
          setProjectId(response.data.data[0]._id);
        }
      })
      .catch(error => {
        console.error('Error fetching project data:', error);
      });
  }, []);

  useEffect(() => {
    if (projectId) {
      // Fetch file data from backend API
      axios.get(`https://projectmanagerbackend-mern.onrender.com/api/v1/submission/myfiles/${projectId}`,{withCredentials:true})
        .then(response => {
          console.log("file of project : ",response.data.data);
          setFiles(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching file data:', error);
        });
    }
  }, [projectId]);

  return (
    <div className="container mx-auto p-4 bg-[#030717] text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Project</h1>
      <div className="flex flex-wrap justify-center xl:gap-x-20 mb-8">
        {project ? (
          <div className="bg-[#212931] rounded-lg shadow-md p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
            <h2 className="text-2xl font-bold text-[#66D9EF] mb-4">{project.title}</h2>
            <img src={project.projectImage} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-[#C7C5B8]">{project.description}</p>
            <button className="bg-[#FE3562] hover:bg-[#FE3562]/90 text-white font-bold py-2 px-4 rounded-full mt-4"><Link to={`/project/${projectId}`}>Details</Link></button>
          </div>
        ) : (
          <div className="bg-[#212931] rounded-lg shadow-md p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
            <h2 className="text-2xl font-bold mb-4">No projects available</h2>
            <button className="bg-[#FE3562] hover:bg-[#FE3562]/90 text-white font-bold py-2 px-4 rounded-full">Add Project</button>
          </div>
        )}
        {projectId && (
          <div className="bg-[#212931] rounded-lg shadow-md p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
            <h2 className="text-2xl font-bold text-center mt-8 mb-4">Files</h2>
            <ul className="list-none mb-4">
              {files && files.map(file => (
                <li key={file._id} className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#66D9EF]">{file.title}</h3>
                  <a href={file.fileUrl} className="bg-[#FE3562] hover:bg-[#FE3562]/90 text-white font-bold py-2 px-4 rounded-full" target="_blank" rel="noopener noreferrer">Download</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProject;