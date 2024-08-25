import { useState } from "react";
import FriendComment from "../component/molecules/friend-comment";
import FriendEarned from "../component/molecules/friend-earned";
import FriendsList from "../component/molecules/friends-list";
import ScrollModal from "../component/atom/scroll-modal";
import NavFriends from "../component/svg/nav_friends";
import ShadowButton from "../component/atom/shadow-btn";
import CheckMark from "../component/svg/check-mark";
import toast from "react-hot-toast";
import { initUtils } from '@telegram-apps/sdk'

const friendData = []

const Friends = () => {
  const webapp = window.Telegram.WebApp.initDataUnsafe;
  const userId = webapp["user"]["username"];;
  const utils = initUtils();

  const [friendList, setFriendList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [link, setLink] = useState("");
  // Function to generate an invite link
  const generateInviteLink = () => {
    const tmpURL = `https://t.me/rocket_mini_bot?start=${userId}`;
    const tmpTEXT = "Rocket Game: Play and Get Rewards.🚀💰🤑";
    const fullURL = `https://t.me/share/url?url=${tmpURL}&text=${tmpTEXT}`;
    return fullURL;
  };

  // Function to handle invite
  const inviteUser = () => {
    generateInviteLink()
    utils.openTelegramLink();
  };



  const copyLink = () => {
    navigator.clipboard.writeText(generateInviteLink());
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
          <ShadowButton className={"bg-[#3434DA] shadow-btn-lightblue-border"} content={"Send invitation"} action={inviteUser} />
          <ShadowButton className={"bg-[#3434DA] shadow-btn-lightblue-border"} content={"Copy link"} action={copyLink} />
        </div>
      </ScrollModal>
    </div>
  )
}

export default Friends;