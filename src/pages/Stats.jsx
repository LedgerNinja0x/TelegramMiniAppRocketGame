import { useState } from "react";
import AtomLabel from "../component/atom/atom-label";
import TabButton from "../component/atom/tab-button";
import StatList from "../component/molecules/stat-list";

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

const Stats = () => {
    const [ tabId, setTabId ] = useState(1);

    return (
        <div className="flex flex-col">
            <AtomLabel content={"Statistics"} />
            <div className="mt-2">
                <TabButton tabList={statsList} tabNo={tabId} setTabNo={setTabId} />
            </div>
            <div className="mt-4">
                <StatList />
            </div>
        </div>
    )
}

export default Stats;