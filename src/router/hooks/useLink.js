import { useEffect } from 'react';
import { useHistory } from 'react-router';

export const useLink = (to, cb) => {
  const history = useHistory();

  const onLocationChange = (e) => {
    if ((e.pathname || '/') === to) {
      cb();
    }
  };

  useEffect(() => {
    const unlisten = history.listen(onLocationChange);

    onLocationChange(history.location);

    return () => unlisten();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
};
