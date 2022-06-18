import React, { useContext, useState } from 'react';
import MGContext from '../MGContext';
import ProgressBar from '../ProgressBar/ProgressBar';
import QuestionInfo from './QuestionInfo/QuestionInfo';
import { Settings } from '../MGConfig';
import styles from './RoundResultsPage.module.css';

function RoundResultsPage() {
  const { state } = useContext(MGContext);
  const questions = state.round.questions;
  const players = state.players;

  const [amount, setAmount] = useState(0);
  const questionsComp = questions.slice(0, amount);

  if (amount < questions.length) {
    setTimeout(() => setAmount((x) => x + 1), 750);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.questionsWrapper}>
        <div className={styles.questionList}>
          {questionsComp.map((q, i) => (
            <QuestionInfo
              key={i}
              text={q.text}
              answer={q.answer}
              theme={q.theme}
              price={q.price}
              avatar={q.answeredUserId ? players[q.answeredUserId].avatar : undefined}
            />
          ))}
        </div>
      </div>

      <div className={styles.progress}>
        <p className={styles.progressText}>Переміщення до міжзоряної планети (екстра-питання)...</p>

        <ProgressBar
          generalTime={Settings.TIME_FOR_RESULTS_SHOWING}
          until={state.showingResultsUntil}
          height="35px"
          color="var(--pink)"
        />
      </div>
    </div>
  );
}

export default RoundResultsPage;
