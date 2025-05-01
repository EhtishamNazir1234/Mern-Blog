import { createContext, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/index';
import NewPost from '../pages/posts/new';
import Post from '../pages/posts/[id]';

const RouterContext = createContext({
  navigate: () => {},
  currentPath: '',
});

export const useRouter = () => useContext(RouterContext);

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
  };

  return (
    <RouterContext.Provider value={{ navigate, currentPath }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </RouterContext.Provider>
  );
}