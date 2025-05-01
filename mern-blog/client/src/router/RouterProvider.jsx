import { createContext, useContext, useState, useEffect } from 'react';
import { getComponentForPath } from './fileMatcher.jsx';

const RouterContext = createContext({
  navigate: () => {},
  currentPath: '',
});

export const useRouter = () => useContext(RouterContext);

export function RouterProvider({ children }) {

    const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [CurrentComponent, setCurrentComponent] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);

  
  const navigate = (to) => {
    
    window.history.pushState({}, '', to);
    
    setCurrentPath(to);
  };

  
  useEffect(() => {
    setIsLoading(true);
    
    
    getComponentForPath(currentPath)
      .then((module) => {
        setCurrentComponent(() => module.default);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading component:', error);
        setIsLoading(false);
      });
  }, [currentPath]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };


    window.addEventListener('popstate', handlePopState);

   
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  
  return (
    <RouterContext.Provider value={{ navigate, currentPath }}>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        CurrentComponent && <CurrentComponent />
      )}
    </RouterContext.Provider>
  );
}