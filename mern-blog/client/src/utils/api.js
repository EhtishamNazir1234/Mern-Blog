export const getApiUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    console.warn('VITE_API_URL is not defined in environment variables');
    return 'http://localhost:5000'; 
  }
  return apiUrl;
};

export const getBasePath = () => {
  return import.meta.env.DEV ? '' : '/mern-blog';
};