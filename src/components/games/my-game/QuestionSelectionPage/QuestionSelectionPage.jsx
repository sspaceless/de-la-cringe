/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import MGContext from '../MGContext';
import { MessageTypes } from '../MGConfig';

function QuestionSelectionPage() {
  const { room, player, state } = useContext(MGContext);
  const canChoose = state.lastAnsweredUserId === player.id || state.host.id === player.id;

  const priceClick = (topic, price) => () => room.send(MessageTypes.QUESTION_SELECT, {
    theme: topic,
    price
  });

  const questionButtons = [];
  state.round.themes.forEach((prices, topic) => questionButtons.push(
    <div key={topic}>
      <h2>{topic}</h2>

      {prices.available.map((price) => (
        <input
          key={price}
          type="button"
          value={price}
          onClick={priceClick(topic, price)}
          disabled={canChoose ? 0 : 1}
        />
      ))}
    </div>
  ));

  return (
    <div>
      <h1>Round {state.round.num}</h1>

      {questionButtons}
    </div>
  );
}

export default QuestionSelectionPage;
