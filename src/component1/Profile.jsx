/* eslint-disable react/prop-types */
import Account from './Account'
import Affilate from './Affilate'
import AppContext from './AppContext'
import Deposit from './Deposit'
import { Link, Route } from 'react-router-dom'
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import Security from './Security'
import Support from './Support'
import { useCookies } from 'react-cookie'
import Withdraw from './Withdraw'

export default memo(function Profile ({ initialPage }) {
  const context = useContext(AppContext)

  const [cookies, , removeCookie] = !context.ssrFlag ? useCookies(['name', 'user_id', 'session']) : [context.cookies]

  const [subPage, setSubPage] = useState(!context.ssrFlag ? window.location.pathname.split('/').pop() : '')

  const [myData, setMyData] = useState({})

  const profileMenuRef = useRef()

  function getStyle (page) {
    return subPage === page ? { fontWeight: 'bold' } : {}
  }

  useEffect(() => {
    let isMounted = true
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch('/users_info', { method: 'POST', body: JSON.stringify({ a: 0 }), headers })
      .then(res => Promise.all([res.status, res.json()]))
      .then(([status, data]) => {
        if (isMounted) {
          try {
            setMyData(data.allUsersData
              .sort((a, b) => b.balance.real - a.balance.real)
              .map((i, index) => { i.rank = index + 1; return i })
              .filter(i => i.name === cookies.name)[0])
          } catch (e) {
            // eslint-disable-next-line no-self-assign
            document.location.href = document.location.href
          }
        }
      })
    return () => { isMounted = false }
  }, [])

  function logout () {
    const userId = cookies.user_id
    const session = cookies.session

    Object.keys(cookies).forEach(key => {
      removeCookie(key)
    })

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch('/logout', { method: 'POST', body: JSON.stringify({ userId, session }), headers })
    history.push('/')
  }

  function closeModal () {
    profileMenuRef.current.style.display = 'none'
  }

  return (
    <div id='profile'>
      <div id='profile-menu-modal-mobile' ref={profileMenuRef} className='modal modal-menu'>
        <Link to='/'><img src='images/logo.svg' height={40} onClick={() => { closeModal() }}/></Link>
        <Link to='/profile/account' onClick={() => { setSubPage('account'); closeModal() }} style={getStyle('account')}>Account</Link>
        <Link to='/profile/security' onClick={() => { setSubPage('security'); closeModal() }} style={getStyle('security')}>Security</Link>
        <Link to='/profile/deposit' onClick={() => { setSubPage('deposit'); closeModal() }} style={getStyle('deposit')}>Deposit</Link>
        <Link to='/profile/withdraw' onClick={() => { setSubPage('withdraw'); closeModal() }} style={getStyle('withdraw')}>Withdraw</Link>
        <Link to='/profile/affilate' onClick={() => { setSubPage('affilate'); closeModal() }} style={getStyle('affilate')}>Affilate</Link>
        <Link to='/profile/support' onClick={() => { setSubPage('support'); closeModal() }} style={getStyle('support')}>Support</Link>
        <Link to='/' onClick={() => { logout(); closeModal() }}>Logout</Link>

        <div className='close' onClick={() => { closeModal() }}/>
      </div>

      <div className='page-background'>
        <h1>Personal Account</h1>

        <img id='profile-menu-button-mobile' src='images/mobile-menu-blue.svg' onClick={() => {
          profileMenuRef.current.style.display = 'block'
        }}/>

        <div className='page-horizontal-flexbox'>
          <div>
            <Link to='/profile/account' onClick={() => setSubPage('account')} style={getStyle('account')}>Account</Link>
            <Link to='/profile/security' onClick={() => setSubPage('security')} style={getStyle('security')}>Security</Link>
            <Link to='/profile/deposit' onClick={() => setSubPage('deposit')} style={getStyle('deposit')}>Deposit</Link>
            <Link to='/profile/withdraw' onClick={() => setSubPage('withdraw')} style={getStyle('withdraw')}>Withdraw</Link>
            <Link to='/profile/affilate' onClick={() => setSubPage('affilate')} style={getStyle('affilate')}>Affilate</Link>
            <Link to='/profile/support' onClick={() => setSubPage('support')} style={getStyle('support')}>Support</Link>
            <Link to='/' onClick={logout}>Logout</Link>
          </div>
          <div>
            <Route path={'/profile/account'}>
              <Account myData={myData}/>
            </Route>
            <Route path={'/profile/security'}>
              <Security/>
            </Route>
            <Route path={'/profile/deposit'}>
              <Deposit btcAddress={myData.btc ? myData.btc.wallet.publicAddress : ''}/>
            </Route>
            <Route path={'/profile/withdraw'}>
              <Withdraw/>
            </Route>
            <Route path={'/profile/affilate'}>
              <Affilate referral={myData.referral}/>
            </Route>
            <Route path={'/profile/support'}>
              <Support fromProfile/>
            </Route>
          </div>
        </div>
      </div>

    </div>
  )
})
