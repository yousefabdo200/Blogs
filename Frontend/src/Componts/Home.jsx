import { Link } from 'react-router-dom';
import { Pencil, Trash2, Plus } from 'lucide-react'; // Add icons for buttons

export default function Home({ allPosts, handelDelete, handelUpdate }) {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      {allPosts && allPosts.length > 0 ? (
        allPosts.map((post) => {
          const formattedDate = new Date(post.created_at).toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });

          const isOwner = user && post.user_id === user.id;

          return (
            <div
              key={post.id}
              className="bg-white rounded-2xl p-6 mb-8 shadow-md border hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 order-2 md:order-1">
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  <div className="text-sm text-gray-500 mb-4">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">
                      By {isOwner ? 'You' : post.user.name} &middot; {formattedDate}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{post.body}</p>

                  {isOwner && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handelUpdate(post.id)}
                        className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                      >
                        <Pencil size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handelDelete(post.id)}
                        className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="order-1 md:order-2 w-full md:w-64 h-48 md:h-auto">
                  <img
                    src={post.img}
                    className="w-full h-full object-cover rounded-xl shadow"
                    alt={post.title}
                  />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      )}

      {user && (
        <Link
          to="/posts/create"
          className="fixed bottom-6 right-6 bg-primary text-white rounded-full shadow-xl p-4 text-3xl hover:bg-primary-focus transition duration-300"
          title="Create New Post"
        >
          <Plus size={24} />
        </Link>
      )}
    </div>
  );
}
