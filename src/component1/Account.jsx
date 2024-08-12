/* eslint-disable react/prop-types */
import AppContext from './AppContext'
import { Link } from 'react-router-dom'
import React, { memo, useContext } from 'react'
import { useCookies } from 'react-cookie'

export default memo(function Account ({ myData }) {
  const context = useContext(AppContext)

  const [cookies] = !context.ssrFlag ? useCookies(['name']) : [context.cookies]

  const myHistory = myData.gamesHistory ? myData.gamesHistory : { virtual: [], real: [] }

  const profit = {
    virtual: 0,
    real: 0
  }

  myHistory.virtual.forEach(i => { profit.virtual += parseFloat(i.profit) })
  myHistory.real.forEach(i => { profit.real += parseFloat(i.profit) })

  profit.virtual = parseFloat(profit.virtual).toFixed(2)
  profit.real = parseFloat(profit.real).toFixed(2)

  return (
    <div id='profile-account'>
      <h2>Account</h2>

      <span className='page-text'>
        {`Hi, ${cookies.name}!`}
        <div className='grid-rank'>
          <div>Your Rank:</div>
          <div>{myData.rank}</div>
        </div>
        <Link to='/ranking'>See all</Link>
      </span>

      <div className='profile-table'>
        <div className='profile-table-header'></div>
        <div className='profile-table-header'>Virtual</div>
        <div className='profile-table-header'>Real</div>
        <div className='profile-table-header'></div>

        <div className='odd'>Balance</div>
        <div className='odd'>{myData && myData.balance ? parseFloat(myData.balance.virtual).toFixed(2) : ''}</div>
        <div className='odd'>{myData && myData.balance ? parseFloat(myData.balance.real).toFixed(2) : ''}</div>
        <div className='odd'>
          <Link to='/profile/deposit' className='profile-table-textlink'>Deposit</Link>
          <Link to='/profile/deposit' className='profile-table-imagelink'><img alt='Deposit' src='images/deposit.svg'/></Link>
        </div>

        <div>Games played</div>
        <div>{myHistory.virtual.length}</div>
        <div>{myHistory.real.length}</div>
        <div></div>

        <div className='odd'>Wins</div>
        <div className='odd'>{myHistory.virtual.filter(i => i.crash === 'x').length}</div>
        <div className='odd'>{myHistory.real.filter(i => i.crash === 'x').length}</div>
        <div className='odd'></div>

        <div>Loss</div>
        <div>{myHistory.virtual.filter(i => i.crash !== 'x').length}</div>
        <div>{myHistory.real.filter(i => i.crash !== 'x').length}</div>
        <div></div>

        <div className='odd'>Claims / Deposits</div>
        <div className='odd'></div>
        <div className='odd'></div>
        <div className='odd'></div>

        <div>Profit</div>
        <div>{profit.virtual}</div>
        <div>{profit.real}</div>
        <div>
          <Link to='/profile/withdraw' className='profile-table-textlink'>Withdraw</Link>
          <Link to='/profile/withdraw' className='profile-table-imagelink'><img alt='Withdraw' src='images/withdraw.svg'/></Link>
        </div>
      </div>
    </div>
  )
})
