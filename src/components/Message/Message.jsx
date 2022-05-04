import React from 'react';
import BlurWrapper from '../BlurWrapper/BlurWrapper';
import PropTypes from 'prop-types';

function MsgWindow({ message, timeout = 0, onClose }) {

}

MsgWindow.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  timeout: PropTypes.number
};

MsgWindow.defaultProps = { timeout: 0 };

export default MsgWindow;
