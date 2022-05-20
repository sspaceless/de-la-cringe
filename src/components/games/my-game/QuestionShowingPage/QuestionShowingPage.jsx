/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState, useRef } from 'react';
import MGContext from '../MGContext';
import { MessageTypes, Stages } from '../MGConfig';
import AnswerShowingWindow from '../AnswerShowingWindow/AnswerShowingWindow';
import AnswerAcceptWindow from '../AnswerAcceptWindow/AnswerAcceptWindow';
import AnsweringWindow from '../AnsweringWindow/AnsweringWindow';

function QuestionShowingPage() {
  const { player, room, state, isHost, stage } = useContext(MGContext);

  const [isAnswering, setIsAnswering] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [answeringUserId, setAnsweringUserId] = useState(null);
  const [isAccepted, setIsAccepted] = useState();
  const [acceptedVal, setAcceptedVal] = useState(false);

  const prevStageRef = useRef(stage);

  if ((stage === Stages.QUESTION_SHOWING && prevStageRef.current === Stages.ANSWER_WAITING)
    || stage === Stages.ANSWER_SHOWING) {
    if (isAnswering) setIsAnswering(false);
    if (answer) setAnswer(null);
    if (answeringUserId) setAnsweringUserId(null);

    if (isAccepted) setIsAccepted(false);
  }

  prevStageRef.current = stage;

  useEffect(() => room.onMessage(MessageTypes.ANSWER_REQUEST_ACCEPT, (options) => {
    setAnsweringUserId(options.clientId);

    if (options.clientId === player.id) {
      setIsAnswering(true);
      setIsAnswered(true);
    } else if (isHost) {
      setAnswer(options.answer);
    }
  }), [room, player, isHost]);

  useEffect(() => room.onMessage(MessageTypes.ANSWER_DECISION, ({ accepted }) => {
    setIsAccepted(true);
    setAcceptedVal(accepted);
  }), [room, player, isHost]);

  const requestAnswer = () => room.send(MessageTypes.ANSWER_REQUEST);

  const answerDecisionStyle = isAccepted ? (acceptedVal ? 'Accepted' : 'Rejected') : '';

  return (
    <div>
      <h3>{`${state.round.curQuestion.theme}  ${state.round.curQuestion.price}`}</h3>

      <p>{state.round.curQuestion.text}</p>

      {!isHost && !isAnswered
        && <input type="button" value="Answer" onClick={requestAnswer} />}

      <div className={answerDecisionStyle}>
        {answeringUserId && state.answerWaitUntil && !isHost
          && (
            <AnsweringWindow
              answeringPlayer={state.players.get(answeringUserId)}
              isAnswering={isAnswering}
            />
          )}

        {answer
          && (
            <AnswerAcceptWindow
              answer={answer}
              answeringPlayer={state.players.get(answeringUserId)}
            />
          )}

        {stage === Stages.ANSWER_SHOWING && state.curAnswer
          && (
            <AnswerShowingWindow
              answer={state.curAnswer}
              description={state.round.curQuestion.description}
            />
          )}
      </div>
    </div>
  );
}

export default QuestionShowingPage;
