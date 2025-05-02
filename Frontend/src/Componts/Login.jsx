export default function Login({ handleSubmit, register, errors, onSubmit }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-base-100">
      <label htmlFor="UserEmail" className="label">Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        id="UserEmail"
        {...register("email", { required: "Email is required" })}
        className="input input-bordered w-full"
      />
      {errors?.email && <p className="text-red-500">{errors.email.message || errors.email}</p>}

      <label htmlFor="UserPassword" className="label">Password</label>
      <input
        type="password"
        placeholder="Enter a strong password"
        id="UserPassword"
        {...register("password", { required: "Password is required", minLength: 6 })}
        className="input input-bordered w-full"
      />
      {errors?.password && <p className="text-red-500">{errors.password.message || errors.password}</p>}

      {errors?.server && <p className="text-red-500">{errors.server.message}</p>}

      <button type="submit" className="btn btn-primary mt-4">Login</button>
    </form>
  );
}
