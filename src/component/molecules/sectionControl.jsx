import React, {useState, useContext, useRef} from "react";
import SwitchButton from "../atom/switchButtton";
import InputNumber from "../../component1/InputNumber";
import AppContext from "../../component1/AppContext";
import { useCookies } from 'react-cookie'
import DropDown from "../../component1/DropDown";
import '../../css_generated/DropDown.css'
import "../../css_generated/Style.css"
// import '../../css_generated/Index.css'

import PannelSetting from "./pannelSetting";

const SectionControl = () =>{
  const context = useContext(AppContext)
  
  const modalRef = useRef()

  const [stopWasPressed, setStopWasPressed] = useState(false)
  const [realGame, setRealGame] = useState(false)
  const [autoMode, setAutoMode] = useState(false)
  const [gamePhase, setGamePhase] = useState()
  const [bet, setBet] = useState(1)
  const [autoStop, setAutoStop] = useState(20)
  const [finalResult, setFinalResult] = useState(0)
  const [historyGames, setHistoryGames] = useState([])
  const [balance, setBalance] = useState(10)
  const [rank, setRank] = useState(1)
  const [betButtonText, setBetButtonText] = useState('Bet')
  const [expiration, setExpiration] = useState(0)

  const balanceRef = useRef(balance)
  const historyGamesRef = useRef(historyGames)
  const betRef = useRef(bet)

  const [operationAfterWin, setOperationAfterWin] = useState('Return to base Bet')
  const [valueAfterWin, setValueAfterWin] = useState(1)
  const [operationAfterLoss, setOperationAfterLoss] = useState('Increase Bet by')
  const [valueAfterLoss, setValueAfterLoss] = useState(2)

  const operationAfterWinRef = useRef(operationAfterWin)
  const valueAfterWinRef = useRef(valueAfterWin)
  const operationAfterLossRef = useRef(operationAfterLoss)
  const valueAfterLossRef = useRef(valueAfterLoss)

  const [games, setGames] = useState(0)
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)

  const stopGame = () =>{
    setStopWasPressed(true)
    context.socket.send(JSON.stringify({ operation: 'stop' }))
  }

  const startGame = () => {
    setStopWasPressed(false)
    context.socket.send(JSON.stringify({
      operation: 'start',
      bet,
      autoStop,
      isReal: realGame,
      userID: "cookies.user_id",
      session: "cookies.session"
    }))

    context.socket.onmessage = async e => {
      const data = JSON.parse(e.data)
      if (data.operation === 'started') {
        // animation restart
        const animation = document.getElementById('stars').style.animation
        document.getElementById('stars').style.animation = 'none'
        setTimeout(() => {
          setFinalResult(0)
          setGamePhase('started')
          document.getElementById('stars').style.animation = animation
        }, 50)
      } else if (data.operation === 'stopped') {
        setFinalResult(data.stop)
        setGamePhase('stopped')

        const newHistory = [{
          crash: 'x',
          bet: data.bet,
          stop: data.stop,
          profit: data.profit
        }, ...historyGamesRef.current]

        const newBalance = (parseFloat(balanceRef.current) + parseFloat(data.profit)).toFixed(2)
        setBalance(newBalance)
        balanceRef.current = newBalance
        setGames(games + 1)
        setWins(wins + 1)

        if (autoMode) {
          if (operationAfterWinRef.current === 'Increase Bet by') {
            if (betRef.current * valueAfterWinRef.current > newBalance) {
              betRef.current = newBalance
            } else {
              betRef.current *= valueAfterWinRef.current
            }
          } else {
            if (valueAfterWinRef.current > newBalance) {
              betRef.current = newBalance
            } else {
              betRef.current = valueAfterWinRef.current
            }
          }
        }

        setBet(betRef.current)
        setHistoryGames(newHistory)
        historyGamesRef.current = newHistory
      } else if (data.operation === 'crashed') {
        setFinalResult('Crashed...')
        setGamePhase('crashed')

        const newHistory = [{
          crash: data.crash,
          bet: data.bet,
          stop: 'x',
          profit: data.profit
        }, ...historyGamesRef.current]

        const newBalance = (parseFloat(balanceRef.current) + parseFloat(data.profit)).toFixed(2)
        setBalance(newBalance)
        balanceRef.current = newBalance

        setGames(games + 1)
        setLosses(losses + 1)

        if (autoMode) {
          if (operationAfterLossRef.current === 'Increase Bet by') {
            if (betRef.current * valueAfterLossRef.current > newBalance) {
              betRef.current = newBalance
            } else {
              betRef.current *= valueAfterLossRef.current
            }
          } else {
            if (valueAfterLossRef.current > newBalance) {
              betRef.current = newBalance
            } else {
              betRef.current = valueAfterLossRef.current
            }
          }
        }

        setBet(betRef.current)
        setHistoryGames(newHistory)
        historyGamesRef.current = newHistory
      } else if (data.operation === 'free_bets') {
        setExpiration(data.expiration)
        const newBalance = parseFloat(balanceRef.current) + 3
        balanceRef.current = newBalance
        setBalance(newBalance)
      }
    }
  }
  

  return(
    <div id='index-operations' className={`${autoMode ? 'auto-mode' : ''} flex flex-col gap-4`}>
        <div  className="flex flex-row text-white justify-center">
          <span className={!autoMode ? 'selected' : ''} onClick={() => { setAutoMode(false) }}>Manual</span>
          <SwitchButton checked={autoMode} onChange={e => setAutoMode(e.target.checked)}/>
          <span className={autoMode ? 'selected' : ''} onClick={() => { setAutoMode(true) }}>Auto</span>
        </div>
       
        <div className="flex gap-4 text-white">
        <div className="flex flex-col w-1/2   ">
          <div className="text-sm leading-5">Bet</div>
          <InputNumber InputProps={{ value: bet, min: 1, step: 1, onChange: e => { setBet(parseFloat(e.target.value)) } }}/>
          <div className="text-xs leading-[14px]">Minimal Bet is 0.1 Coin</div>
        </div>
        
        
        <div className="flex flex-col w-1/2">
          <div className="text-sm leading-5" >Auto Stop</div>
          <InputNumber InputProps={{ value: autoStop, min: 1.01, max: 100, step: 1, onChange: e => { stopGame(); setAutoStop(parseFloat(e.target.value)) } }}/>
          <div className="text-xs leading-[14px]" >Auto Cash Out when this amount will be reached</div> 
        </div>
        </div>
        {gamePhase !== 'started' ? <button onClick={startGame} disabled={balance === '0.00' || bet < 1 || autoStop < 1.01 || balance < 1 || isNaN(bet) || isNaN(autoStop) || isNaN(valueAfterWin) || isNaN(valueAfterLoss)}>Start</button> : <button onClick={stopGame}>Stop</button>}


        {autoMode
          ? <>
            <div></div>
            <div className='index-operations-top'>If Loss</div>
            <div className='index-operations-top'>{operationAfterLoss === 'Increase Bet by' ? 'Coefficient' : 'Base Bet'}</div>
            <div></div>

            <div></div>
            <DropDown label={operationAfterLoss} content={['Return to base Bet']} onChange={e => { setOperationAfterLoss(e) }}/>
            <InputNumber InputProps={{ value: valueAfterLoss, min: 1, step: 1, onChange: e => { setValueAfterLoss(parseFloat(e.target.value)) } }}/>
            <div></div>

            <div></div>
            <div className='index-operations-top'>If Win</div>
            <div className='index-operations-top'>{operationAfterWin === 'Increase Bet by' ? 'Coefficient' : 'Base Bet'}</div>
            <div></div>

            <div></div>
            <DropDown label={operationAfterWin} content={['Increase Bet by']} onChange={ e => { setOperationAfterWin(e) } }/>
            <InputNumber InputProps={{ value: valueAfterWin, min: 1, step: 1, onChange: e => { setValueAfterWin(parseFloat(e.target.value)) } }}/>
            <div></div>
          </>
          : <></>}
      </div>
    
  )
}
export default SectionControl;