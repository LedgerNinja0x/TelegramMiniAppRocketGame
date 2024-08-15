import { useState, useCallback } from "react";
import TabButton from "../component/atom/tab-button";
import { avatar } from "../assets/avatar/index.js";
import PannelScore from "../component/atom/PannelScore";
import { Img } from "../assets/image"; 
import FriendRanking from "../component/atom/friend-ranking.jsx";
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "../css_generated/userInfo.css"
import { Button } from "bootstrap";
import ArrowRight from "../component/svg/arrow-right.jsx";
import ArrowLeft from "../component/svg/arrow-left.jsx";

const fadeAnimationHandler = (props, state) => {
  const transitionTime = props.transitionTime + 'ms';
  const transitionTimingFunction = 'ease-in-out';

  let slideStyle = {
      position: 'absolute',
      display: 'block',
      zIndex: -2,
      minHeight: '100%',
      opacity: 0,
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      transitionTimingFunction: transitionTimingFunction,
      msTransitionTimingFunction: transitionTimingFunction,
      MozTransitionTimingFunction: transitionTimingFunction,
      WebkitTransitionTimingFunction: transitionTimingFunction,
      OTransitionTimingFunction: transitionTimingFunction,
  };

 

  return {
      slideStyle
  };
};

const statsList = [
    {
        src: "coin-y.svg",
        amount: "10,968.67",
        id: 1
    },
    {
        src: "ton.svg",
        amount: "679.9",
        id: 2
    }
]

const friendData = [
    {
        url: "anna.svg",
        name: "Anna Brown",
        label: "Beginner",
        rate: 1,
        id: 1808944,
        ranking: 1
    },
    {
        url: "john.svg",
        name: "John Smith",
        label: "Beginner",
        rate: 1,
        id: 1808935,
        ranking: 2
    }
]

const rankingData = [ 
  "Beginner", "Pilot", "Explorer", "Astronaut",
  "Captain", "Commander", "Admiral", "Legend", 
  "Master of the Universe", "God of Space"
]

const UserInfo = () => {
    const [ tabId, setTabId ] = useState(1);
    const [ rankingIndex, setRankingIndex] =useState(0);
    const rankingItems = rankingData.map((data,index)=>{
      return(
        <div key={index}>
           <p><span className="text-blueFaded">Ranking : </span>{data}</p>
        </div>
        
      )
    })
    const rankingNext = () => {
      setRankingIndex ((rankingIndex + 1) % rankingData.length);
    }
    const rankingPrev = () => {
      setRankingIndex((rankingIndex - 1) % rankingData.length);
    }

  return (
    <div className="flex flex-col gap-4 items-center text-white text-base">
      <div className="font-semibold">Sergei Kovtun</div>
      <TabButton tabList={statsList} tabNo={tabId} setTabNo={setTabId} />
      <div className="flex flex-col gap-4 overflow-auto w-full " style={{height: "calc(100vh - 200px)"}}>
        <div className="flex gap-[41px] text-blueFaded text-sm">
            <div>Level <span className="text-white">1/10</span></div>
            <div>Rank <span className="text-white">1808944</span></div>
        </div>
        <div className="flex flex-col items-center gap-2">
            <img src={avatar.avatar1} width="200px" height="200px" className="max-w-[200px] h-[200px]" alt="avatar" />
            <div className="rounded-[8px] border-[3px] border-[#56D0EA] py-2 w-[200px] text-center text-white">
             { rankingData[rankingIndex] }
            </div>
        </div>
        <div className="flex gap-4 w-full">
            <div className="w-1/2">
              <PannelScore img={Img.agree} text2={"Won"} text3={"48"} className="w-full py-[10px]" />
            </div>
            <div className="w-1/2">
              <PannelScore img={Img.disagree} text2={"Lost"} text3={"32"} className="w-full py-[10px]" />
            </div>
        </div>
        {/* <div className="py-2 flex justify-between w-full items-center">
            <div className="text-[#ffffff66]" onClick={()=>setRankingIndex((rankingIndex-1+rankingData.length)%rankingData.length)}>
              <ArrowLeft className="h-5 w-5" />
            </div>
            <div className="text-white">
  <span className="text-blueFaded transition-transform duration-150 ease-in transform before:content-[''] before:block before:translate-x-20">
    Ranking:
  </span>
  {rankingData[rankingIndex]}
</div>
            <div className="text-white " onClick={()=>setRankingIndex((rankingIndex+1)%rankingData.length)}>
              <ArrowRight className={"h-5 w-5"} />
            </div>
        </div> */}
          <div className="h-9 text-center ">
          <Carousel 
            showThumbs ={false} showStatus = {false} showIndicators= {false} infiniteLoop = {true} 
            renderArrowNext={(clickHandler,hasNext,labelNext)=>(hasNext && <div
            type = "button" aria-level={labelNext} className="next flex" onClick={clickHandler}>
                <ArrowRight className={"w-4 h-4 m-auto"} />
            </div>)}
            renderArrowPrev={(clickHandler,hasPrev,labelPrev)=>(hasPrev && <div
              type = "button" aria-level={labelPrev} className="prev flex " onClick={clickHandler}>
                <ArrowLeft className={"w-4 h-4 m-auto"} />
              </div>)}
          >
                {rankingItems}
            </Carousel>
          </div>
            

        <div className=" w-full" style={{height: "calc(100vh - 630px)"}}>
            <div className="flex flex-col gap-2 pb-8">
              {
                friendData.map((_data, _index) => <FriendRanking data={_data} key={_index} />)
              }
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo