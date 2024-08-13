import AtomLabel from "../atom/atom-label";

const FriendEarned = () => {
    return (
        <div>
            <AtomLabel content={"Earned"} />
            <div className="w-full rounded-[8px] bg-[#FFFFFF33] mt-3 flex">
                <div className="w-1/2">
                    <div className="mx-auto flex gap-[2.5px] w-fit py-2">
                        <img 
                            src="/image/Coin.svg" 
                            alt=""
                            className="w-6 h-6"
                        />
                        <span className="font-bold text-base text-white">+200</span>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="mx-auto flex gap-[2.5px] w-fit py-2">
                        <img 
                            src="/image/ton.svg" 
                            alt=""
                            className="w-6 h-6"
                        />
                        <span className="font-bold text-base text-white">+6.688</span>
                    </div>
                </div>
            </div>
            <div className="mt-4 rounded-[12px] w-full text-center py-[14px] text-[16px] font-bold cursor-pointer border border-solid border-transparent invite-btn-gradient-border bg-[#3434DA] text-white invite-btn-shadow">
                Invite a friend
            </div>
        </div>
    )
}

export default FriendEarned;