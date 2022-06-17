import { useState, useCallback } from 'react';

function useForceUpdate() {
  const [, setVal] = useState(0);

  return useCallback(() => setVal((v) => v + 1), [setVal]);
}

export default useForceUpdate;
