// /* eslint-disable react/prop-types */
// import AppContext from '../component1/AppContext'
// import DropDown from '../component1/DropDown'
// import InputNumber from '../component1/InputNumber'
// import Game from '../component1/Game'
// import GoogleAds from '../component1/GoogleAds'
// import { Link } from 'react-router-dom'
// import React, { memo, useContext, useEffect, useRef, useState } from 'react'
// import Switch from '../component1/Switch'
// import TimerSpan from '../component1/TimerSpan'
// import { useCookies } from 'react-cookie'



// export default memo(function Index () {
//   const context = useContext(AppContext)
//   const [cookies] = !context.ssrFlag ? useCookies(['user_id', 'session']) : [context.cookies]

//   const modalRef = useRef()

//   const [stopWasPressed, setStopWasPressed] = useState(false)
//   const [realGame, setRealGame] = useState(false)
//   const [autoMode, setAutoMode] = useState(false)
//   const [gamePhase, setGamePhase] = useState()
//   const [bet, setBet] = useState(1)
//   const [autoStop, setAutoStop] = useState(20)
//   const [finalResult, setFinalResult] = useState(0)
//   const [historyGames, setHistoryGames] = useState([])
//   const [balance, setBalance] = useState(10)
//   const [loaderIsShown, setLoaderIsShown] = useState(!!cookies.name)
//   const [rank, setRank] = useState(1)
//   const [betButtonText, setBetButtonText] = useState('Bet')
//   const [expiration, setExpiration] = useState(0)

//   const balanceRef = useRef(balance)
//   const historyGamesRef = useRef(historyGames)
//   const betRef = useRef(bet)

//   const [operationAfterWin, setOperationAfterWin] = useState('Return to base Bet')
//   const [valueAfterWin, setValueAfterWin] = useState(1)
//   const [operationAfterLoss, setOperationAfterLoss] = useState('Increase Bet by')
//   const [valueAfterLoss, setValueAfterLoss] = useState(2)

//   const operationAfterWinRef = useRef(operationAfterWin)
//   const valueAfterWinRef = useRef(valueAfterWin)
//   const operationAfterLossRef = useRef(operationAfterLoss)
//   const valueAfterLossRef = useRef(valueAfterLoss)

//   const [games, setGames] = useState(0)
//   const [wins, setWins] = useState(0)
//   const [losses, setLosses] = useState(0)

//   useEffect(() => {
//     if (bet < 1 || balance === '0.00' || balance < 1) {
//       setBet(1)
//     } else if (bet > balance && balance !== '0.00') {
//       setBet(balance)
//     }

//     if (autoStop < 1) {
//       setAutoStop(1.01)
//     } else if (autoStop > 100) {
//       setAutoStop(100)
//     }

//     if (balance === 0) {
//       setBalance('0.00')
//     }

//     if (valueAfterWin < 1) {
//       setValueAfterWin(1)
//     }

//     if (valueAfterWin > 100) {
//       setValueAfterWin(100)
//     }

//     if (valueAfterLoss < 1) {
//       setValueAfterLoss(1)
//     }

//     if (valueAfterLoss > 100) {
//       setValueAfterLoss(100)
//     }
//   }, [bet, autoStop, balance, valueAfterLoss, valueAfterWin, gamePhase])

//   useEffect(() => {
//     operationAfterWinRef.current = operationAfterWin
//     valueAfterWinRef.current = valueAfterWin
//     operationAfterLossRef.current = operationAfterLoss
//     valueAfterLossRef.current = valueAfterLoss
//   }, [operationAfterWin, valueAfterWin, operationAfterLoss, valueAfterLoss])

//   useEffect(() => {
//     let isMounted = true
//     if (gamePhase !== 'started' && autoMode && !stopWasPressed && balanceRef.current >= betRef.current && betRef.current) {
//       setBetButtonText(3)
//       setTimeout(() => { setBetButtonText(2) }, 1000)
//       setTimeout(() => { setBetButtonText(1) }, 2000)
//       setTimeout(() => { setBetButtonText('Bet') }, 3000)

