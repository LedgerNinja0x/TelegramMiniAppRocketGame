/* eslint-disable react/prop-types */
import React, { memo } from 'react'

export default memo(function FAQ () {
  return (
    <div id='faq'>
      <div className='page-background'>
        <h1>Frequently Asked Questions</h1>

        <div className='page-horizontal-flexbox'>
          <div>
            <a href="#bets">What is a bet?</a>
            <a href="#free">Is it free?</a>
            <a href="#earn">Can I earn the money?</a>
            <a href="#buy">How to buy bets?</a>
            <a href="#withdraw">How to withdraw profit?</a>
          </div>
          <div>
            <h3><a name="bets"></a>What is a bet?</h3>
            <p>1 Virtual Bet is minimum unit for bet. 1 Real Bet is equal to 1 μBTC.</p>
            <h3><a name="free"></a>Is it free?</h3>
            <p>1 Virtual Bet is minimum unit for bet. 1 Real Bet is equal to 1 μBTC.</p>
            <h3><a name="earn"></a>How can I get free bits?</h3>
            <p>Yes you can play the game for free with the Virtual Balance. By the way you can claim free Bets every hour if your balance will be 0.</p>
            <h3><a name="buy"></a>How to buy bets?</h3>
            <p>Yes, you can earn BTC if you play with real balance. Also you can use the referral link to attract new users - you will receive 3% for every deposit of your referrals.</p>
          </div>
        </div>
      </div>

    </div>
  )
})
