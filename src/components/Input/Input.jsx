import React, { useState } from 'react';
import propTypes from 'prop-types';

function Input({ initialValue, onChange, validator, ...props }) {
  const [value, setValue] = useState(props.initialValue);

  const onInputChange = (event) => {
    const { curValue } = event.target;

    if (validator && !validator(curValue)) {
      return;
    }

    setValue(curValue);
    onChange(curValue);
  };

  return <input value={value} onChange={onInputChange} {...props} />;
}

Input.propTypes = {
  initialValue: propTypes.string,
  onChange: propTypes.func,
  validator: propTypes.func
};

Input.defaultProps = {
  initialValue: '',
  onChange: undefined,
  validator: undefined
};

export default Input;
