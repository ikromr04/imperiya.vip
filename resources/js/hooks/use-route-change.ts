import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

type RouteChangeHandler = (pathname: string) => void;

export function useRouteChange(onRouteChange: RouteChangeHandler): void {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      onRouteChange(location.pathname);
      previousPath.current = location.pathname;
    }
  }, [location.pathname, onRouteChange]);
}
