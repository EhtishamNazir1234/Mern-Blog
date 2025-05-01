const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fetchPosts = async () => {
  try {
    const response = await fetch(`${baseURL}/api/posts`);
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};