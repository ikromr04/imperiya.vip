import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useRouteChange = (callback: (pathname: string) => void) => {
  const location = useLocation();

  useEffect(() => {
    callback(location.pathname);
  }, [location.pathname, callback]);
};

export default useRouteChange;
