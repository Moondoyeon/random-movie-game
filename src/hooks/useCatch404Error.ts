import { useEffect, useState } from 'react';
import { URL } from 'constants/url';

function useCatch404Error() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const is404Error = () => {
    return !Object.values(URL).includes(currentPath);
  };

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    if (is404Error()) throw new Error('404');
  }, [window.location.pathname]);

  return { is404Error };
}

export default useCatch404Error;
