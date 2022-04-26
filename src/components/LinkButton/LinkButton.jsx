// https://stackoverflow.com/a/49439893/12438201

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function LinkButton(props) {
  const {
    to,
    onClick = undefined,
    ...rest
  } = props;

  const navigate = useNavigate();

  return (
    <button
      type="button"
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        // eslint-disable-next-line no-unused-expressions
        onClick && onClick(event);
        navigate(to);
      }}
    />
  );
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

LinkButton.defaultProps = { onClick: undefined };

export default LinkButton;
