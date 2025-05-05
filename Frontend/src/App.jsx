import { useState , createContext,useContext, useEffect } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Componts/Navbar';
import Login from './Componts/Login';
import Signup from './Componts/signup';
import Home from './Componts/Home';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { UserContext } from './Context/UserContext';
import { useNavigate } from "react-router";
import Update from './Componts/Update';
import CreatePost from './Componts/CreatePost';

function App() {
  let navigate = useNavigate();
  /******************************Login / signup hadel********************************************* */
  const [user,setUser]=useState(null);
  const {register, handleSubmit, formState: { errors }, setError } = useForm();
  
  const handleSignup = async (data) => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/signup', data);
      //console.log('Signup successful:', res.data);
      setUser({
        'name': res.data.data.name,
        'email': res.data.data.email,
        'id': res.data.data.id,
      });
      console.log(user);
      navigate("/")
    } catch (err) {
      const serverErrors = err.response?.data.data;
      //console.log('Error:', serverErrors);
  
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
      } else {
        console.error('Unexpected error:', err.message);
      }
    } 
  };
  
  const { register: loginRegister, handleSubmit: loginHandleSubmit, formState: { errors: loginErrors },setError :setLogError } = useForm();
  const handleLoginSubmit = async (data) => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login', data);
      //console.log('Login successful:', res.data.msg);
      setUser({
        name: res.data.data.name,
        email: res.data.data.email,
        id: res.data.data.id,
      });
      navigate("/")
    } catch (err) {
      const serverErrors = err.response?.data;
      console.log('Error:', serverErrors);
  
      if (serverErrors && serverErrors.errors) {
        for (const field in serverErrors.errors) {
          setLogError(field, {
            type: 'server',
            message: serverErrors.errors[field][0], 
          });
        }
      } else if (serverErrors && serverErrors.msg) {
        
        console.error('Server error message:', serverErrors.msg);
       
        setLogError('server', {
          type: 'server',
          message: serverErrors.msg, 
        });
      } else {
        console.error('Unexpected error:', err.message);
      }
    }
  };
  /***************************************************************************************** */
  /************************************get all posts **************************************************** */
  const [posts,setPosts]=useState([]);
  const [page,setPage]=useState(1);
  const [hasMore,setHasMore]=useState(true);
  const [refersh,setRefresh]=useState(false);

  useEffect(
    ()=>{
      const onScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop + 100 >=
            document.documentElement.scrollHeight &&
          hasMore
        ) {
          setPage((prev) => prev + 1);
        }
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  , [hasMore])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/posts?page=${page}`);
        console.log("API Response:", res.data.data.data);
        const newPosts =res.data.data.data;
        if (newPosts.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prev) => {
            const existingIds = new Set(prev.map(post => post.id));
            const filteredNewPosts = newPosts.filter(post => !existingIds.has(post.id));
            return [...prev, ...filteredNewPosts];
          });
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [page,refersh]);
  /*********************************************Handel Delete******************************************************** */
  const handelDelete= async (id)=>{
    try{
     await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`);
     setPosts([]);       
     setPage(1);         
     setHasMore(true);    
     setRefresh(prev => !prev); 
    }
    catch (err) {
     console.error("Error deleting post:", err);
   }
  }
  /****************************************************************************************************** */
 /******************************************** handel create post************************************************************ */
 
      const {
        register:createPostregister,
        handleSubmit:handelCreatePostSubmit,
        formState: { errors: createPostErrors},
       
      } = useForm();
      const createPostOnSubmit = async (data) => {  // Make it async
        try {
          const formData = new FormData();
          formData.append('title', data.title);
          formData.append('body', data.body);
          
          formData.append('user_id', user.id)
          if (data.img && data.img.length > 0) {
            formData.append('img', data.img[0]);
          }
          console.log("data from create",user)
          
          await axios.post('http://localhost:8000/api/posts', formData);
          setPosts([]);       
          setPage(1);         
          setHasMore(true);    
          setRefresh(prev => !prev); 
          navigate("/");
        } catch (err) {
          console.error("Error creating post:", err);
        }
      };
 
 /************************************************************************************************************************* */
 /*******************************************Handel update******************************************************** */
 const [data,setData]=useState(null)
const handelUpdate=async(id)=>{
  try{
    const { data } = await axios.get(`http://127.0.0.1:8000/api/posts/${id}`);
    setData(data.data)
   }
   catch (err) {
    console.error("Error update post:", err);
  }
}
useEffect(() => {
  if (data) {
    navigate(`/posts/${data.id}/edit`);  
  }
}, [data]);
const {
  register: updatePostregister,
  handleSubmit: handelUpdatePostSubmit,
  formState: { errors: updatePostErrors },
  reset: resetUpdateForm, 
} = useForm();

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
  
  try {
    const formData = new FormData();
    formData.append('_method', 'PUT'); 
    formData.append('title', data.title);
    formData.append('body', data.body);
    if (data.img && data.img[0]) {
      formData.append('img', data.img[0]);
    }
    console.log(data)
    await axios.post(`http://localhost:8000/api/posts/${data.id}`, formData);
  setPosts([]);       
    setPage(1);         
    setHasMore(true);    
    setRefresh(prev => !prev); 
    navigate("/"); 
  } catch (err) { 
    console.error("Error creating post:", err);
  }
};
 /*************************************************************************************************** */
  return (
    <>
    
      <UserContext.Provider value={{ user, setUser }}>
      <Navbar />
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
       />}>
       </Route>
       <Route  path="/posts/create" element={<CreatePost
       
       register={createPostregister} 
       handleSubmit={handelCreatePostSubmit}  
       errors={createPostErrors} 
       onSubmit={createPostOnSubmit}  
      
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
      </UserContext.Provider>
   
    </>
  )
}
export default App
