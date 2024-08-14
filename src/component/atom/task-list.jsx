import { useState } from "react";
import CheckMark from "../svg/check-mark";
import LoadingSpinner from "../svg/loading-spinner";
import toast from "react-hot-toast";

const taskData = [
    {
        src: "ins-avatar.svg",
        title: "Task title",
        amount: 100,
        status: 0
    },
    {
        src: "you-avatar.svg",
        title: "Task title",
        amount: 100,
        status: 1
    },
    {
        src: "tg-avatar.svg",
        title: "Task title",
        amount: 100,
        status: 2
    },
    {
        src: "you-avatar.svg",
        title: "Task title",
        amount: 100,
        status: 2
    },
    {
        src: "you-avatar.svg",
        title: "Task title",
        amount: 100,
        status: 2
    },
    {
        src: "tg-avatar.svg",
        title: "Task title",
        amount: 100,
        status: 2
    },
    {
        src: "ins-avatar.svg",
        title: "Task title",
        amount: 100,
        status: 2
    },
    {
        src: "you-avatar.svg",
        title: "Task title",
        amount: 100,
        status: 2
    },
    {
        src: "you-avatar.svg",
        title: "Task title",
        amount: 100,
        status: 2
    },
    {
        src: "you-avatar.svg",
        title: "Task title",
        amount: 100,
        status: 2
    }
]

const GenerateTask = (_task, _index) => {

    const [ isClaim, setIsClaim ] = useState(false);

    const goClaim = () => {
        setIsClaim(true);
        toast('100 coins added to your balance',
            {
                position: "top-center",
                icon: <CheckMark />,
                style: {
                    borderRadius: '8px',
                    background: '#7886A0',
                    color: '#fff',
                    width: '90vw'
                },
            }
        )
    }

    return (
        <div className="bg-[#0000001A] rounded-lg flex justify-between items-center py-2 pl-2 pr-4 text-[14px]" key={_index}>
            <div className="flex gap-2 items-center">
                <img src={`/image/icon/${_task.src}`} alt="" className="w-8 h-8" />
                <div className="flex flex-col">
                    <div className="text-white">{_task.title}</div>
                    <div className="text-[#ffffff99]">+{_task.amount} Coins</div>
                </div>
            </div>
            {
                _task.status == 0 ?
                    <button className="rounded-lg w-[61px] py-1 px-0 h-7 bg-[#3861FB] text-white text-center text-[14px]">
                        Start
                    </button> :
                    _task.status == 1 ?
                        <button
                            className="rounded-lg w-[61px] py-1 px-0 h-7 bg-white text-[#080888] text-center text-[14px]"
                            onClick={goClaim}
                        >
                            {
                                isClaim ?
                                <LoadingSpinner className="w-4 h-4 mx-auto" /> :
                                "Claim"
                            }
                        </button> :
                        <div className="text-white">
                            <CheckMark />
                        </div>
            }
        </div>
    )
}

const TaskList = () => {
    return (
        <div className="flex flex-col gap-2 text-[14px] overflow-auto pb-4" style={{ height: "calc(100vh - 250px)" }}>
            {
                taskData.map((_task, _index) => GenerateTask(_task, _index))
            }
        </div>
    )
}

export default TaskList;