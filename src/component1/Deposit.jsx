/* eslint-disable react/prop-types */
import AppContext from './AppContext'
import Pagination from './Pagination'
import React, { memo, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

export default memo(function Deposit ({ btcAddress }) {
  const context = useContext(AppContext)
  const cookies = !context.ssrFlag ? useCookies(['name'])[0] : context.cookies

  const [deposits, setDeposits] = useState([])
  const [shownDeposits, setShownDeposits] = useState([])
  const perPage = 10

  useEffect(() => {
    let isMounted = true
    fetch(`/deposits/${cookies.name}`)
      .then(response => response.json())
      .then(json => {
        json.data.forEach(i => {
          const newDeposits = [...deposits]
          newDeposits.push({ date: i.date, amount: i.amount, transactionId: i.id })
          if (isMounted) {
            try {
              setDeposits(newDeposits)
              setShownDeposits([...newDeposits.slice(0, perPage)])
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
    document.querySelector('#profile-deposit input').select()
    document.execCommand('copy')
  }

  return (
    <div id='profile-deposit'>
      <h2>Deposit</h2>

      <span className='profile-text'>Send your BTC to the address (commission 1500 satoshi):</span>
      <input type='text' readOnly defaultValue={btcAddress}/><button className='button-filled' onClick={copy}>COPY</button>
      <h3>Deposits history</h3>
      <div className='profile-table'>
        <div className='profile-table-header'>Date</div><div className='profile-table-header'>Amount</div><div className='profile-table-header'>Transaction ID</div>
        {shownDeposits.map(({ date, amount, transactionId }, index) => {
          const className = !(index % 2) ? 'odd' : ''
          return (
            <>
              <div className={className}>{new Date(date).toLocaleDateString('en-US')}</div>
              <div className={className}>{parseFloat(amount).toFixed(10)}</div>
              <div className={className}>{transactionId}</div>
            </>)
        })}
      </div>
      <Pagination
        data={deposits}
        perPage={perPage}
        setShownData={setShownDeposits}
      />
    </div>
  )
})
