import React from 'react';

export default function Signup({ handleSubmit, register, errors, onSubmit }) {
  console.log (errors)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-base-100">
      
      <label htmlFor="UserName" className="label">Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        id="UserName"
        {...register("name", { required: "Name is required" })}
        className="input input-bordered w-full"
      />
      {errors?.name && <p className="text-red-500">{errors.name.message}</p>}

      <label htmlFor="UserEmail" className="label">Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        id="UserEmail"
        {...register("email", { required: "Email is required" })}
        className="input input-bordered w-full"
      />
      {errors?.email && <p className="text-red-500">{errors.email.message}</p>}

      <label htmlFor="UserPassword" className="label">Password</label>
      <input
        type="password"
        placeholder="Enter a strong password"
        id="UserPassword"
        {...register("password", { required: "Password is required", minLength: 6 })}
        className="input input-bordered w-full"
      />
      {errors?.password && <p className="text-red-500">{errors.password.message}</p>}

      <label htmlFor="UserConfirmPassword" className="label">Confirm Password</label>
      <input
        type="password"
        placeholder="Repeat the password"
        id="UserConfirmPassword"
        {...register("password_confirmation", { required: "Confirm your password" })}
        className="input input-bordered w-full"
      />
      {errors?.password_confirmation && <p className="text-red-500">{errors.password_confirmation.message}</p>}

      {errors?.server && <p className="text-red-500">{errors.server.message}</p> }

      <button type="submit" className="btn btn-primary mt-4">Sign Up</button>
    </form>
  );
}
