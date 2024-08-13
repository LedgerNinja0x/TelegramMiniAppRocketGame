import { useState } from "react";
import AtomLabel from "../component/atom/atom-label";
import ShadowButton from "../component/atom/shadow-btn";
import WalletInfo from "../component/atom/wallet-info";

const Wallet = () => {

    const [ walletAddress, setWalletAddress ] = useState("");

    return (
        <div className="flex-auto relative">
            <div className="absolute bottom-0 w-full">
                <AtomLabel content={"Wallet"} />
                <WalletInfo className={"mt-2"} address={walletAddress}/>
                <ShadowButton 
                    className={"mt-4"} 
                    content={ walletAddress ? "Disconnect wallet" : "Connect wallet"} 
                    action={() => setWalletAddress((address) => address ? "" : "UQ67wW...UQ67wW")}
                />
            </div>
        </div>
    )
}

export default Wallet;