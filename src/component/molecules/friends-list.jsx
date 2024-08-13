import AtomLabel from "../atom/atom-label";
import FriendInfo from "../atom/friend-info";

const FriendsList = ( { friendData } ) => {
    return (
        <div className="flex-auto" style={{height: "calc(100vh - 500px)"}}>
            {
                friendData.length > 0 ? 
                (
                    <>
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
                    </>
                ) : (
                    <div className="py-[30px] flex flex-col items-center gap-4 text-center my-auto h-full">
                        <img 
                            src="/image/main/friends.png"
                            alt=""
                            className="h-full max-w-auto"
                        />
                        <div className="text-[15px] text-white">
                            Invite a friend and you'll both get 100 points. Every time the invited person tops up their TON balance, you will receive 1% of the top-up amount.
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default FriendsList;