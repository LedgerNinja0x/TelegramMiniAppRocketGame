import { Link, useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import { validateEmail } from '../utils/inputValidator'


/**
 * Login page. URL: /login
 */
export default function Login () {
  const [emailState, setEmailState] = useState('')
  const [emailIncorrectState, setEmailIncorrectState] = useState(false)
  const [emailNotRegisteredState, setEmailNotRegisteredState] = useState(false)

  const history = useHistory()

  function validateInput () {
    if (!validateEmail(emailState)) {
      setEmailIncorrectState(true)
      return false
    } else {
      setEmailIncorrectState(false)
      return true
    }
  }

  function sendRecoveryRequest () {
    if (validateInput()) {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      fetch('/recovery', {
        method: 'POST',
        body: JSON.stringify({ email: emailState }),
        headers
      })
        .then(res => Promise.all([res.status, res.json()]))
        .then(([status, data]) => {
          if (status < 200 || status >= 300) {
            if (data.error === 'email_incorrect') {
              setEmailIncorrectState(true)
            } else if (data.error === 'email_not_registered') {
              setEmailNotRegisteredState(true)
            }
          } else {
            history.push('/')
            alert('The password has been sent to your email.')
          }
        })
        .catch(err => alert(err))
    }
  }

  return (
    <div id='recovery'>
      <div className='page-background'>
        <h1>Recovery Password</h1>
        <div className='page-flexbox'>
          <span className='page-flexbox-title'>Email</span>
          <div>
            <input
              type = 'email'
              onChange = {event => {
                setEmailState(event.target.value)
                setEmailIncorrectState(false)
                setEmailNotRegisteredState(false)
              }}/>
            <span className='error-label' hidden={!emailIncorrectState}>Email incorrect</span>
            <span className='error-label' hidden={!emailNotRegisteredState}>Email not registered</span>
          </div>
          <button onClick={sendRecoveryRequest} disabled={!validateEmail(emailState)}>Recovery</button>
          <span className='page-flexbox-blind'>Go back to <Link to='/login'>Login</Link>.</span>
        </div>
      </div>
    </div>
  )
}
