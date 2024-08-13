import EarningTab from "../component/molecules/earning-tab";
import EarningTask from "../component/molecules/earning-task";

const Earned = () => {
    return (
        <div className="flex flex-col h-full gap-4">
            <EarningTab />
            <EarningTask />
        </div>
    )
}

export default Earned;