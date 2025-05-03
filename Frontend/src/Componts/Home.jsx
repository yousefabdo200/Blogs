import React from 'react';
import { UserContext } from '../Context/UserContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Home({ allPosts }) {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {allPosts && allPosts.length > 0 ? (
        allPosts.map((post) => {
          const formattedDate = new Date(post.created_at).toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });

          return (
            <div
              key={post.id}
              className="bg-base-200 rounded-xl p-6 mb-6 shadow-lg flex flex-col md:flex-row"
            >
              <div className="md:flex-1 md:pr-6 order-2 md:order-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
                <p className="text-sm text-gray-500 mb-4">
                  By {user&&post.user_id===user.id?"You ":post.user.name} at {formattedDate}
                </p>
                <p className="mb-6 text-gray-700">
                  {post.body}
                </p>
                {user && (
                  <div className="flex gap-2">
                    <Link to={`/posts/${post.id}/edit`} className="btn btn-sm btn-primary">
                      Update
                    </Link>
                    <Link to={`/posts/${post.id}/delete`} className="btn btn-sm btn-secondary ">
                      Delete
                    </Link>
                  </div>
                )}
              </div>

              <div className="order-1 md:order-2 mb-4 md:mb-0 flex-shrink-0">
                <img
                  src={post.img}
                  className="w-full md:w-64 h-48 object-cover rounded-lg shadow"
                  alt={post.title}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="flex gap-2">
            <span className="loading loading-ball loading-xs"></span>
            <span className="loading loading-ball loading-sm"></span>
            <span className="loading loading-ball loading-md"></span>
            <span className="loading loading-ball loading-lg"></span>
          </div>
        </div>
      )}

      {user && (
        <Link
          to="/posts/create"
          className="fixed bottom-4 right-4 bg-primary text-white rounded-full shadow-lg p-4 text-2xl flex items-center justify-center hover:bg-primary-focus transition duration-300"
          title="Create New Post"
        >
          +
        </Link>
      )}
    </div>
  );
}
