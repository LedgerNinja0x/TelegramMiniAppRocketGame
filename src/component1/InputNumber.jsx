import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import "../css_generated/InputNumber.css";

const InputNumber = memo(({ InputProps }) => {
  const [value, setValue] = useState(InputProps.value || '');

  const handleKeyPress = (e) => {
    const allowedChars = '0123456789.';
    const isInvalidKey = (e.key.length === 1 && !allowedChars.includes(e.key)) ||
                         (e.key === '.' && value.includes('.'));

    if (isInvalidKey) {
      e.preventDefault();
    }

    if (e.key === ',' && !value.includes('.')) {
      e.preventDefault();
      const newValue = parseFloat(value).toFixed(1).slice(0, -1);
      setValue(newValue);
      InputProps.onChange && InputProps.onChange({ target: { value: newValue } });
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    InputProps.onChange && InputProps.onChange({ target: { value: newValue } });
  };

  const incrementValue = () => {
    const newValue = (parseFloat(value) || 0) + 1;
    setValue(newValue);
    InputProps.onChange && InputProps.onChange({ target: { value: newValue } });
  };

  const decrementValue = () => {
    const newValue = (parseFloat(value) || 0) - 1;
    setValue(newValue);
    InputProps.onChange && InputProps.onChange({ target: { value: newValue } });
  };

  return (
    <div className='input-number-parent relative w-full h-11 text-black hover:outline-[#0000FF4D] hover:outline-4'>
      <input
        className='input-number absolute w-full h-11 top-0 left-0 box-border rounded-xl pl-2'
        type='number'
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <div className='absolute right-2.5 top-1/2 transform -translate-y-1/2'>
        <div className='flex flex-col'>  
          <img
            className='cursor-pointer w-3 h-3'
            src='image/icon/up-arrow.svg'
            alt='Increase'
            onClick={incrementValue}
          />
          <img
            className='cursor-pointer w-3 h-3'
            src='image/icon/down-arrow.svg'
            alt='Decrease'
            onClick={decrementValue}
          />
        </div>
      </div>
    </div>
  );
});

InputNumber.propTypes = {
  InputProps: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
  }).isRequired,
};

export default InputNumber;