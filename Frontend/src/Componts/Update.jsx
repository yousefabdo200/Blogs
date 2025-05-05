import React from 'react'
import PostForm from './PostForm'

export default function Update({ handleSubmit, register, errors, onSubmit,handelOld,reset}) {
  return (
    <div>
         <h1 className="text-2xl font-semibold text-center my-4">Update Your Post</h1>
        <PostForm
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        handelOld={handelOld}
        reset={reset}
        />
    </div>
  )
}
