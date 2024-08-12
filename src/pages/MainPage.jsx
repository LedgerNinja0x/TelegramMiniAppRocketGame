import React from "react";
import SectionScore from "../component/molecules/sectionScore";
import SectionRocket from "../component/molecules/sectionRocket";
import SectionControl from "../component/molecules/sectionControl";
import '../css_generated/Index.css'

const MainPage = () =>{
  return(
    <div className="flex flex-col w-full gap-4 ">
      <SectionScore/>
      <SectionRocket/>
      <SectionControl/> 
    </div>
  )
}
export default MainPage;