//       setTimeout(() => {
//         if (isMounted) {
//           try {
//             context.socket.send(JSON.stringify({
//               operation: 'start',
//               bet: betRef.current,
//               autoStop,
//               isReal: realGame,
//               userID: cookies.user_id,
//               session: cookies.session
//             }))
//           } catch (e) {
//             // eslint-disable-next-line no-self-assign
//             document.location.href = document.location.href
//           }
//         }
//       }, 3000)
//     }
//     return () => { isMounted = false }
//   }, [historyGames])

//   useEffect(() => {
//     let isMounted = true
//     if (cookies.name) {
//       const headers = new Headers()
//       headers.append('Content-Type', 'application/json')
//       fetch('/users_info', { method: 'POST', body: JSON.stringify({ historySize: 100 }), headers })
//         .then(res => Promise.all([res.status, res.json()]))
//         .then(([status, data]) => {
//           if (isMounted) {
//             try {
//               const myData = data.allUsersData
//                 .sort((a, b) => b.balance.real - a.balance.real)
//                 .map((i, index) => { i.rank = index + 1; return i })
//                 .filter(i => i.name === cookies.name)[0]
//               setGames(realGame ? myData.realGames : myData.virtualGames)
//               setWins(realGame ? myData.realWins : myData.virtualWins)
//               setLosses(realGame ? myData.realLosses : myData.virtualLosses)
//               const newHistoryGames = realGame ? myData.gamesHistory.real : myData.gamesHistory.virtual
//               historyGamesRef.current = newHistoryGames
//               setHistoryGames(newHistoryGames)
//               const newBalance = realGame ? parseFloat(myData.balance.real).toFixed(2) : parseFloat(myData.balance.virtual).toFixed(2)
//               balanceRef.current = newBalance
//               setBalance(newBalance)
//               setRank(myData.rank)
//               setExpiration(myData.expiration)
//               setLoaderIsShown(false)
//             } catch (e) {
//               // eslint-disable-next-line no-self-assign
//               document.location.href = document.location.href
//             }
//           }
//         })
//     }
//     return () => { isMounted = false }
//   }, [realGame])

//   useEffect(() => () => { context.overlayRef.current.style.display = 'none' }, [])

//   function getFreeBets () {
//     if (!cookies.name) {
//       modalRef.current.style.display = 'block'
//       context.overlayRef.current.style.display = 'block'
//     } else if (!realGame && (balance === '0.00' || balance < 1) && (expiration < new Date().getTime())) {
//       context.socket.send(JSON.stringify({ operation: 'get_free_bets', userID: cookies.user_id }))
//     }
//   }

//   function startGame () {
//     setStopWasPressed(false)
//     context.socket.send(JSON.stringify({
//       operation: 'start',
//       bet,
//       autoStop,
//       isReal: realGame,
//       userID: cookies.user_id,
//       session: cookies.session
//     }))

//     context.socket.onmessage = async e => {
//       const data = JSON.parse(e.data)
//       if (data.operation === 'started') {
//         // animation restart
//         const animation = document.getElementById('stars').style.animation
//         document.getElementById('stars').style.animation = 'none'
//         setTimeout(() => {
//           setFinalResult(0)
//           setGamePhase('started')
//           document.getElementById('stars').style.animation = animation
//         }, 50)
//       } else if (data.operation === 'stopped') {
//         setFinalResult(data.stop)
//         setGamePhase('stopped')

//         const newHistory = [{
//           crash: 'x',
//           bet: data.bet,
//           stop: data.stop,
//           profit: data.profit
//         }, ...historyGamesRef.current]

//         const newBalance = (parseFloat(balanceRef.current) + parseFloat(data.profit)).toFixed(2)
//         setBalance(newBalance)
//         balanceRef.current = newBalance
//         setGames(games + 1)
//         setWins(wins + 1)

//         if (autoMode) {
//           if (operationAfterWinRef.current === 'Increase Bet by') {
//             if (betRef.current * valueAfterWinRef.current > newBalance) {
//               betRef.current = newBalance
//             } else {
//               betRef.current *= valueAfterWinRef.current
//             }
//           } else {
//             if (valueAfterWinRef.current > newBalance) {
//               betRef.current = newBalance
//             } else {
//               betRef.current = valueAfterWinRef.current
//             }
//           }
//         }

