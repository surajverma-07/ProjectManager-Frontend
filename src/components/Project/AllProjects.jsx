import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          'https://projectmanagerbackend-mern.onrender.com/api/v1/project/all',
          {
            withCredentials: true
          }
        );
        setProjects(response.data.data);
        console.log("projects : ", response.data.data);
      } catch (error) {
        toast.error('Failed to fetch projects!');
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-8 md:px-4 pt-32 md:pt-6 bg-[#030717] text-white">
      <h1 className="text-3xl font-bold text-center mb-8 ">All Projects</h1>
      <div className="flex flex-wrap justify-center xl:gap-x-20 mb-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-[#212931] rounded-lg shadow-md p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4"
          >
            <img
              src={project.projectImage}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-[#66D9EF] mb-4">
              {project.title}
            </h2>
            <p className="text-[#C7C5B8]">{project.description}</p>
            <button className="bg-[#FE3562] hover:bg-[#FE3562]/90 text-white font-bold py-2 px-4 rounded-full mt-4">
              <Link to={`/project/${project._id}`}>Details</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
