import React, { useContext } from 'react';
import MGContext from '../MGContext';
import Timer from '../../../Timer/Timer';

function StartingCountPage() {
  const { state } = useContext(MGContext);

  return (
    <Timer untilDate={state.startingUntil} format="s" />
  );
}

export default StartingCountPage;
