/* eslint-disable react/prop-types */
import AppContext from './AppContext'
import React, { memo, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Pagination from './Pagination'

export default memo(function Affilate ({ referral }) {
  const context = useContext(AppContext)
  const cookies = !context.ssrFlag ? useCookies(['name'])[0] : context.cookies

  const [tab, setTab] = useState('referrals')

  const [referrals, setReferrals] = useState([])
  const [incomes, setIncomes] = useState([])

  const [shownReferrals, setShownReferrals] = useState([])
  const [shownIncomes, setShownIncomes] = useState([])
  const perPage = 10

  useEffect(() => {
    let isMounted = true
    fetch(`/incomes_from_referrals/${cookies.name}`)
      .then(data => data.json())
      .then(json => {
        const newIncomes = [...incomes]
        json.data.forEach((i, index) => {
          newIncomes.push({ num: index + 1, date: new Date(i.date).toLocaleDateString('en-US'), login: i.name, amount: i.amount.toFixed(10) })
          if (isMounted) {
            try {
              setIncomes(newIncomes)
              setShownIncomes([...newIncomes.slice(0, perPage)])
            } catch (e) {
              // eslint-disable-next-line no-self-assign
              document.location.href = document.location.href
            }
          }
        })
      })

    fetch(`/guests/${cookies.name}`)
      .then(data => data.json())
      .then(json => {
        const newReferrals = [...referrals]
        json.data.forEach((i, index) => {
          newReferrals.push({ num: index + 1, date: new Date(i.date).toLocaleDateString('en-US'), login: i.name, email: i.email, activated: i.activated })
          if (isMounted) {
            try {
              setReferrals(newReferrals)
              setShownReferrals([...newReferrals.slice(0, perPage)])
            } catch (e) {
              // eslint-disable-next-line no-self-assign
              document.location.href = document.location.href
            }
          }
        })
      })
    return () => { isMounted = false }
  }, [])

  function copy () {
    document.querySelector('#profile-affilate input').select()
    document.execCommand('copy')
  }

  let earned = 0
  incomes.forEach(i => { earned += parseFloat(i.amount) })
  earned = earned.toFixed(10)

  return (
    <div id='profile-affilate'>
      <h2>Affilate</h2>

      <span className='profile-text'>Share you referral link, attract new users and you will receive 3% for every deposit of your referrals.</span>

      <span className='profile-label'>Referral link</span>

      <input type='text' readOnly defaultValue={`https://rocket-x.io/?ref=${referral}`}/><button className='button-filled' onClick={copy}>COPY</button>

      <div id='profile-affilate-grid'>
        <div>Earned:</div>
        <div>{earned}</div>
      </div>

      <div id='profile-affilate-tabs'>
        <div onClick={() => setTab('referrals')} className={tab === 'referrals' ? 'selected' : ''}>Referrals</div>
        <div onClick={() => setTab('incomes')} className={tab === 'incomes' ? 'selected' : ''}>Incomes</div>
      </div>

      {tab === 'referrals'
        ? <><div className='profile-table profile-table-referrals'>
          <div className='profile-table-header'>№</div>
          <div className='profile-table-header'>Date</div>
          <div className='profile-table-header'>Login</div>
          <div className='profile-table-header'>Email</div>
          <div className='profile-table-header'>Activated</div>
          {shownReferrals.map(({ num, date, login, email, activated }, index) => {
            const className = !(index % 2) ? 'odd' : ''
            return (
              <>
                <div className={className}>{num}</div>
                <div className={className}>{date}</div>
                <div className={className}>{login}</div>
                <div className={className}>{email}</div>
                <div className={className}>{activated ? <img src='images/complete.svg'/> : <></>}</div>
              </>)
          })}
        </div>
        <Pagination
          data={referrals}
          perPage={perPage}
          setShownData={setShownReferrals}
        />
        </>
        : <><div className='profile-table profile-table-incomes'>
          <div className='profile-table-header'>№</div>
          <div className='profile-table-header'>Date</div>
          <div className='profile-table-header'>Login</div>
          <div className='profile-table-header'>Amount</div>
          {shownIncomes.map(({ num, date, login, amount }, index) => {
            const className = !(index % 2) ? 'odd' : ''
            return (
              <>
                <div className={className}>{num}</div>
                <div className={className}>{date}</div>
                <div className={className}>{login}</div>
                <div className={className}>{amount}</div>
              </>)
          })}
        </div>
        <Pagination
          data={incomes}
          perPage={perPage}
          setShownData={setShownIncomes}
        /></>
      }
    </div>
  )
})
