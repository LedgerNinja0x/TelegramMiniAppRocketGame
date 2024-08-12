/* eslint-disable react/prop-types */
import AppContext from './AppContext'
import InputNumber from './InputNumber'
import Pagination from './Pagination'
import React, { memo, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

export default memo(function Withdraw () {
  const context = useContext(AppContext)
  const cookies = !context.ssrFlag ? useCookies(['name'])[0] : context.cookies

  const [withdrawHistory, setWithdrawHistory] = useState([])
  const [shownWithdrawHistory, setShownWithdrawHistory] = useState([])

  const perPage = 10

  const [amount, setAmount] = useState()
  const [password, setPassword] = useState()
  const [address, setAddress] = useState()
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    let isMounted = true
    fetch(`/withdraws/${cookies.name}`)
      .then(response => response.json())
      .then(json => {
        if (isMounted) {
          try {
            setWithdrawHistory(json.data)
            setBalance(json.balance)
          } catch (e) {
            // eslint-disable-next-line no-self-assign
            document.location.href = document.location.href
          }
        }
      })
    return () => { isMounted = false }
  }, [])

  function withdraw () {
    if (amount < 100) {
      alert('Min 100 Bits!')
    } else if (amount > balance) {
      alert('Insufficient Funds!')
    } else {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      fetch('/withdraw', { method: 'POST', body: JSON.stringify({ password, address, amount }), headers })
        .then(res => res.json())
        .then(json => {
          const newWithdrawHistory = [...withdrawHistory]
          newWithdrawHistory.push(json.data)
          setWithdrawHistory(newWithdrawHistory)
          setShownWithdrawHistory([...newWithdrawHistory.slice(0, perPage)])
        })
    }
  }

  return (
    <div id='profile-withdraw'>
      <h2>Withdraw</h2>

      <span className='profile-text'>{`Available: ${balance} Bits`}</span>
      <span className='profile-label'>Bits Amount</span>
      <InputNumber InputProps={{ placeholder: 'min 100 bits', min: 100, value: amount, onChange: e => { setAmount(e.target.value) } }}/>
      <span className='profile-label'>BTC address</span>
      <input type='text' value={address} onChange={e => setAddress(e.target.value)}/>
      <span className='profile-label'>Password</span>
      <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
      <button className='button-outlined' onClick={withdraw}>Request</button>
      <h3>Withdraw History</h3>
      <div className='profile-table'>
        <div className='profile-table-header'>Date</div><div className='profile-table-header'>Amount</div><div className='profile-table-header'>BTC Address</div>
        {shownWithdrawHistory.map(({ date, amount, address }, index) => {
          const className = !(index % 2) ? 'odd' : ''
          return (
            <>
              <div className={className}>{new Date(date).toLocaleDateString('en-US')}</div>
              <div className={className}>{amount}</div>
              <div className={className}>{address}</div></>
          )
        })}
      </div>
      <Pagination
        data={withdrawHistory}
        perPage={perPage}
        setShownData={setShownWithdrawHistory}
      />
    </div>
  )
})
