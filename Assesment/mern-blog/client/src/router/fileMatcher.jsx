import React from 'react';

export function getComponentForPath(pathname) {
  const path = pathname === '/' ? pathname : pathname.replace(/\/$/, '');
  
  if (path === '/') {
    return import('../pages/index.jsx');
  }
  
  const postsIdMatch = path.match(/^\/posts\/([^/]+)$/);
  if (postsIdMatch) {
    if (postsIdMatch[1] !== 'new') {
      return import('../pages/posts/[id].jsx').then(module => {
        const id = postsIdMatch[1];
        const Component = module.default;
        return {
          default: (props) => <Component {...props} id={id} />
        };
      });
    }
  }

  const routeMap = {
    '/posts/new': '../pages/posts/new.jsx'
  };

  if (routeMap[path]) {
    return import(routeMap[path]);
  }

  return import('../pages/404.jsx').catch(() => {
    return {
      default: () => <div>Page Not Found</div>
    };
  });
}