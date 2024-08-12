import React from "react";

const PannelScore = ({img, text2, text3}) =>{
  return (
    <div className="flex flex-row bg-white_20 rounded-lg justify-between gap-2 py-1 px-[10.5px] w-24 h-7 text-base leading-5 font-roboto text-white">
      <div className="flex gap-1 text-white">
        <img src = {img} width = {20} height={20} className="w-5 h-5" alt="scoreImg" />
        <p className="text-sm leading-5 font-normal">{text2}</p>
      </div>
      <p className=" font-medium ">
        {text3}
      </p>
    </div>
  )
}

export default PannelScore;