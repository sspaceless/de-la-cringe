/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import MGContext from '../MGContext';
import { MessageTypes, Stages } from '../MGConfig';
import AnswerShowingWindow from './AnswerShowingWindow/AnswerShowingWindow';
import AnswerAcceptWindow from './AnswerAcceptWindow/AnswerAcceptWindow';
import AnsweringWindow from './AnsweringWindow/AnsweringWindow';
import ProgressBar from '../ProgressBar/ProgressBar';
import MediaContent from './MediaContent/MediaContent';
import Orbit from '../QuestionSelectionPage/Orbit/Orbit';
import QuestionWindow from './QuestionWindow/QuestionWindow';
import config from '../../../../config.json';
import styles from './QuestionShowingPage.module.css';
import Rockets from './Rockets/Rockets';

function QuestionShowingPage() {
  const { player, room, state, isHost, stage } = useContext(MGContext);

  const [answer, setAnswer] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [acceptedVal, setAcceptedVal] = useState(false);

  const answeringUserId = state.answeringClientId;
  const isAnswered = state.curQuestionAnswers.includes(player.id);

  if (stage === Stages.QUESTION_SHOWING) {
    if (isAccepted) setIsAccepted(false);
  }

  useEffect(() => room.onMessage(MessageTypes.ANSWER_REQUEST_ACCEPT, (options) => {
    if (isHost) {
      setAnswer(options.answer);
    }
  }), [room, player, isHost]);

  useEffect(() => room.onMessage(MessageTypes.ANSWER_DECISION, ({ accepted }) => {
    setIsAccepted(true);
    setAcceptedVal(accepted);
  }));

  const canAnswer = !isHost && !acceptedVal && !isAnswered;

  const answerDecisionStyle = isAccepted && stage === Stages.ANSWER_WAITING
    ? (acceptedVal ? styles.accepted : styles.rejected)
    : '';

  let popupWindow;

  const [pageHeight, setPageHeight] = useState(document.getElementById('page').offsetHeight);
  const [pageWidth, setPageWidth] = useState(document.getElementById('page').offsetWidth);

  useEffect(() => {
    const setSize = () => {
      setPageHeight(document.getElementById('page').offsetHeight);
      setPageWidth(document.getElementById('page').offsetWidth);
    };

    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, []);

  let cls = '';

  if (stage === Stages.QUESTION_FILE_SHOWING) {
    const q = state.round.curQuestion;

    if (q.fileType === 'video' || q.fileType === 'audio') {
      cls = styles.left;
    }

    popupWindow = (
      <div>
        <MediaContent
          type={q.fileType}
          url={q.fileUrl}
          maxWidth={pageWidth - 60}
          maxHeight={pageHeight - 105}
        />

        <ProgressBar
          until={state.fileShowingWaitUntil}
          generalTime={state.round.curQuestion.fileDuration}
          height="30px"
          color="var(--pink)"
          backwards
        />
      </div>
    );
  } else if (answeringUserId && stage === Stages.ANSWER_WAITING && !isHost) {
    popupWindow = (
      <AnsweringWindow
        answeringPlayer={state.players.get(answeringUserId)}
        isAnswering={answeringUserId === player.id}
      />
    );
  } else if (stage === Stages.ANSWER_SHOWING) {
    popupWindow = (
      <AnswerShowingWindow
        answer={state.round.curQuestion.answer}
      />
    );
  } else if (answeringUserId && answer) {
    popupWindow = (
      <AnswerAcceptWindow
        answer={answer}
        answeringPlayer={state.players.get(answeringUserId)}
      />
    );
  }

  const r = Math.min(pageWidth, pageHeight) / 3.1;

  const orbit = {
    width: r * 2.7,
    height: r * 2.7,
    angle: 0
  };

  const [rotation, setRotation] = useState(0);

  const x = r * 1.35 * Math.cos(rotation);
  const y = r * 1.35 * Math.sin(rotation);
  const rocketsPos = {
    transform: `translateX(calc(${x}px - 50%)) translateY(calc(${y}px - 50%)) rotateZ(${rotation}rad)`
  };

  const rotation2 = rotation - Math.PI / 5;
  const x2 = r * 1.35 * Math.cos(rotation2);
  const y2 = r * 1.35 * Math.sin(rotation2);
  const fuelPos = {
    transform: `translateX(calc(${x2}px - 50%)) translateY(calc(${y2}px - 50%)) rotateZ(${rotation2 * 3}rad)`
  };

  useEffect(() => {
    const interval = setInterval(() => setRotation((rot) => rot - Math.PI / 1000), 10);

    return () => clearInterval(interval);
  }, [setRotation]);

  return (
    <div className={styles.wrapper}>
      <Orbit orbit={orbit} dashed>
        <img
          className={styles.center}
          width={r * 2}
          src={`${config.apiUrl}/files/games/my-game/planet.svg`}
          alt="Planet"
        />

        <QuestionWindow canAnswer={canAnswer} radius={r} angle={Math.PI / 1.5} />

        <Rockets style={rocketsPos} />

        <div className={[styles.fuel, styles.center].join(' ')} style={fuelPos}>
          {state.round.curQuestion.price}
        </div>
      </Orbit>

      <div className={styles.popup} hidden={popupWindow ? 0 : 1}>
        <div id="popup" className={[styles.popupWindow, answerDecisionStyle, cls].join(' ')}>
          {popupWindow}
        </div>
      </div>
    </div>
  );
}

export default QuestionShowingPage;
