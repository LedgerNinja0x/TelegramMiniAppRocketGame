/* eslint-disable react/prop-types */
import AppContext from './AppContext'
import Checkbox from './Checkbox'
import { Link, useHistory } from 'react-router-dom'
import React, { useContext, useRef, useState } from 'react'
import { validateEmail, validateName, validatePassword } from '../utils/inputValidator'

export default function Registration () {
  const context = useContext(AppContext)

  /**
   * @type {string} Email address
   */
  const [emailState, setEmailState] = useState('')

  /**
   * @type {string} Username
   */
  const [nameState, setNameState] = useState('')

  /**
   * @type {string} Password
   */
  const [passwordState, setPasswordState] = useState('')
  /**
   * @type {boolean} Agreement
   */
  const [agreedState, setAgreedState] = useState(false)

  /**
   * @type {string} Password in the comfirmation input element
   */
  const [passwordConfirmationState, setPasswordConfirmationState] = useState('')

  /**
   * @type {bool} Invalid email address flag
   */
  const [emailIncorrectState, setEmailIncorrectState] = useState(false)

  /**
   * @type {bool} Email address is already taken
   */
  const [emailOccupiedState, setEmailOccupiedState] = useState(false)

  /**
   * @type {bool} Invalid username flag
   */
  const [nameIncorrectState, setNameIncorrectState] = useState(false)

  /**
   * @type {bool} Username is already taken
   */
  const [nameOccupiedState, setNameOccupiedState] = useState(false)

  /**
   * @type {bool} Invalid password flag
   */
  const [passwordIncorrectState, setPasswordIncorrectState] = useState(false)

  /**
   * @type {bool} The old and new passwords don't match
   */
  const [passwordsMismatchState, setPasswordsMismatchState] = useState(false)

  /**
   * @type {bool} The user has not confirmed the agreement
   */
  const [agreedErrorState, setAgreedErrorState] = useState(false)

  const history = useHistory()

  const modalRef = useRef()

  /**
   * Verifies username, email address and password
   */
  function validateInput () {
    let result = true

    if (!validateName(nameState)) {
      setNameIncorrectState(true)
      result = false
    } else {
      setNameIncorrectState(false)
    }

    if (!validateEmail(emailState)) {
      setEmailIncorrectState(true)
      result = false
    } else {
      setEmailIncorrectState(false)
    }

    if (!validatePassword(passwordState)) {
      setPasswordIncorrectState(true)
      result = false
    } else {
      setPasswordIncorrectState(false)
    }

    if (passwordConfirmationState !== passwordState) {
      setPasswordsMismatchState(true)
      result = false
    } else {
      setPasswordsMismatchState(false)
    }

    if (!agreedState) {
      setAgreedErrorState(true)
      result = false
    } else {
      setAgreedErrorState(false)
    }

    return result
  }

  /**
   * Registers a new user
   */
  function register () {
    if (validateInput()) {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      fetch('/register', {
        method: 'POST',
        body: JSON.stringify({ name: nameState, email: emailState, password: passwordState }),
        headers
      })
        .then(res => Promise.all([res.status, res.json()]))
        .then(([status, data]) => {
          if (status < 200 || status >= 300) {
            if (data.error === 'name_incorrect') {
              setNameIncorrectState(true)
            } else if (data.error === 'name_occupied') {
              setNameOccupiedState(true)
            } else if (data.error === 'email_incorrect') {
              setEmailIncorrectState(true)
            } else if (data.error === 'email_occupied') {
              setEmailOccupiedState(true)
            } else if (data.error === 'password') {
              setPasswordIncorrectState(true)
            }
          } else {
            modalRef.current.style.display = 'block'
            context.overlayRef.current.style.display = 'block'
          }
        })
        .catch(err => alert(err))
    }
  }

  return (
    <div id='registration'>
      <div className='modal' ref={modalRef} style={{ marginTop: '32px' }}>
        <p><h2>Thank you for applying!</h2></p>
        <p>Please check your email to confirm your registration!</p>
        <div className='close' onClick={() => {
          context.overlayRef.current.style.display = 'none'
          modalRef.current.style.display = 'none'
          history.push('/')
        }}/>
        <button className='modal-button' onClick={() => {
          context.overlayRef.current.style.display = 'none'
          modalRef.current.style.display = 'none'
          history.push('/')
        }}>Ok</button>
      </div>

      <div className='page-background'>
        <h1>Create a new account</h1>
        <div className='page-flexbox'>
          <span className='page-flexbox-title'>Login</span>
          <div>
            <input type='text' onChange = {event => {
              setNameState(event.target.value)
              setNameOccupiedState(false)
            }}/>
            <span className='error-label' hidden={!nameIncorrectState}>Name incorrect</span>
            <span className='error-label' hidden={!nameOccupiedState}>Name occupied</span>
          </div>

          <span className='page-flexbox-title'>Email</span>
          <div>
            <input type='email' onChange = {event => {
              setEmailState(event.target.value)
              setEmailOccupiedState(false)
              setEmailIncorrectState(false)
            }}/>
            <span className='error-label' hidden={!emailIncorrectState}>Email incorrect</span>
            <span className='error-label' hidden={!emailOccupiedState}>Email occupied</span>
          </div>
          <span className='page-flexbox-title'>Password</span>
          <div>
            <input type='password'
              onChange = {event => {
                setPasswordState(event.target.value)
                setPasswordIncorrectState(false)
                setPasswordsMismatchState(passwordConfirmationState !== event.target.value)
              }}/>
            <span className='error-label' hidden={!passwordIncorrectState}>Password incorrect</span>
          </div>
          <span className='page-flexbox-title'>Confirm Password</span>
          <div>
            <input type='password'
              onChange = {event => {
                setPasswordConfirmationState(event.target.value)
                setPasswordsMismatchState(event.target.value !== passwordState)
              }}/>
            <span className='error-label' hidden={!passwordsMismatchState}>Passwords mismatch</span>
          </div>
          <div id='registration-agreement'>
            {<Checkbox type='checkbox' value={agreedState} onChange={event => { setAgreedState(event.target.value); setAgreedErrorState(false) }}/>}
            <span className='page-flexbox-blind' style={{ color: agreedErrorState ? 'red' : undefined }}>  I Agree with the Rocket-X.io <Link to='/terms'>Terms of Service</Link>.</span>
          </div>
          <div><button onClick={register} disabled={nameState.length < 4 || passwordState.length < 8 || passwordConfirmationState !== passwordState || !agreedState || !emailState.length}>Register</button></div>
          <span className='page-flexbox-blind'>Already have an account? <Link to='/login'>Login</Link>.</span>
        </div>
      </div>
    </div>
  )
}
