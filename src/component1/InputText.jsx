import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import "../css_generated/InputNumber.css";

const operationAferAction = ["Return to base Bet", "Increase Bet by"];

const InputText = memo(( {InputProps} ) => {
  
  const [value, setValue] = useState(InputProps.value || '');
  const [index, setIndex] = useState(operationAferAction.indexOf(value));
 

  const handleKeyPress = (e) => {
    const isInvalidKey = e.key.length === 1  ||
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
    <div className={`input-number-parent relative w-full h-11 text-black hover:outline-[#0000FF4D] hover:outline-4` }>
      <input
        className={`input-number absolute w-full h-11 top-0 left-0 box-border rounded-xl pl-2 ${InputProps.disabled ? "text-[#FFFFFF99] bg-white_20 cursor-none contain-none select-none" : ""}`}
        type='text'
        value={operationAferAction[index]}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        disabled ={InputProps.disabled}
      />
      <div className='absolute right-2.5 top-1/2 transform -translate-y-1/2'>
        <div className='flex flex-col'>  
          <img
            className='cursor-pointer w-3 h-3'
            src='image/icon/up-arrow.svg'
            alt='Increase'
            onClick= {()=>!InputProps.disabled && setIndex((index+1)%2)}
          />
          <img
            className='cursor-pointer w-3 h-3'
            src='image/icon/down-arrow.svg'
            alt='Decrease'
            onClick={()=>!InputProps.disabled && setIndex((index-1)%2)}
          />
        </div>
      </div>
    </div>
  );
});

InputText.propTypes = {
  InputProps: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
  }).isRequired,
};

export default InputText;