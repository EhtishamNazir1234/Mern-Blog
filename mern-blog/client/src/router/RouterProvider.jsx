import { lazy, Suspense } from "react";
import { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/index";

const NewPost = lazy(() => import("../pages/posts/new"));
const Post = lazy(() => import("../pages/posts/[id]"));

const RouterContext = createContext({
  navigate: () => {},
  currentPath: "",
});

export const useRouter = () => useContext(RouterContext);

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
  };

  return (
    <RouterContext.Provider value={{ navigate, currentPath }}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/new" element={<NewPost />} />
            <Route path="/posts/:id" element={<Post />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </RouterContext.Provider>
  );
}
