import React from 'react';

export default function Home({ allPosts }) {
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
              key={post.id} // Always add a key when mapping
              className="bg-base-200 rounded-xl p-6 mb-6 shadow-lg flex flex-col md:flex-row"
            >
              <div className="md:flex-1 md:pr-6 order-2 md:order-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
                <p className="text-sm text-gray-500 mb-4">
                  By {post.user.name} at {formattedDate}
                </p>
                <p className="mb-6 text-gray-700">
                  {post.body}
                </p>
                <button className="btn btn-primary btn-sm md:btn-md">
                  Get Started
                </button>
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
    </div>
  );
}