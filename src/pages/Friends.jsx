import { useState } from "react";
import FriendComment from "../component/molecules/friend-comment";
import FriendEarned from "../component/molecules/friend-earned";
import FriendsList from "../component/molecules/friends-list";
import ScrollModal from "../component/atom/scroll-modal";
import NavFriends from "../component/svg/nav_friends";
import ShadowButton from "../component/atom/shadow-btn";
import CheckMark from "../component/svg/check-mark";
import toast from "react-hot-toast";

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

const Friends = () => {

    const [ friendList, setFriendList ] = useState([]);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isClosing, setIsClosing ] = useState(false);

    const copyLink = () => {
        toast('Referral link is copied',
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

    const sendInvite = () => {
        setIsOpen(false);
        setFriendList(friendData);
    }

    return (
        <div className="flex flex-col h-full gap-4 pb-[76px] justify-between">
            <FriendComment friendData={friendList} />
            <FriendsList friendData={friendList} />
            <FriendEarned setIsModalOpen={setIsOpen} />
            <ScrollModal icon={<NavFriends />} title={"Invite a Friend"} isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="pb-6 flex flex-col gap-4 px-4">
                    <ShadowButton className={"bg-[#3434DA] shadow-btn-lightblue-border"} content={"Send invitation"} action={sendInvite} />
                    <ShadowButton className={"bg-[#3434DA] shadow-btn-lightblue-border"} content={"Copy link"} action={copyLink}/>
                </div>
            </ScrollModal>
        </div>
    )
}

export default Friends;