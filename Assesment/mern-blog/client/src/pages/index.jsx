import { useState, useEffect } from 'react';
import { useRouter } from '../router/RouterProvider';
import '../styles/Home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { navigate } = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/posts`);
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const handleCreatePost = () => {
    navigate('/posts/new');
  };
// Update the fetch URL
const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/posts`);// Update the fetch URL
const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/posts`);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="home-container">
      <header>
        <h1>MERN Blog</h1>
        <button className="create-post-btn" onClick={handleCreatePost}>
          Create New Post
        </button>
      </header>

      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="posts-list">
          {posts.length === 0 ? (
            <div className="no-posts">
              <p>No posts yet! Click "Create New Post" to get started.</p>
            </div>
          ) : (
            posts.map((post) => (
              <article key={post._id} className="post-card" onClick={() => navigate(`/posts/${post._id}`)}>
                <h2>{post.title}</h2>
                <div className="post-meta">
                  <span className="post-author">By: {post.author || 'Anonymous'}</span>
                  <span className="post-date">{formatDate(post.createdAt)}</span>
                </div>
                <p className="post-snippet">{post.body.substring(0, 150)}...</p>
                <div className="read-more">Read more →</div>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}