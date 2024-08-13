import StatInfo from "../atom/stat-info";

const statData = [
    {
        date: "Today",
        data: [
            {
                bet: 1,
                stop: 2.78
            },
            {
                bet: 2,
                stop: 0
            },
            {
                bet: 1,
                stop: 1.32
            },
            {
                bet: 1,
                stop: 1.44
            }
        ]
    },
    {
        date: "Yesterday",
        data: [
            {
                bet: 10,
                stop: 2.78
            },
            {
                bet: 1.5,
                stop: 0
            },
            {
                bet: 1,
                stop: 2.78
            },
            {
                bet: 0.25,
                stop: 4
            },
            {
                bet: 1,
                stop: 8.14
            }
        ]
    },
    {
        date: "02/09/2024",
        data: [
            {
                bet: 1,
                stop: 2
            },
            {
                bet: 1,
                stop: 2.78
            },
            {
                bet: 1,
                stop: 2.78
            },
            {
                bet: 0.25,
                stop: 4
            },
            {
                bet: 1,
                stop: 8.14
            }
        ]
    }
]

const StatList = () => {
    return (
        <div className="text-[14px] font-medium">
            <div className="flex w-full justify-between text-blueFaded border-b border-blueFaded px-4 py-2">
                <div>Bet</div>
                <div>Stop/Crash</div>
                <div>Profit</div>
            </div>
            <div className="overflow-auto" style={{height: "calc(100vh - 320px)"}}>
                {
                    statData.map((_statdata, _index) => (
                        <StatInfo data={_statdata} key={_index} />
                    ))
                }
            </div>
        </div>
    )
}

export default StatList;