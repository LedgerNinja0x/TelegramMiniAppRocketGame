import React from "react";
import SectionScore from "../component/molecules/sectionScore";
import SectionRocket from "../component/molecules/sectionRocket";
import SectionControl from "../component/molecules/sectionControl";
import '../css_generated/Index.css'

const MainPage = () =>{
  return(
    <div className="flex-auto flex flex-col w-full h-full justify-between">
      <SectionScore/>
      <SectionRocket/>
      <SectionControl/> 
    </div>
  )
}
export default MainPage;