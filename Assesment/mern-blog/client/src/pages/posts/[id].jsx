import { useState, useEffect } from 'react';
import { useRouter } from '../../router/RouterProvider';
import '../../styles/Post.css';

export default function Post({ id }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { navigate } = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/posts/${id}`);
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load the post. It may not exist or there was a server error.');
        setLoading(false);
      }
    };
    
    if (id) {
      fetchPost();
    }
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="post-container">
      <button className="back-button" onClick={handleBack}>
        ← Back to Posts
      </button>

      {loading ? (
        <div className="loading">Loading post...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : post ? (
        <article className="post-content">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span className="post-author">By: {post.author || 'Anonymous'}</span>
            <span className="post-date">{formatDate(post.createdAt)}</span>
          </div>
          <div className="post-body">
            {post.body.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      ) : (
        <div className="error">Post not found</div>
      )}
    </div>
  );
}