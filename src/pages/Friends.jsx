import FriendComment from "../component/molecules/friend-comment";
import FriendEarned from "../component/molecules/friend-earned";
import FriendsList from "../component/molecules/friends-list";

const Friends = () => {
    return (
        <div className="flex flex-col h-full gap-4 pb-[76px] justify-between">
            <FriendComment />
            <FriendsList />
            <FriendEarned />
        </div>
    )
}

export default Friends;