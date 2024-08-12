import React from 'react'
import { Link } from 'react-router-dom'

export default function About () {
  return (
    <div id='about'>
      <div className='page-background'>
        <h1>About</h1>
        <span className='page-text'>
          <p>This is a game just for fun, but also you can earn the money playing this game. You can play with Virtual or Real Bets. 1 Real Bet is equal to 1 μBTC. Please read our Terms and Privacy Policy before play the game.</p>
          <p>If you have any questions or suggestions please contact us at <a href='mailto:support@rocket-x.io'>support@rocket-x.io</a> or use our <Link to='/support'>contact form</Link>.</p></span>
      </div>
    </div>
  )
}