//         setBet(betRef.current)
//         setHistoryGames(newHistory)
//         historyGamesRef.current = newHistory
//       } else if (data.operation === 'crashed') {
//         setFinalResult('Crashed...')
//         setGamePhase('crashed')

//         const newHistory = [{
//           crash: data.crash,
//           bet: data.bet,
//           stop: 'x',
//           profit: data.profit
//         }, ...historyGamesRef.current]

//         const newBalance = (parseFloat(balanceRef.current) + parseFloat(data.profit)).toFixed(2)
//         setBalance(newBalance)
//         balanceRef.current = newBalance

//         setGames(games + 1)
//         setLosses(losses + 1)

//         if (autoMode) {
//           if (operationAfterLossRef.current === 'Increase Bet by') {
//             if (betRef.current * valueAfterLossRef.current > newBalance) {
//               betRef.current = newBalance
//             } else {
//               betRef.current *= valueAfterLossRef.current
//             }
//           } else {
//             if (valueAfterLossRef.current > newBalance) {
//               betRef.current = newBalance
//             } else {
//               betRef.current = valueAfterLossRef.current
//             }
//           }
//         }

//         setBet(betRef.current)
//         setHistoryGames(newHistory)
//         historyGamesRef.current = newHistory
//       } else if (data.operation === 'free_bets') {
//         setExpiration(data.expiration)
//         const newBalance = parseFloat(balanceRef.current) + 3
//         balanceRef.current = newBalance
//         setBalance(newBalance)
//       }
//     }
//   }

//   function stopGame () {
//     setStopWasPressed(true)
//     context.socket.send(JSON.stringify({ operation: 'stop' }))
//   }

//   function renderHistory () {
//     return (
//       <>
//         <div className='index-history-head'>
//           <div className='title'>Bets History</div><div></div><div></div><div></div>
//           <div>Crash</div><div>Bet</div><div>Stop</div><div>Profit</div>
//         </div>
//         <div className='index-history-body'>
//           {historyGames.map(({ crash, bet, stop, profit }) => <><div>{crash}</div><div>{bet}</div><div>{stop}</div><div>{profit}</div></>)}
//         </div>
//       </>
//     )
//   }

//   return (
//     <div id='index'>
//       <div id='index-top-grid'>
//         <div id='index-score' style={loaderIsShown ? { opacity: '0.5' } : {}}>
//           <div className='title'>Score</div><div></div>
//           <div>Rating</div><div>{rank}  <Link to='/ranking'>See all</Link></div>
//           <div>Games</div><div>{games}</div>
//           <div>Wins</div><div>{wins}</div>
//           <div>Loss</div><div>{losses}</div>
//           <div style={!cookies.name ? { display: 'block' } : {}}>Please <Link to='/login'>login</Link> if you do not want to<br/>lose your Score after reloading the page.</div>
//         </div>

//         <div>
//           <div className='modal' ref={modalRef}>
//             <div className='message'>Please <Link to='/login'>login</Link> to get Free Bets. Please <Link to='/registration'>register</Link> if you don&apos;t have an account yet.</div>
//             <button className='modal-cancel-button' onClick={() => { modalRef.current.style.display = context.overlayRef.current.style.display = 'none' }}>Cancel</button>
//             <Link to='/login' className='modal-button' style={{ marginLeft: 8 + 'px' }}>Login</Link>
//             <Link to='/registration' className='modal-button'>Register</Link>
//             <div className='close' onClick={() => { modalRef.current.style.display = context.overlayRef.current.style.display = 'none' }}/>
//           </div>
//           <div id='index-balance' className={(balance === '0.00' || balance < 1) && !realGame && !loaderIsShown ? expiration < new Date().getTime() ? 'show-free-bets' : 'wait' : ''}>
//             <div>
//               Your Balance:
//             </div>
//             <div>
//               {loaderIsShown ? <img className='gif-loader' src='images/loader.gif'/> : balance}
//             </div>
//             {expiration < new Date().getTime() || !cookies.name
//               ? <div onClick={getFreeBets}>
//                 GET FREE BETS!
//               </div>
//               : <div>
//                 You can claim Free Bets in <TimerSpan expiration={expiration}/>
//               </div>
//             }
//           </div>
//           <Game finalResult={finalResult} gamePhase={gamePhase} realGame={realGame} setRealGame={setRealGame} setLoaderIsShown={setLoaderIsShown}/>
//         </div>

