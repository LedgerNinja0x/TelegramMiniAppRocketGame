import React, { useEffect, useState } from "react";
import "../css_generated/Loading.css"
import { Img } from "../assets/image";

const Loading = ({setLoading}) =>{
  const [progress, setProgress] = useState(0);
  const [progresstimer, setProgreesstimer] =useState();
  
  useEffect(()=>{
    setProgreesstimer(setTimeout(()=>setProgress(progress+1),10));
  },[progress]);
  if(progress==100) {
    clearInterval(progresstimer);
    setLoading(true);
  };
  return (
    <div className="loading h-screen bg-center bg-cover">

      <div className="flex flex-col items-center w-full bottom-3 fixed gap-3.5" >
        <img src = {Img.loadingTitle} />
        <p className="text-[#1E5779] text-sm leading-4">Become a God of Space.<br/>
        Play and get rewards.</p>
        <div className="flex w-full flex-col gap-1.5 items-center">
          <p className="text-[#1E5779] text-[9px] leading-[10px]">LOADING...</p>
          <div className="bg-white h-1.5 w-1/3 rounded-md">
            <div className={`bg-[#0088CC] relative h-1.5 rounded-full `} style={{ width: `${progress}%` }} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Loading;