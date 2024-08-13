import { useState } from "react";
import EarningTab from "../component/molecules/earning-tab";
import EarningTask from "../component/molecules/earning-task";

const tabList = [
    {
        id: 1,
        src: "coin.svg",
        amount: 600
    },
    {
        id: 2,
        src: "ton.svg",
        amount: 678.9
    }
]

const Earned = () => {

    const [ tabId, setTabId ] = useState(1);

    return (
        <div className="flex flex-col h-full gap-4">
            <EarningTab tabList={tabList} tabId={tabId} setTabId={setTabId} />
            <EarningTask />
        </div>
    )
}

export default Earned;