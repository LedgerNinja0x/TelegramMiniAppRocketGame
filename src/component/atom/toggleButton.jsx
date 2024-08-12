import React from "react";

const ToggleButton = ({
  className, disabled, bgColor, textColor, 
  text, img, setSlot, fgColor
    }) =>{
  return (
    <div className={`${className} ${(disabled) ?(bgColor+" "+textColor)
      :(fgColor+" bg-transparent text-[#ACC1D9]")} 
      flex flex-col text-center items-center rounded-lg text-[9px] font-medium w-[62px] h-[50px] leading-[10px] justify-center cursor-pointer `}
      onClick={()=>setSlot(text)}>
      <img src={img} width={24} height={24} alt = "Toggle Button" />
      <p>{text}</p>    
    </div>
  )
}
export default ToggleButton;