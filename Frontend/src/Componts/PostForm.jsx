import { useEffect } from "react";

export default function PostForm({ 
  handleSubmit, 
  register, 
  errors, 
  onSubmit,
  handelOld = null,  
  reset 
}) {
  useEffect(() => {
   
    if (handelOld?.id) {
      
      reset({
        id: handelOld.id,
        title: handelOld.title || '',
        body: handelOld.body || '',
       
      });
    } else {
      reset({
        title: '',
        body: '',
      });
    }
  }, [handelOld, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-base-100"
    >
      {handelOld?.id && (
        <input type="hidden" {...register('id')} />
      )}
      
      <label htmlFor="PostTitle" className="label">Post Title</label>
      <input
        type="text"
        id="PostTitle"
        placeholder="Enter post title"
        className="input input-bordered w-full"
        {...register('title', { 
          required: 'Title is required', 
          maxLength: { value: 20, message: 'Max length is 20 characters' } 
        })}
      />
      {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}

      <label htmlFor="PostBody" className="label">Post Body</label>
      <textarea
        id="PostBody"
        placeholder="Enter post body"
        className="textarea textarea-bordered w-full"
        {...register('body', { 
          required: 'Body is required', 
          maxLength: { value: 2000, message: 'Max length is 2000 characters' } 
        })}
      />
      {errors.body && <span className="text-red-500 text-sm">{errors.body.message}</span>}

      <label htmlFor="image" className="label">Post Image</label>
      <input
        id="image"
        type="file"
        className="file-input file-input-bordered w-full"
        {...register('img', {
          validate: {
            isImage: (files) =>
              !files?.[0] ||  
              ['image/jpeg', 'image/png', 'image/webp'].includes(files[0].type) ||
              'Only image files (jpeg, png, webp) are allowed',
          },
        })}
      />
      {errors.img && <span className="text-red-500 text-sm">{errors.img.message}</span>}

      <button type="submit" className="btn btn-primary mt-4">
        {handelOld?.id ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}