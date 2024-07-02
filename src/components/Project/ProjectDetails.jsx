import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { AiOutlineEdit } from "react-icons/ai";

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [editingMarks, setEditingMarks] = useState(null);
  const [newMarks, setNewMarks] = useState("");
  const { id } = useParams();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `https://projectmanagerbackend-mern.onrender.com/api/v1/project/${id}`,
          {
            withCredentials: true,
          }
        );
        const data = response.data.data;
        setProject(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `https://projectmanagerbackend-mern.onrender.com/api/v1/submission/myfiles/${id}`,
          {
            withCredentials: true,
          }
        );
        const filesData = response.data.data;
        setFiles(filesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
    fetchFiles();
  }, [id]);

  const handleEditClick = (fileId) => {
    setEditingMarks(fileId);
  };

  const handleMarksChange = (e) => {
    setNewMarks(e.target.value);
  };

  const handleMarksSubmit = async (fileId) => {
    try {
      await axios.patch(
        `https://projectmanagerbackend-mern.onrender.com/api/v1/submission/update/marks/${fileId}`,
        { marks: newMarks },
        {
          withCredentials: true,
        }
      );
      // Update the marks locally to reflect the changes immediately
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file._id === fileId ? { ...file, marks: newMarks } : file
        )
      );
      setEditingMarks(null);
      setNewMarks("");
    } catch (error) {
      console.error(error);
    }
  };

  if (!project || !files) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container h-fit mx-auto p-4 mb-10 bg-[#030717] text-white">
      <h1 className="text-3xl font-bold text-center text-[#FE3562] mb-4">
        {project.title}
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="bg-[#212931] rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold text-center text-[#66D9EF] mb-2">Project Image</h2>
            <img
              src={project.projectImage}
              alt={project.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="bg-[#212931] p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-[#66D9EF] mb-2">Domain</h2>
            <p className="text-[#C7C5B8] text-sm">{project.domain}</p>
          </div>
          <div className="bg-[#212931] p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-[#66D9EF] mb-2">Group</h2>
            <p className="text-[#C7C5B8] text-sm">{project.group}</p>
          </div>
          <div className="bg-[#212931] p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-[#66D9EF] mb-2">Submitted By</h2>
            <p className="text-[#C7C5B8] text-sm">Name: {project.submittedBy.name}</p>
            <p className="text-[#C7C5B8] text-sm">Roll No.: {project.submittedBy.rollnum}</p>
          </div>
          <div className="bg-[#212931] p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-[#66D9EF] mb-2">Student 2</h2>
            <p className="text-[#C7C5B8] text-sm">Name: {project.studentTwo.name}</p>
            <p className="text-[#C7C5B8] text-sm">Roll No.: {project.studentTwo.rollnum}</p>
          </div>
          <div className="bg-[#212931] p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-[#66D9EF] mb-2">Student 3</h2>
            <p className="text-[#C7C5B8] text-sm">Name: {project.studentThree.name}</p>
            <p className="text-[#C7C5B8] text-sm">Roll No.: {project.studentThree.rollnum}</p>
          </div>
          <div className="bg-[#212931] p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-[#66D9EF] mb-2">Submitted On</h2>
            <p className="text-[#C7C5B8] text-sm">{project.submittedOn}</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-[#212931] p-4 rounded-lg">
            <h2 className="text-xl font-bold text-[#66D9EF] text-center mb-4">Files</h2>
            {files.map((file, index) => (
              <div key={file._id} className="bg-[#212931] p-4 rounded-lg mb-2">
                <h3 className="text-lg font-bold text-[#66D9EF] mb-1">{file.title}</h3>
                <div className="flex justify-between items-center">
                  <a
                    href={file.fileUrl}
                    download
                    className="bg-[#FE3562] hover:bg-[#FE3562]/90 text-white font-bold py-1 px-2 rounded text-sm"
                  >
                    Download
                  </a>
                  {editingMarks === file._id ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={newMarks}
                        onChange={handleMarksChange}
                        className="text-black rounded px-2 py-1 mr-2"
                      />
                      <button
                        onClick={() => handleMarksSubmit(file._id)}
                        className="bg-[#66D9EF] text-white font-bold py-1 px-2 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <span className="bg-[#212931] text-white font-bold py-1 px-2 rounded text-sm">
                      Marks: {file.marks !== null ? file.marks : "N/A"}
                    </span>
                  )}
                  {isAdmin && editingMarks !== file._id && (
                    <AiOutlineEdit
                      onClick={() => handleEditClick(file._id)}
                      className="cursor-pointer text-[#66D9EF] ml-2"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
