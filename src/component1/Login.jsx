import AppContext from './AppContext'
import { Link, useHistory } from 'react-router-dom'
import React, { useContext, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'

/**
 * Login page. URL: /login
 */
export default function Login () {
  const context = useContext(AppContext)

  const setCookie = useCookies([])[1]

  const modalRef = useRef()

  const [letterWasSent, setLetterWasSent] = useState(false)

  /**
   * @type {string} Username or email address
   */
  const [loginState, setLoginState] = useState('')

  /**
   * @type {string} User password
   */
  const [passwordState, setPasswordState] = useState('')

  /**
   * @type {bool} Invalid username or email address flag
   */
  const [loginErrorState, setLoginErrorState] = useState(false)

  /**
   * @type {bool} Invalid password flag
   */
  const [passwordErrorState, setPasswordErrorState] = useState(false)

  const history = useHistory()

  /**
   * User sign in
   */
  function login () {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch('/login', { method: 'POST', body: JSON.stringify({ login: loginState, password: passwordState }), headers })
      .then(res => Promise.all([res.status, res.json()]))
      .then(([status, data]) => {
        if (status < 200 || status >= 300) {
          if (data.error === 'login') {
            setLoginErrorState(true)
            setPasswordErrorState(false)
          } else if (data.error === 'password') {
            setPasswordErrorState(true)
            setLoginErrorState(false)
          } else if (data.error === 'confirmation') {
            context.overlayRef.current.style.display = 'block'
            modalRef.current.style.display = 'block'
          }
        } else {
          ['name', 'email', 'session', 'avatar'].forEach(i => {
            setCookie(i, data[i])
          })
          setCookie('user_id', data._id)
          history.push('/profile/account')
        }
      })
  }

  return (
    <div id='login'>
      <div className='modal' ref={modalRef} style={{ marginTop: '32px' }}>
        {!letterWasSent
          ? <>
            <h2>Access denied!</h2>
            <p>Please, confirm your registration by clicking on the link that was sent to you on the email during the registration.</p>
            <button className='modal-button' onClick={() => {
              const headers = new Headers()
              headers.append('Content-Type', 'application/json')
              fetch('/resend_letter', { method: 'POST', body: JSON.stringify({ email: loginState }), headers })
              setLetterWasSent(true)
            }}>Resend Letter</button>
            <button className='modal-cancel-button' onClick={() => {
              context.overlayRef.current.style.display = 'none'
              modalRef.current.style.display = 'none'
              history.push('/')
            }}>Cancel</button>
          </>
          : <>
            <h2>Success!</h2>
            <p>An email with a link to confirm your registration has been successfully sent. Please check your email now.</p>
            <button className='modal-button' onClick={() => {
              context.overlayRef.current.style.display = 'none'
              modalRef.current.style.display = 'none'
              history.push('/')
              setLetterWasSent(false)
            }}>Ok</button>
          </>}

        <div className='close' onClick={() => {
          context.overlayRef.current.style.display = 'none'
          modalRef.current.style.display = 'none'
          history.push('/')
        }}/>

      </div>

      <div className='page-background'>
        <h1>Login</h1>
        <div className='page-flexbox'>
          <span className='page-flexbox-title'>Email</span>
          <div>
            <input
              type = 'text'
              onChange = {event => setLoginState(event.target.value)}/>
            <span className='error-label' hidden={!loginErrorState}>Wrong login</span>
          </div>
          <span className='page-flexbox-title'>Password</span>
          <div>
            <input
              type = 'password'
              onChange = {event => setPasswordState(event.target.value)}/>
            <span className='error-label' hidden={!passwordErrorState}>Wrong password</span>
          </div>
          <button onClick={login} disabled={loginState.length < 4 || passwordState.length < 8}>Login</button>
          <span className='page-flexbox-blind'>Forgot your password? <Link to='/recovery'>Recovery</Link>.<br/><br/>Don&apos;t have an account yet? <Link to='/registration'>Registration</Link>.</span>
        </div>
      </div>
    </div>
  )
}