//         <div id='index-history' style={loaderIsShown ? { opacity: '0.5' } : {}}>
//           {renderHistory()}
//         </div>

//       </div>

//       <div id='index-operations' className={autoMode ? 'auto-mode' : ''}>
//         <div></div>
//         <div className='index-operations-top'>Bet</div>
//         <div className='index-operations-top'>Auto Stop</div>
//         <div></div>

//         <div id='index-toggle-auto'>
//           <span className={!autoMode ? 'selected' : ''} onClick={() => { setAutoMode(false) }}>Manual</span>
//           <Switch checked={autoMode} onChange={e => setAutoMode(e.target.checked)}/>
//           <span className={autoMode ? 'selected' : ''} onClick={() => { setAutoMode(true) }}>Auto</span>
//         </div>
//         <InputNumber InputProps={{ value: bet, min: 1, step: 1, onChange: e => { setBet(parseFloat(e.target.value)) } }}/>
//         <InputNumber InputProps={{ value: autoStop, min: 1.01, max: 100, step: 1, onChange: e => { stopGame(); setAutoStop(parseFloat(e.target.value)) } }}/>
//         {gamePhase !== 'started' ? <button onClick={startGame} disabled={balance === '0.00' || bet < 1 || autoStop < 1.01 || balance < 1 || isNaN(bet) || isNaN(autoStop) || isNaN(valueAfterWin) || isNaN(valueAfterLoss)}>{betButtonText}</button> : <button onClick={stopGame}>Stop</button>}

//         <div></div>
//         <div className='index-operations-bottom'>Minimal Bet is 1 μBTC</div>
//         <div className='index-operations-bottom'>Auto Cash Out when this amount will be reached</div>
//         <div></div>

//         {autoMode
//           ? <>
//             <div></div>
//             <div className='index-operations-top'>If Loss</div>
//             <div className='index-operations-top'>{operationAfterLoss === 'Increase Bet by' ? 'Coefficient' : 'Base Bet'}</div>
//             <div></div>

//             <div></div>
//             <DropDown label={operationAfterLoss} content={['Return to base Bet']} onChange={e => { setOperationAfterLoss(e) }}/>
//             <InputNumber InputProps={{ value: valueAfterLoss, min: 1, step: 1, onChange: e => { setValueAfterLoss(parseFloat(e.target.value)) } }}/>
//             <div></div>

//             <div></div>
//             <div className='index-operations-top'>If Win</div>
//             <div className='index-operations-top'>{operationAfterWin === 'Increase Bet by' ? 'Coefficient' : 'Base Bet'}</div>
//             <div></div>

//             <div></div>
//             <DropDown label={operationAfterWin} content={['Increase Bet by']} onChange={ e => { setOperationAfterWin(e) } }/>
//             <InputNumber InputProps={{ value: valueAfterWin, min: 1, step: 1, onChange: e => { setValueAfterWin(parseFloat(e.target.value)) } }}/>
//             <div></div>
//           </>
//           : <></>}
//       </div>

//       <div>
//         <GoogleAds/>
//       </div>

//       <div id='index-history-mobile'>
//         {renderHistory()}
//       </div>

//       <div id='index-bottom-grid'>
//         <span><h2>How to Play?</h2></span>
//         <span><h2>Functional</h2></span>
//         <span>Place your Bet and press the button to launch the Rocket! While the Rocket is flying, the multiplier increases your stake. Click the button again to cash out your profits! But be careful, because the Rocket can crash at any moment and if it does, you will lose your Bet!</span>
//         <span>You can play with Virtual or Real Bets manually or automatically set Bets. In both cases, you can use the Auto Stop function to automatically withdraw profits. 1 Real Bet is equal to 1 μBTC. You can buy Bets for BTC and withdraw profits to your account at any time!</span>
//       </div>
//     </div>
//   )
// })
