import React, {useState} from "react";
import { Img } from "../assets/image";
import ToggleButton from "../component/atom/toggleButton";

const footerData = [
  {img : Img.navPlay, text: "Play"},
  {img : Img.navEarn, text: "Earn"},
  {img : Img.navFriends, text: "Friends"},
  {img : Img.navStats, text: "Stats"},
  {img : Img.navWallet, text: "Wallet"},
]

const Footer = () =>{
  const [slot,setSlot] = useState(footerData[0].text);
  console.log(slot)
  const footerItems = footerData.map((data, index) =>{
    return(
      <ToggleButton key={index}
      img={data.img} 
      text={data.text} 
      bgColor = {" bg-white bg-opacity-40 "} 
      textColor = {" text-white "}
      fgColor = {" bg-transparent "} 
      setSlot = {(value)=>setSlot(value)} 
      disabled = {slot===data.text} />
    )
  }) 
  return (
    <div className="flex bg-bgNavbar w-full fixed bottom-4 gap-1.5 h-15 rounded-xl p-[5px]">
      <div className={`flex  gap-1.5  items-center justify-center `}>
        {footerItems}
      </div>
    </div>
  )
}

export default Footer;