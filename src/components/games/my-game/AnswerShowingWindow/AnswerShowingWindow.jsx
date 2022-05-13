import React from 'react';
import PropTypes from 'prop-types';

function AnswerShowingPage({ answer, description = null }) {
  return (
    <>
      Правильный ответ: <h2>{answer}</h2>

      {description
        && <p>{description}</p>}
    </>
  );
}

AnswerShowingPage.propTypes = {
  answer: PropTypes.string.isRequired,
  description: PropTypes.string
};

AnswerShowingPage.defaultProps = { description: null };

export default AnswerShowingPage;
