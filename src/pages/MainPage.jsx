import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import SwitchButton from "../component/atom/switchButtton.jsx";
import InputNumber from "../component1/InputNumber";
import AppContext from "../component1/AppContext";
import Game from '../component1/Game.jsx'
import { useCookies } from 'react-cookie';
import DropDown from "../component1/DropDown";
import PannelScore from "../component/atom/PannelScore";
import { Img } from "../assets/image";
import { avatar } from "../assets/avatar/index.js";
import ScrollModal from "../component/atom/scroll-modal.jsx";
import NavPlay from "../component/svg/nav_play.jsx";
import ShadowButton from "../component/atom/shadow-btn.jsx";
import "../css_generated/Style.css"
import SettingButton from "../component/svg/button_setting.jsx";
import InputText from "../component1/InputText.jsx";
import { useAtom } from "jotai";
import { isActionState } from "../store/actionState.jsx";
import { CSSTransition } from "react-transition-group";
// import './SmoothTransantion.css'
const MainPage = () => {
  const context = useContext(AppContext);
  const cookiesData = useCookies(['user_id', 'session']);
  const [cookies] = !context.ssrFlag ? cookiesData : [context.cookies];

  const modalRef = useRef();

  // State variables
  const [stopWasPressed, setStopWasPressed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [realGame, setRealGame] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [gamePhase, setGamePhase] = useState();
  const [bet, setBet] = useState(1);
  const [autoStop, setAutoStop] = useState(20);
  const [finalResult, setFinalResult] = useState(0);
  const [historyGames, setHistoryGames] = useState([]);
  const [balance, setBalance] = useState(10);
  const [rank, setRank] = useState(1);
  const [expiration, setExpiration] = useState(0);
  const [loaderIsShown, setLoaderIsShown] = useState(!!cookies.name);
  const [operationAfterWin, setOperationAfterWin] = useState('Return to base Bet');
  const [valueAfterWin, setValueAfterWin] = useState(1);
  const [operationAfterLoss, setOperationAfterLoss] = useState('Increase Bet by');
  const [valueAfterLoss, setValueAfterLoss] = useState(2);
  const [games, setGames] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [winCoefficient, setWinCoefficient] = useState(1);
  const [lostCoefficient, setLostCoefficient] = useState(1);
  const [isAction,setActionState] = useAtom(isActionState);


  // Refs for mutable state
  const balanceRef = useRef(balance);
  const historyGamesRef = useRef(historyGames);
  const betRef = useRef(bet);
  const operationAfterWinRef = useRef(operationAfterWin);
  const valueAfterWinRef = useRef(valueAfterWin);
  const operationAfterLossRef = useRef(operationAfterLoss);
  const valueAfterLossRef = useRef(valueAfterLoss);
  const navigate = useNavigate();
  const counterItem = [Img.counter1, Img.counter2, Img.counter3, Img.go];
  const imgSettingButton = () => {
    return (
      <img src={Img.imgSetting} width={24} height={24} alt="setting" />
    )
  }

  const handleModalButton = () => {
    startGame();
    setIsModalOpen(false);
  }

  // Effect to validate and adjust state values
  useEffect(() => {
    if (bet < 1 || balance === '0.00' || balance < 1) {
      setBet(1);
    } else if (bet > balance && balance !== '0.00') {
      setBet(balance);
    }

    setAutoStop(prev => Math.min(Math.max(prev, 1.01), 100));
    setBalance(prev => prev === 0 ? '0.00' : prev);
    setValueAfterWin(prev => Math.min(Math.max(prev, 1), 100));
    setValueAfterLoss(prev => Math.min(Math.max(prev, 1), 100));
  }, [bet, autoStop, balance, valueAfterLoss, valueAfterWin]);

  // Effect to update refs
  useEffect(() => {
    operationAfterWinRef.current = operationAfterWin;
    valueAfterWinRef.current = valueAfterWin;
    operationAfterLossRef.current = operationAfterLoss;
    valueAfterLossRef.current = valueAfterLoss;
  }, [operationAfterWin, valueAfterWin, operationAfterLoss, valueAfterLoss]);

  // Effect to fetch user data
  useEffect(() => {
    let isMounted = true;
    // if (cookies.name) {
    //   const headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   fetch('/users_info', { method: 'POST', body: JSON.stringify({ historySize: 100 }), headers })
    //     .then(res => Promise.all([res.status, res.json()]))
    //     .then(([status, data]) => {
    //       if (isMounted) {
    //         try {
    //           const myData = data.allUsersData
    //             .sort((a, b) => b.balance.real - a.balance.real)
    //             .map((user, index) => ({ ...user, rank: index + 1 }))
    //             .find(user => user.name === cookies.name);

    //           if (myData) {
    //             setGames(realGame ? myData.realGames : myData.virtualGames);
    //             setWins(realGame ? myData.realWins : myData.virtualWins);
    //             setLosses(realGame ? myData.realLosses : myData.virtualLosses);
    //             const newHistoryGames = realGame ? myData.gamesHistory.real : myData.gamesHistory.virtual;
    //             historyGamesRef.current = newHistoryGames;
    //             setHistoryGames(newHistoryGames);
    //             const newBalance = realGame ? parseFloat(myData.balance.real).toFixed(2) : parseFloat(myData.balance.virtual).toFixed(2);
    //             balanceRef.current = newBalance;
    //             setBalance(newBalance);
    //             setRank(myData.rank);
    //             setExpiration(myData.expiration);
    //             setLoaderIsShown(false);
    //           }
    //         } catch (e) {
    //           document.location.reload();
    //         }
    //       }
    //     });
    // }
    // return () => { isMounted = false; };
    return () => {
      isMounted = true;
    }
  }, [realGame, cookies.name]);

  // useEffect(() => {
  //   let isMounted = true
  //   if (gamePhase !== 'started' && autoMode && !stopWasPressed && balanceRef.current >= betRef.current && betRef.current) {

  //     setTimeout(() => {
  //       if (isMounted) {
  //         try {
  //           context.socket.send(JSON.stringify({
  //             operation: 'start',
  //             bet: betRef.current,
  //             autoStop,
  //             isReal: realGame,
  //             userID: cookies.user_id,
  //             session: cookies.session
  //           }))
  //         } catch (e) {
  //           // eslint-disable-next-line no-self-assign
  //           document.location.href = document.location.href
  //         }
  //       }
  //     }, 2000)
  //   }
  //   return () => { isMounted = false }
  // }, [historyGames])

  // Effect to clean up on component unmount
  // useEffect(() => () => { context.overlayRef.current.style.display = 'none'; }, []);

  // Function to get free bets
  const getFreeBets = () => {
    if (!cookies.name) {
      modalRef.current.style.display = 'block';
      context.overlayRef.current.style.display = 'block';
    } else if (!realGame && (balance === '0.00' || balance < 1) && (expiration < new Date().getTime())) {
      context.socket.send(JSON.stringify({ operation: 'get_free_bets', userID: cookies.user_id }));
    }
  };

  // Function to stop the game
  const stopGame = () => {
    setStopWasPressed(true);
    setActionState("stop");
    // context.socket.send(JSON.stringify({ operation: 'stop' }));
    handleGameStopped()
  };

  // Function to start the game
  const startGame = () => {
    setStopWasPressed(false);
    setActionState("start");
    // context.socket.send(JSON.stringify({
    //   operation: 'start',
    //   bet,
    //   autoStop,
    //   isReal: realGame,
    //   userID: cookies.user_id,
    //   session: cookies.session,
    // }));

    // context.socket.onmessage = async e => {
    //   const data = JSON.parse(e.data);
    //   switch (data.operation) {
    //     case 'started':
    //       handleGameStarted();
    //       break;
    //     case 'stopped':
    //       handleGameStopped(data);
    //       break;
    //     case 'crashed':
    //       handleGameCrashed(data);
    //       break;
    //     case 'free_bets':
    //       handleFreeBets(data);
    //       break;
    //     default:
    //       break;
    //   }
    // };
    handleGameStarted();
  };

  const handleGameStarted = () => {
    const animation = document.getElementById('stars').style.animation
    document.getElementById('stars').style.animation = 'none'
    document.getElementById('stars').style.animation = 'none'
    setTimeout(() => {
      setFinalResult(0);
      setGamePhase('started');
      document.getElementById('stars').style.animation = animation;
    }, 50);
  };

  const handleGameStopped = (data = { stop: 'x', profit: '' }) => {
    setFinalResult(data.stop);
    setGamePhase('stopped');
    updateGameHistory(data, 'stopped');
    updateBalance(data.profit);
    setGames(games + 1);
    setWins(wins + 1);
    adjustBetAfterWin();
  };

  const handleGameCrashed = (data) => {
    setFinalResult('Crashed...');
    setGamePhase('crashed');
    updateGameHistory(data, 'crashed');
    updateBalance(data.profit);
    setGames(games + 1);
    setLosses(losses + 1);
    adjustBetAfterLoss();
  };

  const handleFreeBets = (data) => {
    setExpiration(data.expiration);
    const newBalance = parseFloat(balanceRef.current) + 3;
    balanceRef.current = newBalance;
    setBalance(newBalance);
  };

  const updateGameHistory = (data, status) => {
    const newHistory = [{
      crash: status === 'crashed' ? data.crash : 'x',
      bet: data.bet,
      stop: status === 'stopped' ? data.stop : 'x',
      profit: data.profit,
    }, ...historyGamesRef.current];
    setHistoryGames(newHistory);
    historyGamesRef.current = newHistory;
  };

  const updateBalance = (profit) => {
    const newBalance = (parseFloat(balanceRef.current) + parseFloat(profit)).toFixed(2);
    setBalance(newBalance);
    balanceRef.current = newBalance;
  };

  const adjustBetAfterWin = () => {
    if (autoMode) {
      if (operationAfterWinRef.current === 'Increase Bet by') {
        betRef.current = Math.min(betRef.current * valueAfterWinRef.current, parseFloat(balanceRef.current));
      } else {
        betRef.current = Math.min(valueAfterWinRef.current, parseFloat(balanceRef.current));
      }
      setBet(betRef.current);
    }
  };

  const adjustBetAfterLoss = () => {
    if (autoMode) {
      if (operationAfterLossRef.current === 'Increase Bet by') {
        betRef.current = Math.min(betRef.current * valueAfterLossRef.current, parseFloat(balanceRef.current));
      } else {
        betRef.current = Math.min(valueAfterLossRef.current, parseFloat(balanceRef.current));
      }
      setBet(betRef.current);
    }
  };

  const setPlayMode = (condition) => {


    setAutoMode(condition);
    setIsModalOpen(condition);
  }

  const goToUserInfo = () => {
    navigate("/userInfo");
  }

  return (
    <div className="flex-auto p-4">
    <div id='index-operations' className={`flex flex-col relative h-full w-full gap-4 justify-between ${autoMode ? 'auto-mode' : ''} transition flex flex-col gap-4 ${isAction==="start"? "pb-0" : "pb-[76px]" }`}>
      
    
        <div className={`flex w-full absolute bg-white_20 justify-between transition transform duration-200 p-2 rounded-[10px] text-white text-base leading-5 ${isAction === "start"?"-translate-y-24":""} `} onClick={goToUserInfo}>
          
          <div className="flex gap-2.5">
            <img src={avatar.avatar1} width="64px" height="64px" className="max-w-16 h-16" alt="avatar" />
            <div className="flex flex-col w-full gap-0.5">
              <p className="font-semibold">Sergei Kovtun</p>
              <p className="font-semibold">Beginner · 1/10</p>
              <p>1808944</p>
            </div>
          </div>
            

          <div className="flex flex-col gap-2">
            <PannelScore img={Img.agree} text2={"Won"} text3={"48"} />
            <PannelScore img={Img.disagree} text2={"Lost"} text3={"32"} />
          </div>
        </div>
      
      
      <Game className = {`transition-all ${isAction !== "start" ?"mt-24":"mt-0"} `} finalResult={finalResult} gamePhase={gamePhase} 
      realGame={realGame} setRealGame={setRealGame} 
      setLoaderIsShown={setLoaderIsShown} amount ={10} />
      
      

      <div className="flex flex-col text-white gap-4">
        <div className={`${gamePhase === 'started' ? "opacity-20 !text-white" : ""}`}>
          <div className="flex flex-row justify-center text-base font-medium">
            <span className={`text-[#3861FB] ${!autoMode ? 'selected text-white ' : ''}`} >Manual</span>
            <SwitchButton checked={autoMode}  onChange={ gamePhase !== 'started' ? ( e => setPlayMode(e.target.checked)):undefined}  />
            <span className={`text-[#3861FB] ${autoMode ? 'selected text-white ' : ''}`} >Auto</span>
          </div>

          <div className={`transition duration-300 ${autoMode && "hidden"} flex gap-4`}>
            <div className=" flex flex-col w-1/2 gap-1">
              <div className="text-sm leading-5">Bet</div>
              <InputText InputProps={{ value: bet, min: 1, step: 1, onChange: e => setBet(parseFloat(e.target.value)) }} />
              <div className="text-xs leading-[14px] text-[#FFFFFFCC]">Minimal Bet is 0.1 Coin</div>
            </div>

            <div className="flex flex-col w-1/2 gap-1">
              <div className="text-sm leading-5">Auto Stop</div>
              <InputText InputProps={{ value: autoStop, min: 1.01, max: 100, step: 1, onChange: e => { stopGame(); setAutoStop(parseFloat(e.target.value)) } }} />
              <div className="text-xs leading-[14px] text-[#FFFFFFCC]">Auto Cash Out when this amount will be reached</div>
            </div>
          </div>
        </div>

        {
          gamePhase !== 'started' ?
            (
              <div className="flex gap-2 w-full justify-between">
                {autoMode && <ShadowButton className={`transition-all flex w-1/5 bg-white justify-center items-center invite-btn-setting border-white `}
                  content={<SettingButton />}
                  action={() => setIsModalOpen(true)}
                />}
                <ShadowButton
                  action={startGame}
                  content={"Start"}
                // disabled={
                //   // balance === '0.00' || 
                //   // bet < 1 || autoStop < 1.01 || 
                //   // balance < 1 || isNaN(bet) || isNaN(autoStop) || isNaN(valueAfterWin) 
                //   // || isNaN(valueAfterLoss)
                // }
                />
              </div>
            ) :
            (
              <ShadowButton
                className={"bg-[#CC070A] shadow-btn-red-border invite-btn-red-shadow"}
                content={"Stop"}
                action={stopGame}
              />
            )
        }

        <ScrollModal icon={<NavPlay />} title="Auto Launch" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <div className="flex flex-col pt-2 px-4 pb-4 gap-4" >
            <div className="flex gap-4">
              <div className="flex flex-col w-1/2 gap-1">
                <div className="text-sm leading-5">Bet</div>
                <InputNumber InputProps={{ value: bet, min: 1, step: 1, onChange: e => setBet(parseFloat(e.target.value)) }} />
                <div className="text-xs leading-[14px] text-[#FFFFFFCC]">Minimal Bet is 0.1 Coin</div>
              </div>

              <div className="flex flex-col w-1/2 gap-1">
                <div className="text-sm leading-5">Auto Stop</div>
                <InputNumber InputProps={{ value: autoStop, min: 1.01, max: 100, step: 1, type:"xWithNumber", onChange: e => { stopGame(); setAutoStop(e.target.value) } }} />
                <div className="text-xs leading-[14px] text-[#FFFFFFCC]">Auto Cash Out when this amount will be reached</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col w-1/2 gap-1">
                <div className="text-sm leading-5">If Lose</div>
                <InputText InputProps={{ value: operationAfterWin, onChange: e => setOperationAfterWin(e.target.value) }} />
              </div>

              <div className="flex flex-col w-1/2 gap-1">
                <div className="text-sm leading-5">Coefficient</div>
                <InputNumber InputProps={{ value: winCoefficient, min: 1.01, max: 100, step: 1, type:"xWithNumber", onChange: e => { stopGame(); setWinCoefficient(parseFloat(e.target.value)) } }} />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col w-1/2 gap-1">
                <div className="text-sm leading-5">If Win</div>
                <InputText InputProps={{ value: operationAfterLoss, onChange: e => setOperationAfterLoss(parseFloat(e.target.value)) }} />
              </div>

              <div className="flex flex-col w-1/2 gap-1">
                <div className="text-sm leading-5 text-[#FFFFFF99]">Coefficeent</div>
                <InputNumber InputProps={{ value: lostCoefficient, min: 1.01, max: 100, step: 1, type:"xWithNumber", disabled: true, onChange: e => { stopGame(); setLostCoefficient(parseFloat(e.target.value)) } }} />
              </div>
            </div>

            {
              gamePhase !== 'started' ?
                (
                  <ShadowButton
                    action={handleModalButton}
                    content={"Start"}
                  disabled={
                    balance === '0.00' || bet < 1 || autoStop < 1.01 || 
                    balance < 1 || isNaN(bet) || isNaN(autoStop) || isNaN(valueAfterWin) 
                    || isNaN(valueAfterLoss)
                  }
                  />
                ) :
                (
                  <ShadowButton
                    className={"bg-[#CC070A] shadow-btn-red-border invite-btn-red-shadow"}
                    content={"Stop"}
                    action={stopGame}
                  />
                )
            }


          </div>
        </ScrollModal>
      </div>
    </div>
    </div>
  );
};

export default MainPage;