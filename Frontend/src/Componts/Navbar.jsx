import { NavLink ,Link } from 'react-router-dom';

export default function Navbar({handleLogout}) {
  const user= JSON.parse(localStorage.getItem('user'));
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <NavLink
                  className={({ isActive }) => (isActive ? 'text-primary font-bold' : '')}
                  to="/"
                >
                  <p className="text-2xl">Blogs <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg></p>
                  

                </NavLink>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to="/"><p className="text-2xl font-bold">Share your blogs now</p></Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {!user ? (
            <>
              <li>
                <NavLink
                  className={({ isActive }) => `text-2xl ${isActive ? 'text-primary font-bold' : ''}`}
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                 className={({ isActive }) => `text-2xl ${isActive ? 'text-primary font-bold' : ''}`}
                  to="/signup"
                >
                  Signup
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={()=>{handleLogout()}} className="text-1xl btn btn-primary">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
