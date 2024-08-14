/* eslint-disable react/prop-types */
import { ACCELERATION } from '../utils/globals'
import AppContext from './AppContext'
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import Switch from './Switch'
import { useCookies } from 'react-cookie'
import "../css_generated/Game.css"
import { Img } from '../assets/image'

export default memo(function Game ({ gamePhase, finalResult, realGame, setRealGame, setLoaderIsShown, amount = 10.00,isMounted }) {
  const context = useContext(AppContext);
  const cookiesData = useCookies(['user_id', 'session']);
  const [cookies] = !context.ssrFlag ? cookiesData : [context.cookies];

  const modalRef = useRef()

  const [currentResult, setCurrentResult] = useState(1)
  const [timerHandler, setTimerHandler] = useState()
  const [counterNumber, setCounterNumber] =useState(0);
  const [counterFlag, setCounterFlag] = useState(false);
  const counterItem = [Img.go, Img.counter1, Img.counter2, Img.counter3];

   if (gamePhase === 'stopped') {
    clearInterval(timerHandler)
  } 

  useEffect(() => {
    let isMounted = true
    let timer = 0

    if (gamePhase === 'started') {
      if(!counterFlag){
      setCounterNumber(4)
      setTimeout(() => { setCounterNumber(3) }, 1000)
      setTimeout(() => { setCounterNumber(2) }, 2000)
      setTimeout(() => { setCounterNumber(1) }, 3000)
      setTimeout(() => { 
        setCounterNumber(0);
        setCounterFlag(true) 
      }, 4000)}
     
        counterFlag && setTimerHandler(setInterval(() => {
        timer += 100
        if (isMounted) {
          try {
            setCurrentResult((ACCELERATION * timer * timer / 2 + 1).toFixed(2))
          } catch (e) {
            // eslint-disable-next-line no-self-assign
            document.location.href = document.location.href
          }
        }
      }, 100))
    } else if (gamePhase === 'stopped' || gamePhase === 'crashed') {
      clearInterval(timerHandler)
      setCounterFlag(false)
    }

    
  }, [gamePhase,counterFlag])

  useEffect(() => () => {
    
    if (gamePhase === 'stopped'){
    document.getElementById('stars1').style.animationPlayState =
    document.getElementById('stars2').style.animationPlayState =
    document.getElementById('stars3').style.animationPlayState =
    document.getElementById('stars').style.animationPlayState = 'paused'
  }
  }, [])

  function generateGauge () {
    const price = 0.5
    let first= price - currentResult % price
    first = !(currentResult % price) ? 0 : first
    const  second = first + price
    const  third = second + price
    let isFirstWide = currentResult % 1 > 0.5
    isFirstWide = currentResult < 1.01 ? true : isFirstWide
    const isThirdWide = isFirstWide
    const isSecondWide = !isFirstWide
    
    return (
      <div className='relative'>
        <div
          className = { + isFirstWide ? 'game-gauge-wide' : 'game-gauge-narrow '}
          style = {{ bottom: first * 75 + '%' }}>
          {isFirstWide ? <span>x{Math.ceil(currentResult)}</span> : <></>}
        </div>
        <div
          className = { isSecondWide ? 'game-gauge-wide' : 'game-gauge-narrow'}
          style = {{ bottom: second * 75 + '%' }}>
          {isSecondWide ? <span>x{Math.ceil(currentResult)}</span> : <></>}
        </div>
        <div
          className = { isThirdWide ? 'game-gauge-wide' : 'game-gauge-narrow'}
          style = {{ bottom: third * 75 + '%' }}>
          {isThirdWide ? <span>x{Math.ceil(currentResult) + 1}</span> : <></>}
        </div>
      </div>
    )
  }

  function switchChanged (e) {
    if (e.target.checked && !cookies.name) {
      modalRef.current.style.display = 'block'
    } else {
      setRealGame(e.target.checked)
      setLoaderIsShown(true)
    }
  }

  let score = finalResult === 'Crashed...' ? 'Crashed...' : finalResult || currentResult

  if (typeof window !== 'undefined') {
    // document.getElementById('stars1').style.animationPlayState =
    // document.getElementById('stars2').style.animationPlayState =
    // document.getElementById('stars3').style.animationPlayState =
    // document.getElementById('stars').style.animationPlayState = gamePhase === 'started' ? 'running' : 'paused'

    try {
      if (currentResult >= 1.2) {
        document.getElementById('index-bottom-grid').classList.add('dark-mode')
        document.querySelectorAll('#index-operations > div:not(.dropdown), #index-operations span:not(.d-d)').forEach(item => { item.style.color = 'lightgray'; item.style.transition = 'color 2s' })
      } else {
        document.getElementById('index-bottom-grid').classList.remove('dark-mode')
        document.querySelectorAll('#index-operations > div:not(.dropdown), #index-operations span:not(.d-d)').forEach(item => { item.style.color = 'black' })
      }

      if (currentResult >= 1.2) {
        document.querySelector('footer').classList.add('dark-mode')
      } else {
        document.querySelector('footer').classList.remove('dark-mode')
      }
    } catch (e) {

    }
  }

  const comments = ['WoW!', 'Cool!', 'Amazing!', 'Awesome!', "That's Hot!", 'You are Epic!']

  let comment ;
  let commentImg = Img.wow;
  
  if (score >= 3 && score <= 3.2) {
    comment = comments[0]
  } else if (score >= 3 && score <= 3.2) {
    comment = comments[1]
  } else if (score >= 5 && score <= 5.3) {
    comment = comments[2]
  } else if (score >= 10 && score <= 10.4) {
    comment = comments[3]
  } else if (score >= 15 && score <= 15.5) {
    comment = comments[4]
  } else if (score >= 20 && score <= 20.75) {
    comment = comments[5]
  }

  if (score >= 25 && (score % 5 <= 1)) {
    comment = comments[Math.floor(score / 5) % 5]
  }

  if (score.toString().indexOf('.') === -1) {
    score += '.00'
  }
  

  score = score === 'Crashed...' ? 'Crashed...' : `x${score}`

  return (
    <div id='game' className='flex-auto flex flex-col h-full justify-between items-center"'>

      {/* <div id='game-toggle'>
        <span className={!realGame ? 'selected' : ''} onClick={() => { switchChanged({ target: { checked: false } }) }}>Virtual</span>
        <Switch checked={realGame} onChange={switchChanged}/>
        <span className={realGame ? 'selected' : ''} onClick={() => { switchChanged({ target: { checked: true } }) }}>Real</span>
      </div> */}
      <div className='flex flex-col items-center justify-between'>
        <div className="flex gap-2 items-center justify-center font-extrabold ">
          <img src = {Img.coin} width={44} height={44} className="max-w-11 h-11" alt = "coin" />
          <p className="text-[40px] text-white font-extrabold">{amount.toFixed(2)}</p>
        </div>
        {counterNumber<5 &&counterNumber?<img className=' start_waiting ' src={counterItem[counterNumber-1]} width={56} height={56}/>:""}
        {gamePhase === 'started' && counterNumber === 0 &&  <div className=' text-2xl leading-7 mt-6 text-white font-roboto text-center'>{score}</div>}
        <div className='items-center justify-center h-fit'>
          {comment && <img src={commentImg} height={43} className=' max-w-fit h-11'/>}
        </div>
        </div>  
        
      
      <div className='flex items-center'>
      {counterNumber===0 && gamePhase === 'started' 
        ? <img
          id='game-rocket'
          src='/image/rocket-active.svg'
          className='shaking active'/>
        : gamePhase === 'crashed'
          ? <img
            id='game-rocket'
            src='/image/rocket-explosed.svg'
            className='explosed'/>
          : <img
            id='game-rocket'
            src='/image/rocket-inactive.svg'
            className='inactive'/>}
      </div>
      
      
            
      <div id='game-gauge' className='left'>
        {generateGauge()}
      </div>
      <div id='game-gauge' className='right'>
        {generateGauge()}
      </div>
    </div>
  )
})
