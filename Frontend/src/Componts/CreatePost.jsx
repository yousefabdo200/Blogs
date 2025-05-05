import React, { useContext } from 'react';  
import PostForm from './PostForm';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function CreatePost({ handleSubmit, register, errors, onSubmit, reset }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
 
  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center my-4">What's on your mind?</h1>
      <PostForm
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        handelOld={null}
        reset={reset}
      />
    </div>
  );
}