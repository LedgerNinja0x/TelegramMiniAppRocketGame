/* eslint-disable react/prop-types */
import React, { memo } from 'react'

export default memo(function Checkbox (props) {
  return (
    <label className='checkbox'>
      <input type="checkbox" {...props}/>
      <span></span>
    </label>
  )
})
