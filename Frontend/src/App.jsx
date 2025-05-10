import { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Componts/Navbar';
import Login from './Componts/Login';
import Signup from './Componts/signup';
import Home from './Componts/Home';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from "react-router";
import Update from './Componts/Update';
import CreatePost from './Componts/CreatePost';

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/refresh", {}, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
          }
        });
        const newAccessToken = res.data.access_token;
        localStorage.setItem("access_token", newAccessToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
       
      }
    }
    return Promise.reject(error);
  }
);

function App() {
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  // Initialize user state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('access_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  /******************************Login / signup handler********************************************* */
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  
  const handleSignup = async (data) => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/signup', data, {
        withCredentials: true,
      });
      const userData = {
        'name': res.data.data.name,
        'email': res.data.data.email,
        'id': res.data.data.id,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate("/");
    } catch (err) {
      const serverErrors = err.response?.data.data;
      if (serverErrors) {
        for (const field in serverErrors) {
          setError(field, {
            type: 'server',
            message: serverErrors[field][0], 
          });
        }
      } else if (err.response?.data?.msg) {
        setError('server', {
          type: 'server',
          message: err.response.data.msg,
        });
      } 
    }
  };

  const { register: loginRegister, handleSubmit: loginHandleSubmit, formState: { errors: loginErrors }, setError: setLogError } = useForm();
  
  const handleLoginSubmit = async (data) => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login', data);
      const userData = {
        'name': res.data.data.name,
        'email': res.data.data.email,
        'id': res.data.data.id,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('access_token', res.data.access_token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
      setUser(userData);
      navigate("/");
    } catch (err) {
      const serverErrors = err.response?.data;  
      if (serverErrors && serverErrors.errors) {
        for (const field in serverErrors.errors) {
          setLogError(field, {
            type: 'server',
            message: serverErrors.errors[field][0], 
          });
        }
      } else if (serverErrors && serverErrors.msg) {
        setLogError('server', {
          type: 'server',
          message: serverErrors.msg, 
        });
      }
    }
  };

  /******************************Posts Fetching, Creating, Updating, and Deleting******************************** */

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight && hasMore
      ) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore]);

  useEffect(() => {
    const fetchPosts = async () => {
       const res = await axios.get(`http://127.0.0.1:8000/api/posts?page=${page}`);
        const newPosts = res.data.data.data;
        if (newPosts.length === 0) {
          setHasMore(false);
        } else {
          setPosts(prev => {
            const existingIds = new Set(prev.map(post => post.id));
            const filteredNewPosts = newPosts.filter(post => !existingIds.has(post.id));
            return [...prev, ...filteredNewPosts];
          });
        }
    };
    fetchPosts();
  }, [page, refresh]);

  const handelDelete = async (id) => {
     await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`);
      setPosts([]);       
      setPage(1);         
      setHasMore(true);    
      setRefresh(prev => !prev); 
  };

  /****************************Handle Create Post******************************************** */

  const { register: createPostregister, handleSubmit: handelCreatePostSubmit, formState: { errors: createPostErrors }, reset: resetCreateForm } = useForm();

  const createPostOnSubmit = async (data) => {
     const formData = new FormData();
      formData.append('title', data.title);
      formData.append('body', data.body);
      formData.append('user_id', user.id);
      if (data.img && data.img.length > 0) {
        formData.append('img', data.img[0]);
      }

      await axios.post('http://localhost:8000/api/posts', formData);
      setPosts([]);       
      setPage(1);         
      setHasMore(true);    
      setRefresh(prev => !prev); 
      navigate("/");
  };

  /****************************Handle Update Post******************************************** */

  const [data, setData] = useState(null);
  const handelUpdate = async (id) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/posts/${id}`);
      setData(data.data);
  };

  useEffect(() => {
    if (data) {
      navigate(`/posts/${data.id}/edit`);
    }
  }, [data]);

  const { register: updatePostregister, handleSubmit: handelUpdatePostSubmit, formState: { errors: updatePostErrors }, reset: resetUpdateForm } = useForm();

  useEffect(() => {
    if (data) {
      resetUpdateForm({
        id: data.id,
        title: data.title,
        body: data.body,
      });
    }
  }, [data, resetUpdateForm]);

  const updatePostOnSubmit = async (data) => {
     const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('title', data.title);
      formData.append('body', data.body);
      if (data.img && data.img[0]) {
        formData.append('img', data.img[0]);
      }

      await axios.post(`http://localhost:8000/api/posts/${data.id}`, formData);
      setPosts([]);       
      setPage(1);         
      setHasMore(true);    
      setRefresh(prev => !prev); 
      navigate("/");
  };

  /******************************************** Logout ***********************************************/

  const handleLogout = async () => {
   const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        await axios.post(
          `http://127.0.0.1:8000/api/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }

      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      delete axios.defaults.headers.common['Authorization'];
      navigate('/');
  };

 return (
    <>
    
      
      <Navbar
      handleLogout={handleLogout}
      />
      <Routes>
        <Route path='/' element={<Home
        allPosts={posts}
        handelDelete={handelDelete}
        handelUpdate={handelUpdate}
        />}>
        </Route>
       <Route  path="/posts/:id/edit" element={<Update
       
       register={updatePostregister} 
       handleSubmit={handelUpdatePostSubmit}  
       errors={updatePostErrors} 
       onSubmit={updatePostOnSubmit} 
       handelOld={data}
       reset={resetUpdateForm}
       />}>
       </Route>
       <Route  path="/posts/create" element={<CreatePost
       
       register={createPostregister} 
       handleSubmit={handelCreatePostSubmit}  
       errors={createPostErrors} 
       onSubmit={createPostOnSubmit}  
       reset={resetCreateForm}
       />}>
       </Route>
        <Route path="/login" element={<Login
           register={loginRegister} 
           handleSubmit={loginHandleSubmit} 
           errors={loginErrors} 
           onSubmit={handleLoginSubmit} 
        />} />
        <Route path="/signup"  element={<Signup
         register={register} 
         handleSubmit={handleSubmit} 
         errors={errors} 
         onSubmit={handleSignup} 
        
        />} />
      </Routes>
    
   
    </>
  )
}
export default App