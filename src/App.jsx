import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import {
  Header,
  Footer,
  Home,
  MyProject,
  AllProjects,
  IssueNotice,
  Dashboard,
  AddProject,
  ProjectDetails,
  Login,
  Register,
  MyFiles,
  SubmitFiles,
  NotFound,
  Notice,
  NoticeDetails,
} from './components/index.js';
import { useAuth } from './components/context/authContext.jsx';
import StudentLogin from './components/Auth/StudentLogin.jsx';

function App() {
  const { isAuthorized, userData, login, logout, adminLogin } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          isAuthorized
            ? 'https://projectmanagerbackend-mern.onrender.com/api/v1/student/current'
            : 'https://projectmanagerbackend-mern.onrender.com/api/v1/admin/dashboard',
          { withCredentials: true }
        );

        if (isAuthorized) {
          login(response.data.student);
          toast.success('Student data fetched successfully');
        } else {
          adminLogin(response.data.admin);
          toast.success('Admin data fetched successfully');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error('Unauthorized');
          logout();
        } else {
          toast.error(error.response.data.message || 'Failed to fetch user data');
        }
      }
      setLoading(false);
    };

    if (isAuthorized || !userData) {
      fetchData();
    }
  }, [isAuthorized, login, logout, adminLogin, userData]);

  // if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/register" element={<Register />} />
        {isAuthorized ? (
          <>
            <Route path="/notice/issue" element={<IssueNotice />} />
            <Route path="/notice/all" element={<Notice />} />
            <Route path="/notice/:id" element={<NoticeDetails />} />
            <Route path="/project/submit" element={<AddProject />} />
            <Route path="/project/my" element={<MyProject />} />
            <Route path="/project/all" element={<AllProjects />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/files/submit" element={<SubmitFiles />} />
            <Route path="/files/:projectId" element={<MyFiles />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
