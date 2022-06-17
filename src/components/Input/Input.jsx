import React, { useState } from 'react';
import propTypes from 'prop-types';

function Input({ initialValue = '', onChange = undefined, validator = undefined, ...props }) {
  const [value, setValue] = useState(initialValue);

  const onInputChange = (event) => {
    const { value: curValue } = event.target;

    if (validator && !validator(curValue)) {
      return;
    }

    setValue(curValue);

    if (onChange) {
      onChange(curValue);
    }
  };

  return <input type="text" value={value} onChange={onInputChange} {...props} />;
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
