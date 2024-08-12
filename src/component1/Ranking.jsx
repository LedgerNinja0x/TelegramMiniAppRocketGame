import AppContext from './AppContext'
import Pagination from './Pagination'
import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

export default function Ranking () {
  const context = useContext(AppContext)

  const [cookies] = !context.ssrFlag ? useCookies(['name', 'user_id', 'session']) : [context.cookies]

  const perPage = 10

  const [rankingStats, setRankingStats] = useState([])
  const [shownRankingStats, setShownRankingStats] = useState([])

  useEffect(() => {
    let isMounted = true
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch('/users_info', { method: 'POST', body: JSON.stringify({ a: 0 }), headers })
      .then(res => Promise.all([res.status, res.json()]))
      .then(([status, data]) => {
        if (isMounted) {
          let newRankingStats = data.allUsersData.map(i => {
            return {
              name: i.name,
              virtual: {
                games: i.gamesHistory.virtual.length,
                wins: i.gamesHistory.virtual.filter(i => i.crash === 'x').length,
                loss: i.gamesHistory.virtual.filter(i => i.crash !== 'x').length,
                balance: parseFloat(i.balance.virtual).toFixed(2)
              },
              real: {
                games: i.gamesHistory.real.length,
                wins: i.gamesHistory.real.filter(i => i.crash === 'x').length,
                loss: i.gamesHistory.real.filter(i => i.crash !== 'x').length,
                balance: parseFloat(i.balance.real).toFixed(2)
              }
            }
          })

          newRankingStats.sort((a, b) => b.real.balance - a.real.balance)

          newRankingStats = newRankingStats.map((i, index) => {
            i.rank = index + 1
            return i
          })

          setRankingStats([...newRankingStats])
          setShownRankingStats([...newRankingStats.slice(0, perPage)])
        }
      })
    return () => { isMounted = false }
  }, [])

  return (
    <div id='ranking'>
      <div className='page-background'>
        <h1>Ranking</h1>
        {cookies.name ? <span className='page-text'>
          {`Hi, ${cookies.name}!`}
          <div className='grid-rank'>
            <div><strong>Your Rank:</strong></div>
            <div>{rankingStats.length ? rankingStats.filter(i => i.name === cookies.name)[0].rank : ''}</div>
          </div>
        </span> : <></>}

        <div className='profile-table'>
          <div className='profile-table-header'>Rank</div><div className='profile-table-header'>Login</div><div className='profile-table-header'>Games (R / V)</div><div className='profile-table-header'>Win (R / V)</div><div className='profile-table-header'>Loss (R / V)</div><div className='profile-table-header'>Balance (R / V)</div>
          {shownRankingStats.map((i, index) => {
            const style = i.name === cookies.name ? { fontWeight: 'bold' } : {}
            const className_ = !(index % 2) ? 'odd' : ''
            return <>
              <div style={style} className={className_}>{i.rank}</div>
              <div style={style} className={className_}>{i.name}</div>
              <div style={style} className={className_}>{i.real.games} / {i.virtual.games}</div>
              <div style={style} className={className_}>{i.real.wins} / {i.virtual.wins}</div>
              <div style={style} className={className_}>{i.real.loss} / {i.virtual.loss}</div>
              <div style={style} className={className_}>{i.real.balance} / {i.virtual.balance}</div>
            </>
          })}
        </div>
        <Pagination
          data={rankingStats}
          perPage={perPage}
          setShownData={setShownRankingStats}
        />
        <div style={{ marginTop: 10 + 'px' }}>
          <small>* R / V - Real / Virual balances.</small>
        </div>
      </div>
    </div>
  )
}
