import AtomBadge from "../atom/atom-badge";
import AtomLabel from "../atom/atom-label";

const FriendComment = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <AtomLabel content={"Friends"} />
                <AtomBadge content={2} />
            </div>
            <div className="text-white text-[15px]">
                Invite a friend and you'll both get 100 points. Every time the invited person tops up their TON balance, you will receive 1% of the top-up amount.
            </div>
        </div>
    )
}

export default FriendComment;