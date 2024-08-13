import AtomLabel from "../atom/atom-label";
import FriendInfo from "../atom/friend-info";

const friendData = [
    {
        url: "anna.svg",
        name: "Anna Brown",
        label: "Beginner",
        rate: 1,
        id: 1808944,
        coin: 100,
        ton: 6.688
    },
    {
        url: "john.svg",
        name: "John Smith",
        label: "Beginner",
        rate: 1,
        id: 1808935,
        coin: 100,
        ton: 0
    }
]

const FriendsList = () => {
    return (
        <div className="flex-auto">
            <AtomLabel content={"List of your friends"} />
            <div className="flex flex-col gap-2 mt-4">
                {
                    friendData.map((_friend, _index) => {
                        return (
                            <FriendInfo key={_index} data={_friend} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FriendsList;