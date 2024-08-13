/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { memo, useState } from 'react'
import "../css_generated/DropDown.css";

export default memo(function DropDown ({ label, content, onChange }) {
  const [showDropDown, setShowDropDown] = useState(false)
  const [selected, setSelected] = useState(label)
  const [list, setList] = useState(content)

  return (
    <div
      onClick={() => setShowDropDown(!showDropDown)}
      onMouseLeave={() => setShowDropDown(false)}
      className={`dropdown ${showDropDown ? 'show-dropdown' : ''}`}>
      <span className='d-d'>{selected}</span>
      <img src='images/input-number-arrow-down.png'/>
      <div className='dropdown-content'>
        {list.map(i => <p onClick={e => {
          setList([...list.filter(i => i !== e.target.innerText), selected])
          setSelected(e.target.innerText)
          onChange(e.target.innerText)
        }}>{i}</p>)}
      </div>
    </div>
  )
})
