import { useState } from "react";
import TabButton from "../component/atom/tab-button";
import { avatar } from "../assets/avatar/index.js";
import PannelScore from "../component/atom/PannelScore";
import { Img } from "../assets/image"; 
import ArrowLeft from "../component/svg/arrow-left.jsx";
import ArrowRight from "../component/svg/arrow-right.jsx";
import FriendRanking from "../component/atom/friend-ranking.jsx";

const statsList = [
    {
        src: "Coin.svg",
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

const UserInfo = () => {
    const [ tabId, setTabId ] = useState(1);

    return (
        <div className="flex flex-col gap-4 items-center text-white text-base">
            <div className="font-semibold">Sergei Kovtun</div>
            <TabButton tabList={statsList} tabNo={tabId} setTabNo={setTabId} />
            <div className="flex gap-[41px] text-blueFaded text-sm">
                <div>Level <span className="text-white">1/10</span></div>
                <div>Rank <span className="text-white">1808944</span></div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <img src={avatar.avatar1} width="200px" height="200px" className="max-w-[200px] h-[200px]" alt="avatar" />
                <div className="rounded-[8px] border-[3px] border-[#56D0EA] py-2 w-[200px] text-center text-white">
                    Beginner
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
            <div className="py-2 flex justify-between w-full items-center">
                <div className="text-[#ffffff66]">
                    <ArrowLeft className="h-5 w-5" />
                </div>
                <div className="text-white">
                    <span className="text-blueFaded">Ranking: </span> Beginners
                </div>
                <div className="text-white">
                    <ArrowRight className={"h-5 w-5"} />
                </div>
            </div>
            <div className="overflow-auto w-full" style={{height: "calc(100vh - 630px)"}}>
                <div className="flex flex-col gap-2 pb-8">
                    {
                        friendData.map((_data, _index) => <FriendRanking data={_data} key={_index} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default UserInfo